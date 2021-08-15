const log4js = require('log4js')
const logConfig = require("../configs/log4js.json");
log4js.configure(logConfig);
const logger = log4js.getLogger();

const board = require('../models/arduino')

class LedController {

    constructor(){
        this.pins = process.env.ARDUINO_Pins || []
        this.pinsState= {}
        this.pinMode = ['on', 'off', 'toggle']
    }

    proccess(req, res, next) {
        //logger.info(this)
        try{
            const { mode, pin } = req.params
            const Pin = String(pin)
            const physicalPorts = {'1':'1'}
            if(this.pins.includes(Pin)){
                switch(mode.toLowerCase()){
                    case 'toggle':
                        this.pinsState[Pin] = !this.pinsState[Pin]
                        board.digitalWrite(Pin, this.pinsState[Pin] ? 1 : 0)
                        res.json({
                            pin,
                            pinState: this.pinsState[Pin],
                            message:this.pinsState[Pin] ? 'Pin ON!' : 'Led OFF!'
                        })
                        break;
                    case 'on':
                        this.pinsState[Pin] = 1
                        board.digitalWrite(Pin, 1)
                        res.json({
                            pin,
                            pinState: this.pinsState[Pin],
                            message:'Pin ON!'
                        })
                        break;
                    case 'off':
                        this.pinsState[Pin] = 0
                        board.digitalWrite(Pin, 0)
                        res.json({
                            pin,
                            pinState: this.pinsState[Pin],
                            message:'Pin OFF!'
                        })
                        break;
                    default:
                        res.json({
                            errorMessage:'Invalid mode!'
                        })
                }
            } else {
                res.json({ 
                    errorMessage: 'Invalid Pin or not initialized!'
                })
            }
            
            
        } catch(error) {
            console.log(error)
            res.json({
                errorMessage:'Something went wrong!'
            })
        }
    }

    getState(req, res, next){
        const { pin } = req.params
        const Pin = String(pin)

        if(this.pins.includes(Pin)){
            res.json({
                pin,
                pinState: this.pinsState[Pin] || 0,
                message: this.pinsState[Pin] ? 'Pin ON!' : 'Pin OFF!'
            })        
        }
    }
}

module.exports = LedController;