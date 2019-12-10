const permutate = require('./permutate')
const makeAmplifier = require('./make-amplifier')
const runProgram = require('./run-program')

function play(phaseSettings) {
    const amplifiers = [1, 2, 3, 4, 5].map(makeAmplifier)
    let nextInput = 0
    amplifiers.forEach((amp, index) => {
        nextInput = runProgram(amp, phaseSettings[index], nextInput)
    })
    return nextInput // this is the final output
}

let maxThrust = -1
permutate([0, 1, 2, 3, 4], phaseSettings => {
    const thrust = play(phaseSettings)
    maxThrust = Math.max(maxThrust, thrust)
})

console.log('maxThrust:', maxThrust) // maxThrust: 844468
