const five = require('johnny-five');
const board = new five.Board({
    repl: false,
    debug: false
})

module.exports = board