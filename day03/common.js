function getNextPosition(currentPosition, delta) {
    const { x, y } = currentPosition
    const direction = delta[0]
    const amount = Number(delta.slice(1))
    const distance = currentPosition.distance + amount
    switch (direction) {
        case 'R':
            return { x: x + amount, y, distance }
        case 'L':
            return { x: x - amount, y, distance }
        case 'U':
            return { x: x, y: y + amount, distance }
        case 'D':
            return { x: x, y: y - amount, distance }
        default:
            throw new Error(`Unrecognized direction: ${direction}`)
    }
}

function isBetween(point, start, end) {
    return (point > start && point < end) || (point > end && point < start)
}

/**
 * Determine if two Manhattan lines intersect
 * @param {Object} horizontal - the horizontal line
 * @param {Object} vertical - the vertical line
 * @return {boolean} - true if the lines intersect
 */
function doesIntercept(horizontal, vertical) {
    return (
        isBetween(vertical.from.x, horizontal.from.x, horizontal.to.x) &&
        isBetween(horizontal.from.y, vertical.from.y, vertical.to.y)
    )
}

const isHorizontal = line => line.from.y === line.to.y

/**
 * Get all of the intercections of the lines array and the newLIne
 * An intersection occurs for each line in lines that intersects with newLine, i.e.
 * one line is horizontal (moves in the x direction)
 * and the other line is vertical (moves in the y direction)
 * and the horizontal line's y value lies between the vertical line's two y values
 * and the vertical line's x value lies between the horizontal line's two x values.
 *
 * @param {Object[]} lines - an array of lines
 * @param {Object} newLine - a line that may intersect one of the lines
 */
function getIntersectionsForLine(lines, newLine) {
    const intersections = []
    lines.forEach(line => {
        if (
            isHorizontal(line) &&
            !isHorizontal(newLine) &&
            doesIntercept(line, newLine)
        ) {
            const distance =
                line.from.distance +
                newLine.from.distance +
                Math.abs(line.from.x - newLine.from.x) +
                Math.abs(newLine.from.y - line.from.y)
            intersections.push({ x: newLine.from.x, y: line.from.y, distance })
        } else if (
            isHorizontal(newLine) &&
            !isHorizontal(line) &&
            doesIntercept(newLine, line)
        ) {
            const distance =
                line.from.distance +
                newLine.from.distance +
                Math.abs(line.from.x - newLine.from.x) +
                Math.abs(newLine.from.y - line.from.y)
            intersections.push({ x: line.from.x, y: newLine.from.y, distance })
        }
    })
    return intersections
}

function getLines(cable) {
    const lines = []
    let currentPosition = { x: 0, y: 0, distance: 0 }
    cable.split(',').forEach(delta => {
        const nextPosition = getNextPosition(currentPosition, delta)
        const line = { from: currentPosition, to: nextPosition }
        // console.log({ currentPosition, delta, nextPosition, line })
        lines.push(line)
        currentPosition = nextPosition
    })
    return lines
}

function getIntersections() {
    const [cable1, cable2] = require('../file-reader').readFile(
        'data.txt',
        '\n',
        String
    )

    const lines1 = getLines(cable1)

    // for each line in cable2, get the intersections with the lines in cable1
    const lines2 = getLines(cable2)
    const intersections = []
    lines2.forEach(line => {
        intersections.push(...getIntersectionsForLine(lines1, line))
    })

    return intersections
}

module.exports = getIntersections
