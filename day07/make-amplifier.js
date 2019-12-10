const data = require('../file-reader.js').readFile('data.txt', ',')
function makeAmplifier() {
    return {
        program: [...data], // make copy of data for each amplifier
        ptr: 0
    }
}

module.exports = makeAmplifier
