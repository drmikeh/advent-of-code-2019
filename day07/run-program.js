function runProgram(amp, phase, input) {
    const program = amp.program
    let nextInput = phase
    let output = null
    while (amp.ptr < program.length && program[amp.ptr] !== 99) {
        const instruction = program[amp.ptr]
        const opcode = instruction % 10
        const mode1 = Math.floor(instruction / 100) % 10
        const mode2 = Math.floor(instruction / 1000) % 10
        const param1 = mode1
            ? program[amp.ptr + 1]
            : program[program[amp.ptr + 1]]
        const param2 = mode2
            ? program[amp.ptr + 2]
            : program[program[amp.ptr + 2]]
        switch (opcode) {
            case 1:
                program[program[amp.ptr + 3]] = param1 + param2
                amp.ptr += 4
                break
            case 2:
                program[program[amp.ptr + 3]] = param1 * param2
                amp.ptr += 4
                break
            case 3:
                program[program[amp.ptr + 1]] = nextInput
                nextInput = input
                amp.ptr += 2
                break
            case 4:
                output = program[program[amp.ptr + 1]]
                amp.ptr += 2
                return output
            case 5:
                amp.ptr = param1 ? param2 : amp.ptr + 3
                break
            case 6:
                amp.ptr = !param1 ? param2 : amp.ptr + 3
                break
            case 7:
                program[program[amp.ptr + 3]] = param1 < param2 ? 1 : 0
                amp.ptr += 4
                break
            case 8:
                program[program[amp.ptr + 3]] = param1 === param2 ? 1 : 0
                amp.ptr += 4
                break
            default:
                throw new Error(
                    `unrecognized opcode: ${opcode} at address ${amp.ptr}`
                )
        }
    }
    return -1 // reached the HALT instruction
}

module.exports = runProgram
