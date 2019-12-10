const data = require('../file-reader.js').readFile('data.txt', ',')

data[1] = 12
data[2] = 2
let index = 0

while (index < data.length && data[index] !== 99) {
    const opcode = data[index]
    if (opcode === 1) {
        data[data[index + 3]] = data[data[index + 1]] + data[data[index + 2]]
    } else if (opcode === 2) {
        data[data[index + 3]] = data[data[index + 1]] * data[data[index + 2]]
    } else {
        console.error('unrecognized opcode:', opcode)
    }
    index += 4
}

console.log(data[0])
