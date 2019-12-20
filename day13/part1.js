const { info } = require('../day09/debug')
const runProgram = require('../day09/run-program')
const makeComputer = require('../day09/make-computer')

const computer = makeComputer('./data.txt')

let output = 0
let numberOfBlock = 0

while (output !== -1) {
    output = runProgram(computer, 0, true)
    output = runProgram(computer, 0, true)
    output = runProgram(computer, 0, true)
    numberOfBlock += output === 2
}

console.log('there are', numberOfBlock, 'blocks')
