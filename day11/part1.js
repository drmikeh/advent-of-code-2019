const makeComputer = require('../day09/make-computer')
const paint = require('./paint')

const computer = makeComputer('data.txt')
const panelsPainted = paint(computer)
console.log('Painted', Object.keys(panelsPainted).length, 'panels')
