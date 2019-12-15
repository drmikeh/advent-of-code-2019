const map = require('../file-reader')
    .readFile('./data.txt', '\n', String)
    .map(row => row.split(''))

const NUM_ROWS = map.length
const NUM_COLS = map[0].length

const DEBUG = false
function debug(...args) {
    if (DEBUG) {
        console.log(args)
    }
}

function getAstroids() {
    const astroids = []
    for (let y = 0; y < NUM_ROWS; y++) {
        for (let x = 0; x < NUM_COLS; x++) {
            if (map[y][x] === '#') {
                astroids.push({ x, y })
            }
        }
    }
    return astroids
}

const gcdCalc = (a, b) => (b ? gcdCalc(b, a % b) : a)

function isInBounds(next) {
    return 0 <= next.x && next.x < NUM_COLS && 0 <= next.y && next.y < NUM_ROWS
}

function findAstroid(astroids, location) {
    return astroids.find(rock => rock.x === location.x && rock.y === location.y)
}

function isVisible(astroids, src, dst) {
    if (src.x === dst.x && src.y === dst.y) {
        return false // don't count seeing yourself
    }
    const diff = { x: dst.x - src.x, y: dst.y - src.y }
    const gcd = Math.abs(gcdCalc(diff.x, diff.y))
    const delta = {
        x: diff.x / gcd,
        y: diff.y / gcd
    }
    let next = { x: src.x + delta.x, y: src.y + delta.y }

    while ((next.x !== dst.x || next.y !== dst.y) && isInBounds(next)) {
        if (findAstroid(astroids, next)) {
            debug(
                `    BLOCKED: (${src.x}, ${src.y}) cannot see (${dst.x}, ${dst.y}) because it is blocked by (${next.x}, ${next.y})`
            )
            return false
        }
        next = { x: next.x + delta.x, y: next.y + delta.y }
    }
    debug(`    VISIBLE: (${src.x}, ${src.y}) can see (${dst.x}, ${dst.y})`)
    return true
}

const countVisible = (astroids, home) =>
    astroids.reduce(
        (sum, astroid) => (sum += isVisible(astroids, home, astroid) ? 1 : 0),
        0
    )

module.exports = {
    getAstroids,
    countVisible,
    isVisible
}
