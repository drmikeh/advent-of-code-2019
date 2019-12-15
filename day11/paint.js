const { info } = require('../day09/debug')
const runProgram = require('../day09/run-program')

function getNextDirection(output, direction) {
    if (output === 0) {
        return 4 * (direction === 0) + direction - 1
    } else if (output === 1) {
        return (direction + 1) % 4
    } else {
        // throw new Error(`NO DIRECTION for output ${output}`)
        return direction
    }
}

const movements = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 }
]

function paint(computer) {
    let direction = 0 // 0: up 1: right 2: down 3: left
    const panelsPainted = {}
    const robot = { x: 0, y: 0 }

    // paint it white
    panelsPainted[robot.x + ',' + robot.y] = 1

    while (true) {
        const panelKey = robot.x + ',' + robot.y
        const panel = panelsPainted[panelKey]
        const input = panel || 0
        colorOutput = runProgram(computer, input, true)
        if (colorOutput === -1) {
            break
        }
        panelsPainted[panelKey] = colorOutput
        directionOutput = runProgram(computer, null, true)
        if (directionOutput === -1) {
            break
        }
        direction = getNextDirection(directionOutput, direction)
        info(
            colorOutput,
            directionOutput,
            'painted panel',
            panelKey,
            colorOutput ? 'white' : 'black',
            '- the new direction =',
            direction
        )
        robot.x += movements[direction].x
        robot.y += movements[direction].y
    }
    return panelsPainted
}

module.exports = paint
