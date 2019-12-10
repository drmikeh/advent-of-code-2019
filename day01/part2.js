const data = require('../file-reader.js').readFile('data.txt')
function computeFuel(mass) {
    const fuel = Math.floor(mass / 3) - 2
    return fuel <= 0 ? 0 : fuel + computeFuel(fuel)
}
const fuel = data.map(computeFuel).reduce((a, b) => a + b, 0)
console.log(fuel)
