const makeComputer = require('./make-computer')
const runProgram = require('./run-program')

const computer = makeComputer('./data.txt')
const output = runProgram(computer, 2)
console.log(output) // 35920
