const keypress = require('keypress')

const directions = ['up', 'down', 'left', 'right']

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin)

// listen for the "keypress" event
process.stdin.on('keypress', function(ch, key) {
    // console.log('got "keypress"', key.name)
    if (directions.includes(key.name)) {
        console.log('got direction', key.name)
    }
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause()
    }
})

process.stdin.setRawMode(true)
process.stdin.resume()

const greeting = () => console.log('Hi')
setInterval(greeting, 3000)
