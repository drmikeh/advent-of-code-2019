function sleep(millis) {
    return new Promise(res => setTimeout(res, millis))
}

const DIRECTIONS = [UP, DOWN, LEFT, RIGHT]

function checkForUnknownValue(direction) {
    const newPositionHash = hash(direction.move(pos))
    return !mazeCache.has(newPositionHash)
}

function checkMoveValue(dir, pos, value) {
    const newPositionHash = hash(dir.move(pos))
    console.log(
        'checkMoveValue:',
        dir.name,
        newPositionHash,
        value,
        mazeCache.get(newPositionHash)
    )
    return (
        mazeCache.has(newPositionHash) &&
        mazeCache.get(newPositionHash) === value
    )
}

function printTree(node = root, level = 0) {
    console.log(node.toString(level))
    node.children.forEach(child => printTree(child, level + 1))
}

function getDirectionToNode(node) {
    return DIRECTIONS.find(dir => {
        const newPos = dir.move(pos)
        return newPos.x === node.pos.x && newPos.y === node.pos.y
    })
}

let paused = false
function togglePause() {
    paused = !paused
}

let totalSteps = 0
let maxDepth = 0
const root = new TreeNode(null, pos, SPACE, 0)
DIRECTIONS.forEach(dir => {
    root.addChild(dir.move(pos), null)
})
let currentNode = root

async function solve() {
    await part1()
    await part2()
}
