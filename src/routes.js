const express = require('express')
const path = require('path')
const ArduinoController = new require('./controller/arduino-controller')
const arduino = new ArduinoController()
const routes = express.Router()

routes.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/'))
})

routes.get('/pinport/:pin/:mode', (req, res, next)=>{ arduino.proccess(req, res, next) })
routes.get('/pinport/:pin', (req, res, next) => { arduino.getState(req, res, next) })

module.exports = routes