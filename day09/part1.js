const makeComputer = require('./make-computer')
const runProgram = require('./run-program')

const computer = makeComputer('./data.txt')
const output = runProgram(computer, 1)
console.log(output) // 3512778005
