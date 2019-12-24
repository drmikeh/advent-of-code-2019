class TreeNode {
    constructor(parent, pos, value, depth) {
        this.parent = parent // for backtracking
        this.pos = pos
        this.value = value // SPACE or OXYGEN_SYSTEM
        this.depth = depth
        this.children = []
    }
    addChild(pos, value) {
        const child = new TreeNode(this, pos, value, this.depth + 1)
        this.children.push(child)
        return child
    }
    getNextUnvisitedChild() {
        return this.children.find(child => child.value === null)
    }
    hasChild(pos) {
        const found = this.children.find(
            child => child.pos.x === pos.x && child.pos.y === pos.y
        )
        return !!found
    }
    isParentPosition(pos) {
        if (this.parent === null) return false
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
const root = new TreeNode(null, pos, SPACE, 0)
DIRECTIONS.forEach(dir => {
    root.addChild(dir.move(pos), null)
})
let currentNode = root

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

function* stepper() {
    let found = false
    while (!found) {
        // printTree()
        currentNode = currentNode.getNextUnvisitedChild() || currentNode.parent
        const direction = getDirectionToNode(currentNode)
        renderDirection(direction)
        currentNode.value = move(direction)

        // if we moved into a new SPACE that we haven't seen before, add the proper children
        if (currentNode.value !== WALL && currentNode.children.length === 0) {
            DIRECTIONS.filter(
                dir => !currentNode.isParentPosition(dir.move(pos))
            ).forEach(dir => {
                currentNode.addChild(dir.move(pos), null)
            })
        } else if (currentNode.value === WALL) {
            currentNode = currentNode.parent
        }
        yield currentNode.value
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
            await sleep(50)
        }
    }
}
