function runProgram(computer, input, returnOnOutput = false) {
    const memory = computer.program
    let output = null
    while (computer.ptr < memory.length && memory[computer.ptr] !== 99) {
        const opcode = memory[computer.ptr] % 10
        const instruction = ALL_INSTRUCTIONS[opcode - 1]
        info(`${computer.ptr}: ${instruction.name}`)
        output = instruction.exec(computer, input)
        if ((output || output === 0) && returnOnOutput) {
            info('output:', output)
            return output
        }
    }
    info(`${computer.ptr}: HALT: ${memory[computer.ptr]}, ${output}`)
    return output || -1 // reached the HALT instruction
}
