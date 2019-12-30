const { info } = require('../day09/debug')

function unhash(hash) {
    const parts = hash.split(',')
    return { x: Number(parts[0]), y: Number(parts[1]) }
}

function getNextDirectionFromNextCell(nextCell) {
    if (nextCell.x === pos.x - 1) return LEFT
    else if (nextCell.x === pos.x + 1) return RIGHT
    else if (nextCell.y === pos.y - 1) return UP
    else if (nextCell.y === pos.y + 1) return DOWN
    else throw new Error('ERROR: cannot find new nextDirection')
}
