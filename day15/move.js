const WALL = 0
const SPACE = 1
const OXYGEN_SYSTEM = 2
const DROID = 3
const MARKED_PATH = 4
const OXYGEN_RESTORED = 5

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

const mazeCache = new Map()
let pos = {
    x: 0,
    y: 0
}
let oldPos = { ...pos }
let oxygenSystemDistance = null
let oxygenSystemNode = null
mazeCache.set(hash(pos), DROID)

function hash(pos) {
    return `${pos.x},${pos.y}`
}

function move(direction) {
    const output = runProgram(computer, direction.value, true)
    switch (output) {
        case SPACE: {
            // move the droid and calc next direction
            const value = mazeCache.get(hash(pos))
            const restoreValue = value === DROID ? SPACE : OXYGEN_SYSTEM
            mazeCache.set(hash(pos), restoreValue) // droid leaves old position
            oldPos = pos
            pos = direction.move(pos)
            mazeCache.set(hash(pos), DROID) // droid enters new position
            break
        }
        case WALL: {
            // mark the wall
            const wallPosition = direction.move(pos)
            mazeCache.set(hash(wallPosition), WALL)
            oldPos = wallPosition
            break
        }
        case OXYGEN_SYSTEM:
            // mark the oxygen system and return
            mazeCache.set(hash(pos), SPACE) // droid leaves old position
            oldPos = pos
            pos = direction.move(pos)
            mazeCache.set(hash(pos), OXYGEN_SYSTEM) // droid enters oxygen system
            oxygenSystemNode = currentNode
            oxygenSystemDistance = currentNode.depth
            console.log('FOUND THE OXYGEN SYSTEM at', {
                ...pos,
                depth: currentNode.depth
            })
            break
    }
    return output
}
