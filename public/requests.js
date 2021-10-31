let interval = null;
const turnLedOn = async () => {
  if (interval) clearInterval(interval);
  checkState();
  const response = await fetch("http://localhost:3300/pinport/13/on", {
    method: "GET",
  });
  const elements = document.getElementsByClassName("led-red");
  for (element of elements) {
    element.style.backgroundColor = "#F00";
  }
};

const turnLedOff = async () => {
  if (interval) clearInterval(interval);
  checkState();
  const response = await fetch("http://localhost:3300/pinport/13/off", {
    method: "GET",
  });
  const elements = document.getElementsByClassName("led-red");
  for (element of elements) {
    element.style.backgroundColor = "#A00";
  }
};

const toggleLed = async () => {
  if (interval) clearInterval(interval);
  checkState();
  const response = await fetch("http://localhost:3300/pinport/13/toggle", {
    method: "GET",
  });
  const elements = document.getElementsByClassName("led-red");
  for (element of elements) {
    const { pinState } = await response.json();
    alternateColor(element, pinState);
  }
};

const alternateColor = (element, pinState) => {
  if (pinState) {
    element.style.backgroundColor = "#F00";
  } else {
    element.style.backgroundColor = "#A00";
  }
};

const setBlinking = async () => {
  if (interval) clearInterval(interval);
  const response = await fetch("http://localhost:3300/pinport/13/blink", {
    method: "GET",
  });
  const elements = document.getElementsByClassName("led-red");
  const { pinState } = await response.json();
  let state = pinState;
  time = 500;
  interval = setInterval(() => {
    state = !state;
    for (element of elements) {
      alternateColor(element, state);
      console.log(state);
    }
  }, time);
};

const checkState = async () => {
  const response = await fetch("http://localhost:3300/pinport/13", {
    method: "GET",
  });
  const elements = document.getElementsByClassName("led-red");
  for (element of elements) {
    const { pinState } = await response.json();
    alternateColor(element, pinState);
  }
};

window.addEventListener("load", () => {
  checkState();
});
