const makeComputer = require('./make-computer')
const runProgram = require('./run-program')

const computer = makeComputer()
const output = runProgram(computer, 1)
console.log(output) // 3512778005
