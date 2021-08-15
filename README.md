# Arduino Pin Control

Probably this readme have so much errors in English grammar because I am not much skilled in english language. So if you find any error, just contact me. =)

## What is it?
- This an API to control the pins of an arduino. It can be modded to suports another types of components as such some sensors or rgb leds.
- The project can be easily moddified to add some features as authentication, or may be the backend of a React.js app.

## What you need?
- An arduino or microcontroller that is supported by node.js module Johnny-Five
- A computer
- Creativity

## My Test Setup for this Repository
<div align="center">
    <img heigth="240" width="320" src="https://i.imgur.com/YhYT7dA.jpg" alt=" Arduino with protoboard">
</div>

- An Arduino Uno
- A protoboard
- 1x 330ohm resistor
- 1x Red Led
  
  To control this system, i have build a simple web page to check power and control the red led!

<div align="center">
    <img src="https://i.imgur.com/GCdAquf.png">
</div>

  This simple static page is running on with this api at:
    
    http://localhost:3300/


# How to install it

Download it using

    git clone https://github.com/gabrielgollo/arduino-pin-control-nodejs.git

Install modules using

    npm i

# How to use it

- Configure the .env passing the pin port in the array. Example of passing the pin port 13:

        Arduino_Pins = ['13']

- Make a request to http://localhost:3300/pinport/:pin/:mode , where :pin is equal to Pin Port and :mode is one of ['on', 'off', 'toggle']. Examples:

        http://localhost:3300/pinport/13/on  <-- This will power on the pinport 13

        http://localhost:3300/pinport/13/off  <-- This will power off the pinport 13

<br>

# Just be creative and add anothers functions