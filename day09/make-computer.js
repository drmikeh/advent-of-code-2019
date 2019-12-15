function makeComputer(dataFile) {
    const data = require('../file-reader.js').readFile(dataFile, ',')
    return {
        program: [...data], // make a copy of the data for each computer
        ptr: 0,
        relativeBase: 0
    }
}

module.exports = makeComputer
