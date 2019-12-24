const WALL = 0
const SPACE = 1
const OXYGEN_SYSTEM = 2
const DROID = 3

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
UP.reverse = DOWN
DOWN.reverse = UP
LEFT.reverse = RIGHT
RIGHT.reverse = LEFT

const RESULTS = ['WALL', 'SPACE', 'OXYGEN_SYSTEM']
const RESULTS_HTML = [
    '<span class="wall">W</span>',
    '<span class="space"></span>',
    '<span class="oxygen-system">O</span>',
    '<span class="droid">&#129302;</span>'
]

const mazeCache = new Map()
let pos = {
    x: 0,
    y: 0
}
mazeCache.set(hash(pos), DROID)

function hash(pos) {
    return `${pos.x},${pos.y}`
}

function move(direction) {
    const output = runProgram(computer, direction.value, true)
    // console.log({
    //     direction: direction.name,
    //     pos: `(${pos.x}, ${pos.y})`,
    //     output: RESULTS[output] || output
    // })

    switch (output) {
        case SPACE: {
            // move the droid and calc next direction
            const value = mazeCache.get(hash(pos))
            const restoreValue = value === DROID ? SPACE : OXYGEN_SYSTEM
            mazeCache.set(hash(pos), restoreValue) // droid leaves old position
            pos = direction.move(pos)
            mazeCache.set(hash(pos), DROID) // droid enters new position
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
            mazeCache.set(hash(pos), SPACE) // droid leaves old position
            pos = direction.move(pos)
            mazeCache.set(hash(pos), OXYGEN_SYSTEM) // droid enters oxygen system
    }
    return output
}
