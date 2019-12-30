const RESULTS_HTML = [
    '<span class="wall">W</span>',
    '<span class="space"></span>',
    '<span class="oxygen-system">O</span>',
    '<span class="droid">&#129302;</span>',
    '<span class="marked-path">*</span>',
    '<span class="oxygen-restored">O</span>'
]

function getMazeDimensions() {
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
    return [minX, maxX, minY, maxY]
}

let previousMazeDimensions = [null, null, null, null]

function getCellHtml(pos) {
    const v = mazeCache.get(hash(pos))
    return v || v === 0
        ? RESULTS_HTML[v] || v
        : '<span class="unknown">?</span>'
}

function getRandomColor() {
    var rint = Math.floor(0x100000000 * Math.random())
    return (
        'rgb(' +
        (rint & 255) +
        ',' +
        ((rint >> 8) & 255) +
        ',' +
        ((rint >> 16) & 255) +
        ')'
    )
}

function renderCell(pos, color = null) {
    const text = getCellHtml(pos)
    const cell = document.getElementById(hash(pos))
    cell.innerHTML = text
    if (color) {
        cell.style.color = color
    }
}

function rerenderMaze([minX, maxX, minY, maxY]) {
    // console.log('rerenderMaze')
    // remove all child nodes
    while (mazeElement.firstChild) {
        mazeElement.removeChild(mazeElement.firstChild)
    }

    // add child nodes back
    for (let y = minY; y <= maxY; y++) {
        const row = document.createElement('tr')
        for (let x = minX; x <= maxX; x++) {
            const pos = { x, y }
            const text = getCellHtml(pos)
            const cell = document.createElement('td')
            cell.id = hash(pos)
            cell.innerHTML = text
            if (x === 0 && y === 0) cell.className = 'origin'
            // else if (v === MARKED_PATH) cell.className = 'marked-path'
            row.appendChild(cell)
        }
        mazeElement.appendChild(row)
    }
}

function renderMaze() {
    const dims = getMazeDimensions()
    if (
        previousMazeDimensions[0] === dims[0] &&
        previousMazeDimensions[1] === dims[1] &&
        previousMazeDimensions[2] === dims[2] &&
        previousMazeDimensions[3] === dims[3]
    ) {
        renderCell(oldPos)
        renderCell(pos)
    } else {
        previousMazeDimensions = dims
        rerenderMaze(dims)
    }
}

function checkArrowKeys(e) {
    const DIRECTIONS = [LEFT, UP, RIGHT, DOWN]
    const key = window.event ? event.keyCode : e.keyCode
    if (key && key > 36 && key < 41) {
        const direction = DIRECTIONS[key - 37]
        makeMove(direction)
    }
}
document.onkeydown = checkArrowKeys

const mazeElement = document.getElementById('maze')
const outputElement = document.getElementById('output')
const positionElement = document.getElementById('position')
const directionElement = document.getElementById('direction')
const stepsElement = document.getElementById('steps')
const currentDepthElement = document.getElementById('current-depth')
const maxDepthElement = document.getElementById('max-depth')
const oxygenSystemLocationElement = document.getElementById(
    'oxygen-system-location'
)
const oxygenSystemDistanceElement = document.getElementById(
    'oxygen-system-distance'
)
const totalMinutesElement = document.getElementById('total-minutes')

function renderTotalMinutes() {
    totalMinutesElement.innerHTML = totalMinutes || 'Unknown'
}

renderMaze()

function render(direction) {
    outputElement.innerHTML = RESULTS[output] || output
    directionElement.innerHTML = direction ? direction.name : 'null'
    positionElement.innerHTML = `(${pos.x}, ${pos.y})`
    stepsElement.innerHTML = totalSteps
    currentDepthElement.innerHTML = currentNode ? currentNode.depth : 0
    maxDepthElement.innerHTML = maxDepth
    oxygenSystemLocationElement.innerHTML = oxygenSystemNode
        ? `(${oxygenSystemNode.pos.x}, ${oxygenSystemNode.pos.y})`
        : 'Unknown'
    oxygenSystemDistanceElement.innerHTML = oxygenSystemDistance || 'Unknown'
    renderMaze()
}

function up() {
    makeMove(UP)
}

function down() {
    makeMove(DOWN)
}

function left() {
    makeMove(LEFT)
}

function right() {
    makeMove(RIGHT)
}
