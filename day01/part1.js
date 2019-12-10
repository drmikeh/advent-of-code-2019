const data = require('../file-reader.js').readFile('data.txt')
const computeFuel = mass => Math.floor(mass / 3) - 2
const fuel = data.map(computeFuel).reduce((a, b) => a + b, 0)
console.log(fuel)
