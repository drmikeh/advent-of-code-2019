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

function getCombinations(array) {
    const combinations = []
    const a2 = [...array]
    while (a2.length > 1) {
        const first = a2.shift()
        a2.forEach(second => combinations.push([first, second]))
    }
    return combinations
}

function updatePair(first, second) {
    const props = ['x', 'y', 'z']
    props.forEach(prop => {
        first.velocity[prop] +=
            (first.position[prop] < second.position[prop]) -
            (first.position[prop] > second.position[prop])
        second.velocity[prop] +=
            (second.position[prop] < first.position[prop]) -
            (second.position[prop] > first.position[prop])
    })
}

const pairs = getCombinations(moons)

for (let time = 1; time <= 1000; time++) {
    // update velocities
    pairs.forEach(pair => {
        updatePair(pair[0], pair[1])
    })
    // update positions
    moons.forEach(moon => {
        moon.position.x += moon.velocity.x
        moon.position.y += moon.velocity.y
        moon.position.z += moon.velocity.z
    })
}

function calcEnergy(moon) {
    const potentialEnergy =
        Math.abs(moon.position.x) +
        Math.abs(moon.position.y) +
        Math.abs(moon.position.z)
    const kineticEnergy =
        Math.abs(moon.velocity.x) +
        Math.abs(moon.velocity.y) +
        Math.abs(moon.velocity.z)
    return potentialEnergy * kineticEnergy
}

// calculate total energy
const totalEnergy = moons.map(calcEnergy).reduce((sum, e) => sum + e, 0)
console.log(totalEnergy)
