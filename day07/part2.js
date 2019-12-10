const permutate = require('./permutate')
const makeAmplifier = require('./make-amplifier')
const runProgram = require('./run-program')

function play(phaseSettings) {
    const amplifiers = [1, 2, 3, 4, 5].map(makeAmplifier)
    let output = 0
    let finalOutput = -1
    let amplifierIndex = 0
    while (output !== -1) {
        const amp = amplifiers[amplifierIndex]
        const phaseInput =
            finalOutput === -1 ? phaseSettings[amplifierIndex] : output
        output = runProgram(amp, phaseInput, output)
        if (amplifierIndex === 4) {
            finalOutput = output
        }
        amplifierIndex = (amplifierIndex + 1) % 5
    }
    return finalOutput
}

let maxThrust = -1
permutate([5, 6, 7, 8, 9], phaseSettings => {
    const thrust = play(phaseSettings)
    maxThrust = Math.max(maxThrust, thrust)
})

console.log('maxThrust:', maxThrust) // maxThrust: 4215746
