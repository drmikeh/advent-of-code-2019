const makeComputer = require('../day09/make-computer')
const paint = require('./paint')

const computer = makeComputer('data.txt')
const panelsPainted = paint(computer)

const keys = Object.keys(panelsPainted)

const minX = keys.reduce(
    (min, panelKey) => Math.min(min, panelKey.split(',')[0]),
    +999
)
const maxX = keys.reduce(
    (max, panelKey) => Math.max(max, panelKey.split(',')[0]),
    -999
)
const minY = keys.reduce(
    (min, panelKey) => Math.min(min, panelKey.split(',')[1]),
    +999
)
const maxY = keys.reduce(
    (max, panelKey) => Math.max(max, panelKey.split(',')[1]),
    -999
)

for (let y = minY; y <= maxY; y++) {
    let line = ''
    for (let x = minX; x <= maxX; x++) {
        if (panelsPainted[x + ',' + y] === 1) {
            line += '#'
        } else {
            line += ' '
        }
    }
    console.log(line)
}
