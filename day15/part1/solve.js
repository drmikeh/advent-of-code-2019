class TreeNode {
    constructor(parent, pos, value) {
        this.parent = parent // for backtracking
        this.pos = pos
        this.value = value // SPACE or OXYGEN_SYSTEM
        this.children = []
    }
    addChild(pos, value) {
        const child = new TreeNode(this, pos, value)
        this.children.push(child)
        return child
    }
    hasChild(pos) {
        const found = this.children.find(
            child => child.pos.x === pos.x && child.pos.y === pos.y
        )
        return !!found
    }
    isParentPosition(pos) {
        return pos.x === this.parent.pos.x && pos.y === this.parent.pos.y
    }
    toString(level = 0) {
        return `${' '.repeat(level)}(${this.pos.x}, ${this.pos.y}) : ${
            this.value
        }`
    }
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

const gen = stepper()
let totalSteps = 0
const root = new TreeNode(null, pos, SPACE)
let currentNode = root

function printTree(node = root, level = 0) {
    console.log(node.toString(level))
    node.children.forEach(child => printTree(child, level + 1))
}

function* stepper() {
    let found = false
    while (!found) {
        // printTree()
        let possibleNextDirections = DIRECTIONS.filter(checkForUnknownValue)
        if (possibleNextDirections.length === 0) {
            const spaces = DIRECTIONS.filter(
                dir =>
                    checkMoveValue(dir, pos, SPACE) &&
                    !currentNode.isParentPosition(dir.move(pos)) // ignore parent for now - BETTER IS TO MARK VISITED CHILDREN AND DON'T REVISIT THEM
            )
            possibleNextDirections = possibleNextDirections.concat(spaces)
        }
        if (possibleNextDirections.length === 0) {
            possibleNextDirections.push(
                DIRECTIONS.find(
                    dir => currentNode.isParentPosition(dir.move(pos)) // back tracking
                )
            )
        }
        if (possibleNextDirections.length === 0) {
            throw new Error('NO!!!!!')
        }
        const direction = possibleNextDirections[0]
        renderDirection(direction)
        const output = move(direction)
        if (output !== WALL && currentNode.hasChild(pos) === false) {
            currentNode = currentNode.addChild(pos, output)
        }
        yield output
    }
}

function sleep(millis) {
    return new Promise(res => setTimeout(res, millis))
}

function step() {
    const output = gen.next().value
    totalSteps += 1
    render(output)
    return output
}

let paused = false
function togglePause() {
    paused = !paused
}

async function solve() {
    let output = null
    while (output !== OXYGEN_SYSTEM) {
        if (!paused) {
            output = step()
            await sleep(0)
        } else {
            await sleep(500)
        }
    }
}
