const chalk = require('chalk')
const runProgram = require('../day09/run-program')
const makeComputer = require('../day09/make-computer')

const computer = makeComputer('./data.txt')

const UP = {
    name: 'UP',
    value: 1,
    move: pos => ({ x: pos.x, y: pos.y - 1 })
}
const DOWN = {
    name: 'DOWN',
    value: 2,
    move: pos => ({ x: pos.x, y: pos.y + 1 })
}
const RIGHT = {
    name: 'RIGHT',
    value: 3,
    move: pos => ({ x: pos.x + 1, y: pos.y })
}
const LEFT = {
    name: 'LEFT',
    value: 4,
    move: pos => ({ x: pos.x - 1, y: pos.y })
}

const WALL = 0
const SPACE = 1
const OXYGEN_SYSTEM = 2
const DROID = 3
const RESULTS = ['WALL', 'SPACE', 'OXYGEN_SYSTEM']
const RUSULTS_CHARS = [chalk.blue('W'), ' ', chalk.yellow('O'), chalk.red('D')]

function hash(pos) {
    return `${pos.x},${pos.y}`
}

function printMaze(mazeCache) {
    const minX = [...mazeCache.keys()].reduce(
        (min, key) => Math.min(min, key.split(',')[0]),
        9999
    )
    const maxX = [...mazeCache.keys()].reduce(
        (max, key) => Math.max(max, key.split(',')[0]),
        -1
    )
    const minY = [...mazeCache.keys()].reduce(
        (min, key) => Math.min(min, key.split(',')[1]),
        9999
    )
    const maxY = [...mazeCache.keys()].reduce(
        (max, key) => Math.max(max, key.split(',')[1]),
        -1
    )
    console.log('mazeCache size:', mazeCache.size, { minX, maxX, minY, maxY })
    for (let y = minY; y <= maxY; y++) {
        let row = ''
        for (let x = minX; x <= maxX; x++) {
            const pos = { x, y }
            const v = mazeCache.get(hash(pos))
            row += v || v === 0 ? RUSULTS_CHARS[v] || v : '⚡︎'
        }
        console.log(row)
    }
}

function tryMove(direction, pos, mazeCache) {
    const output = runProgram(computer, direction.value, true)
    console.log('\n', {
        direction: direction.name.padEnd(5),
        pos,
        output: RESULTS[output] || output
    })
    switch (output) {
        case SPACE: {
            // move the droid and calc next direction
            mazeCache.set(hash(pos), SPACE) // droid leaves old space
            pos = direction.move(pos)
            mazeCache.set(hash(pos), DROID) // droid enters new space
            break
        }
        case WALL: {
            // mark the wall and calc next direction
            const wallPosition = direction.move(pos)
            mazeCache.set(hash(wallPosition), WALL)
            break
        }
        case OXYGEN_SYSTEM:
            // mark the oxygen system and return
            console.log('FOUND THE OXYGEN SYSTEM at', pos)
            pos = direction.move(pos)
            mazeCache.set(hash(pos), OXYGEN_SYSTEM)
    }
    return pos
}

const prompt = require('prompt-sync')()
function askForDirection() {
    while (true) {
        const dir = prompt('Direction:').toUpperCase()
        switch (dir) {
            case 'U':
                return UP
            case 'D':
                return DOWN
            case 'L':
                return LEFT
            case 'R':
                return RIGHT
        }
    }
}

function part1() {
    const mazeCache = new Map()
    let pos = {
        x: 0,
        y: 0
    }
    mazeCache.set(hash(pos), DROID)
    // let nextCells = [] // should be an Ordered Set
    while (true) {
        printMaze(mazeCache)
        direction = askForDirection()
        pos = tryMove(direction, pos, mazeCache)
    }
}

part1()
