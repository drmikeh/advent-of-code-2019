function makeMove(direction) {
    totalSteps += 1
    currentNode.value = move(direction)
    render(direction)
    // if we moved into a new SPACE that we haven't seen before, add the proper children
    if (currentNode.value !== WALL && currentNode.children.length === 0) {
        DIRECTIONS.filter(
            dir => !currentNode.isParentPosition(dir.move(pos))
        ).forEach(dir => {
            currentNode.addChild(dir.move(pos), null)
        })
    } else if (currentNode.value === WALL) {
        currentNode = currentNode.parent || currentNode
    }
}

function* stepper() {
    while (true) {
        // printTree()
        currentNode = currentNode.getNextUnvisitedChild() || currentNode.parent
        if (currentNode === null) {
            yield null
        }
        const direction = getDirectionToNode(currentNode)
        makeMove(direction)
        yield currentNode.value
    }
}

const gen = stepper()

function step() {
    gen.next().value
}

async function part1() {
    // while (output !== OXYGEN_SYSTEM) {
    while (currentNode !== null) {
        if (!paused) {
            step()
            await sleep(0)
        } else {
            await sleep(0)
        }
    }
    // highlight the path to the oxygen system
    // currentNode = currentNode.parent
    // while (currentNode !== root) {
    //     const pos = currentNode.pos
    //     mazeCache.set(hash(pos), MARKED_PATH)
    //     render(direction)
    //     await sleep(0)
    //     currentNode = currentNode.parent
    // }
}
