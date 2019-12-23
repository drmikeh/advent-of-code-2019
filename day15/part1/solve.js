class TreeNode {
    constructor(value) {
        this.value = value
        this.children = []
    }
}

function render(output) {
    renderOutput(output)
    renderPosition()
    renderMaze()
}

const DIRECTIONS = [UP, DOWN, LEFT, RIGHT]

function* stepper2() {
    const stack = DIRECTIONS // should this be a tree instead of an array
    while (stack.length > 0) {
        const direction = stack.shift()
        renderDirection(direction)
        const output = move(direction)
        if (output !== WALL) {
            const nextDirections = [
                ...DIRECTIONS.filter(dir => dir !== direction.reverse),
                direction.reverse
            ]
            stack.unshift(...nextDirections)
            console.log({ stack })
            yield output
        } else {
            yield output
        }
    }
}

function checkForUnknownValue(direction, pos) {
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

function* stepper() {
    let found = false
    let lastDirection = UP
    while (!found) {
        let possibleNextDirections = DIRECTIONS.filter(dir =>
            checkForUnknownValue(dir, pos)
        )
        if (possibleNextDirections.length === 0) {
            console.log(
                'all directions have known values, so pick a random space'
            )
            const spaces = DIRECTIONS.filter(dir =>
                checkMoveValue(dir, pos, SPACE)
            )
            const randomIndex = Math.floor(Math.random() * spaces.length)
            possibleNextDirections.push(spaces[randomIndex])
        }
        if (possibleNextDirections.length === 0) {
            console.log('MUST REVERSE')
            // possibleNextDirections.push(lastDirection) // as a last resort, go backwards
            possibleNextDirections = DIRECTIONS.filter(dir =>
                checkMoveValue(dir, pos, SPACE)
            )
        }
        if (possibleNextDirections.length === 0) {
            console.log(mazeCache.get(hash(UP.move(pos))))
            console.error(
                `ERROR: Cannot find a nextDirection for position ${hash(
                    pos
                )} and lastDirection ${lastDirection.name}`
            )
            throw new Error('NO!!!!!')
        }
        console.log(
            `possibleNextDirections: ${possibleNextDirections.map(
                dir => dir.name
            )}`
        )
        const direction = possibleNextDirections[0]
        renderDirection(direction)
        const output = move(direction)
        lastDirection = direction
        yield output
    }
}

function sleep(millis) {
    return new Promise(res => setTimeout(res, millis))
}

const gen = stepper()

function step() {
    const output = gen.next().value
    render(output)
    return output
}

async function solve() {
    let output = null
    while (output !== OXYGEN_SYSTEM) {
        output = step()
        await sleep(0)
    }
}
