const strData = require('../file-reader').readFile('data.txt', '\n', String)[0]

function sum(a, b) {
    return a + b
}

function getMultiplier(pattern, outerIndex, innerIndex) {
    return pattern[
        Math.floor((innerIndex + 1) / (outerIndex + 1)) % pattern.length
    ]
}

function phase(strData, pattern) {
    const data = strData.split('').map(Number)
    return data
        .map((_, outerIndex) => {
            function calcInner(n, innerIndex) {
                return n * getMultiplier(pattern, outerIndex, innerIndex)
            }
            const outerResult = Math.abs(data.map(calcInner).reduce(sum)) % 10
            return outerResult
        })
        .join('')
}

const basePattern = [0, 1, 0, -1]

function runPhases(input) {
    for (let n = 1; n <= NUM_PHASES; n++) {
        input = phase(input, basePattern)
    }
    return Number(input.slice(0, 8))
}

const NUM_PHASES = 100

// PART 1
const part1 = runPhases(strData)
console.log({ part1 })
