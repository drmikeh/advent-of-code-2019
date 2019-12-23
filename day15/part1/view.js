function renderMaze() {
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
    // console.log('mazeCache size:', mazeCache.size, { minX, maxX, minY, maxY })

    // remove all child nodes
    while (mazeElement.firstChild) {
        mazeElement.removeChild(mazeElement.firstChild)
    }

    // add child nodes back
    for (let y = minY; y <= maxY; y++) {
        const row = document.createElement('tr')
        for (let x = minX; x <= maxX; x++) {
            const pos = { x, y }
            const v = mazeCache.get(hash(pos))
            const text =
                v || v === 0
                    ? RESULTS_HTML[v] || v
                    : '<span class="unknown">?</span>'
            const cell = document.createElement('td')
            cell.innerHTML = text
            row.appendChild(cell)
        }
        mazeElement.appendChild(row)
    }
}

function checkArrowKeys(e) {
    const DIRECTIONS = [LEFT, UP, RIGHT, DOWN]
    const key = window.event ? event.keyCode : e.keyCode
    if (key && key > 36 && key < 41) {
        const direction = DIRECTIONS[key - 37]
        const output = move(direction)
        renderOutput(output)
        renderPosition()
        renderMaze()
    }
}
document.onkeydown = checkArrowKeys

const mazeElement = document.getElementById('maze')
const outputElement = document.getElementById('output')
const positionElement = document.getElementById('position')
const directionElement = document.getElementById('direction')

renderMaze()

function renderOutput(output) {
    outputElement.innerHTML = RESULTS[output] || output
}

function renderPosition() {
    positionElement.innerHTML = `(${pos.x}, ${pos.y})`
}

function renderDirection(direction) {
    directionElement.innerHTML = direction.name
}

function up() {
    const output = move(UP)
    renderOutput(output)
    renderPosition()
    renderMaze()
}

function down() {
    const output = move(DOWN)
    renderOutput(output)
    renderPosition()
    renderMaze()
}

function left() {
    const output = move(LEFT)
    renderOutput(output)
    renderPosition()
    renderMaze()
}

function right() {
    const output = move(RIGHT)
    renderOutput(output)
    renderPosition()
    renderMaze()
}
