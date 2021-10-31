const log4js = require("log4js");
const logConfig = require("../configs/log4js.json");
log4js.configure(logConfig);
const logger = log4js.getLogger();

const board = require("../models/arduino");

class LedController {
  constructor() {
    this.pins = process.env.ARDUINO_Pins || [];
    this.pinsState = {};
    this.pinMode = ["on", "off", "toggle", "blink"];
    this.lastInstructions = {};
    this.instruction = {
      on: (pin) => {
        this.pinsState[pin] = 1;
        board.digitalWrite(pin, 1);
        this.setLastInstructions(pin, "on");
        return { pin, pinState: this.pinsState[pin] };
      },
      off: (pin) => {
        this.pinsState[pin] = 0;
        board.digitalWrite(pin, 0);
        this.setLastInstructions(pin, "off");
        return { pin, pinState: this.pinsState[pin] };
      },
      toggle: (pin) => {
        this.pinsState[pin] = this.pinsState[pin] ? 0 : 1;
        board.digitalWrite(pin, this.pinsState[pin]);
        this.setLastInstructions(pin, "toggle");
        return { pin, pinState: this.pinsState[pin] };
      },
      blink: (pin, time = 500) => {
        this.pinsState[pin] = this.pinsState[pin] ? 0 : 1;
        this.setLastInstructions(pin, "blink");
        board.loop(time, (stop) => {
          this.pinsState[pin] = !this.pinsState[pin];
          board.digitalWrite(pin, this.pinsState[pin]);
          if (
            this.lastInstructions[pin].mode !== "blink" ||
            this.lastInstructions[pin].calledTimes > 1
          ) {
            stop();
            this.lastInstructions[pin].calledTimes = 1;
          }
        });
        return { pin, pinState: this.pinsState[pin] };
      },
    };
  }

  setLastInstructions(pin, instruction) {
    if (
      this.lastInstructions[pin] &&
      this.lastInstructions[pin]?.mode === instruction
    ) {
      this.lastInstructions[pin].calledTimes += 1;
      return true;
    }
    this.lastInstructions[pin] = { mode: instruction, calledTimes: 1 };
  }

  proccess(req, res, next) {
    //logger.info(this)
    try {
      const { mode, pin, time } = req.params;
      const Pin = String(pin);
      if (this.pins.includes(Pin)) {
        if (this.pinMode.includes(mode)) {
          const result = this.instruction[mode](Pin, time);
          res.status(200).json({
            ...result,
            message: this.pinsState[Pin] ? "Pin ON!" : "Led OFF!",
          });
        } else {
          res.status(400).json({ error: "Invalid mode" });
        }
      } else {
        res.status(400).json({ error: "Invalid pin" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorMessage: error.message || "Something went wrong!",
      });
    }
  }

  async getState(req, res, next) {
    const { pin } = req.params;
    const Pin = String(pin);

    if (this.pins.includes(Pin)) {
      res.json({
        pin,
        pinState: this.pinsState[Pin] || 0,
        message: this.pinsState[Pin] ? "Pin ON!" : "Pin OFF!",
      });
    }
  }
}

module.exports = LedController;
