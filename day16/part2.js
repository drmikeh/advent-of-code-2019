const strData = require('../file-reader').readFile('data.txt', '\n', String)[0]

function phase(data) {
    const result = []
    let sum = 0
    data.reverse().forEach(n => {
        sum = (sum + n) % 10
        result.push(sum)
    })
    return result.reverse()
}

function runPhases(data) {
    for (let n = 1; n <= NUM_PHASES; n++) {
        data = phase(data)
    }
    return Number(data.slice(0, 8).join(''))
}

const NUM_PHASES = 100
const NUM_REPEATS = 10000
const messageOffset = Number(strData.slice(0, 7))
const repeatedData = strData
    .repeat(NUM_REPEATS)
    .split('')
    .map(Number)
    .slice(messageOffset)
const part2 = runPhases(repeatedData)
console.log({ part2: part2 })
