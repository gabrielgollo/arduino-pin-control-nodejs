require('dotenv').config({ path:'./.env' })

const express = require('express')
const board = require('./src/models/arduino')
const routes = require('./src/routes')
const PORT = 3300
const app = express()

app.use(express.static('public'))
app.use(routes)

board.on('ready', () => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`)
    })    
})

