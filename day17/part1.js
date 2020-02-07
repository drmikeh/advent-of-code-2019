const makeComputer = require('../day09/make-computer')
const runProgram = require('../day09/run-program')
const computer = makeComputer('data.txt')

const isScaffold = char => char === '#'

function isIntersection(rows, row, col) {
    return (
        isScaffold(rows[row][col]) &&
        isScaffold(rows[row - 1][col]) &&
        isScaffold(rows[row + 1][col]) &&
        isScaffold(rows[row][col - 1]) &&
        isScaffold(rows[row][col + 1])
    )
}

function readMap() {
    let outputString = ''
    while (true) {
        const output = runProgram(computer, null, true)
        if (output === -1) {
            break
        }
        outputString += String.fromCharCode(output)
    }
    return outputString
}

function convertToArraysAndCalcAlignment(map) {
    const rows = map.split('\n').map(row => row.split(''))
    const NUM_COLS = rows[0].length
    let alignmentParamsTotal = 0

    for (let row = 1; row < rows.length - 1; row++) {
        for (let col = 1; col < NUM_COLS - 1; col++) {
            if (isIntersection(rows, row, col)) {
                rows[row][col] = 'O'
                alignmentParamsTotal += row * col
            }
        }
    }
    return { rows, alignmentParamsTotal }
}

const { rows, alignmentParamsTotal } = convertToArraysAndCalcAlignment(
    readMap()
)
rows.forEach(row => {
    console.log(row.join(''))
})

console.log({ part1: alignmentParamsTotal }) // 5948
