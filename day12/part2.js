const data = require('../file-reader.js').readFile('data.txt', '\n', String)
const moons = data
    .map(str => {
        const positions = str
            .substr(3)
            .split('=')
            .map(n => parseInt(n))
        return {
            position: {
                x: positions[0],
                y: positions[1],
                z: positions[2]
            }
        }
    })
    .map(moon => ({ ...moon, velocity: { x: 0, y: 0, z: 0 } }))

const makeHash = values =>
    values.reduce(
        (str, value) => str + `(${value.position},${value.velocity})`,
        ''
    )

function calcSteps(values) {
    let states = {}
    let steps = 0
    let found = false
    let hash = makeHash(values)
    states[hash] = steps++

    while (!found) {
        // update velocities
        values.forEach(first => {
            values.forEach(second => {
                first.velocity +=
                    (first.position < second.position) -
                    (first.position > second.position)
            })
        })
        // update positions
        values.forEach(value => {
            value.position += value.velocity
        })
        hash = makeHash(values)
        if (states[hash] !== undefined) {
            found = true
        } else {
            states[hash] = steps++
        }
    }
    console.log('calcSteps:', hash, steps)
    return steps
}

const xSteps = calcSteps(
    moons.map(m => ({ position: m.position.x, velocity: 0 }))
)
const ySteps = calcSteps(
    moons.map(m => ({ position: m.position.y, velocity: 0 }))
)
const zSteps = calcSteps(
    moons.map(m => ({ position: m.position.z, velocity: 0 }))
)

const gcd2 = (a, b) => (b ? gcd2(b, a % b) : b === 0 ? a : NaN)
const lcm2 = (a, b) => (a * b) / gcd2(a, b)
function lcm(array) {
    let n = 1
    for (let i = 0; i < array.length; i++) n = lcm2(array[i], n)
    return n
}

console.log(lcm([xSteps, ySteps, zSteps]))
