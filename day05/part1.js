function execute(mem, ptr, input) {
    const instruction = mem[ptr]
    const opcode = instruction % 10
    // console.log(instruction, opcode)
    const mode1 = Math.floor(instruction / 100) % 10
    const mode2 = Math.floor(instruction / 1000) % 10
    const param1 = mode1 ? mem[ptr + 1] : mem[mem[ptr + 1]]
    const param2 = mode2 ? mem[ptr + 2] : mem[mem[ptr + 2]]
    switch (opcode) {
        case 1:
            mem[mem[ptr + 3]] = param1 + param2
            return ptr + 4
        case 2:
            mem[mem[ptr + 3]] = param1 * param2
            return ptr + 4
        case 3:
            mem[mem[ptr + 1]] = input
            return ptr + 2
        case 4:
            console.log('OUTPUT:', mem[mem[ptr + 1]])
            return ptr + 2
        default:
            console.error('unrecognized opcode:', opcode)
    }
}

const instructions = require('../file-reader.js').readFile('data.txt', ',')
let instrPtr = 0
while (instrPtr < instructions.length && instructions[instrPtr] !== 99) {
    instrPtr = execute(instructions, instrPtr, 1)
}
