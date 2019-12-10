const theProgram = require('../file-reader.js').readFile('data.txt', ',')

function compute(program, noun, verb) {
    const data = [...program]
    data[1] = noun
    data[2] = verb
    let index = 0

    while (index < data.length && data[index] !== 99) {
        const opcode = data[index]
        if (opcode === 1) {
            data[data[index + 3]] =
                data[data[index + 1]] + data[data[index + 2]]
        } else if (opcode === 2) {
            data[data[index + 3]] =
                data[data[index + 1]] * data[data[index + 2]]
        } else {
            console.error('unrecognized opcode:', opcode)
        }
        index += 4
    }
    return data[0]
}

function search(program) {
    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            const result = compute(program, noun, verb)
            if (result === 19690720) {
                return [noun, verb]
            }
        }
    }
}

const [noun, verb] = search(theProgram)
console.log(100 * noun + verb)
