function safeRead(memory, address) {
    if (memory[address] === undefined) {
        memory[address] = 0
    }
    debug(`safeRead: memory[${address}] has value ${memory[address]}`)
    return memory[address]
}

function getParamFromMode(memory, ptr, mode, relativeBase) {
    const address = memory[ptr] + (mode === 2 ? relativeBase : 0)
    const value = mode === 1 ? memory[ptr] : safeRead(memory, address)
    return { address, value }
}

/*  mode1 is the mode for param1
    mode2 is the mode for param2
    mode3 is the mode for param3
    
    For example:
    ABCDE
     1002

    DE - two-digit opcode,      02 == opcode 2
    C - mode of 1st parameter,  0 == position mode
    B - mode of 2nd parameter,  1 == immediate mode
    A - mode of 3rd parameter,  0 == position mode, omitted due to being a leading zero
*/
function getModes(instruction) {
    const mode1 = Math.floor(instruction / 100) % 10
    const mode2 = Math.floor(instruction / 1000) % 10
    const mode3 = Math.floor(instruction / 10000) % 10
    const modes = [mode1, mode2, mode3]
    return modes
}

function getParams(computer, num) {
    const memory = computer.program
    const instruction = memory[computer.ptr++]
    const modes = getModes(instruction)
    const params = []
    for (let n = 0; n < num; n++, computer.ptr++) {
        params.push(
            getParamFromMode(
                memory,
                computer.ptr,
                modes[n],
                computer.relativeBase
            )
        )
    }
    return params
}

function add(computer) {
    const params = getParams(computer, 3)
    const result = params[0].value + params[1].value
    debug(`saving ${result} at address ${params[2].address}`)
    const memory = computer.program
    memory[params[2].address] = result
}

function mult(computer) {
    params = getParams(computer, 3)
    const result = params[0].value * params[1].value
    debug(`saving ${result} at address ${params[2].address}`)
    const memory = computer.program
    memory[params[2].address] = result
}

function readInput(computer, input) {
    params = getParams(computer, 1)
    debug(`saving ${input} at address ${params[0].address}`)
    const memory = computer.program
    memory[params[0].address] = input
}

function writeOutput(computer) {
    params = getParams(computer, 1)
    output = params[0].value
    debug('output:', output)
    return output
}

// if param1 is zero assign instr_ptr to value in param2
function jumpZero(computer) {
    params = getParams(computer, 2)
    debug(params[0].value ? 'jumping' : 'not jumping')
    if (params[0].value) {
        computer.ptr = params[1].value
    }
}

// if param1 is not zero assign instr_ptr to value in param2
function jumpNotZero(computer) {
    params = getParams(computer, 2)
    debug(params[0].value ? 'jumping' : 'not jumping')
    if (!params[0].value) {
        computer.ptr = params[1].value
    }
}

// if param1 < param2 assign 1 to address indicated by param3, otherwize assign 0
function setOnLessThan(computer) {
    params = getParams(computer, 3)
    const result = params[0].value < params[1].value ? 1 : 0
    debug(`saving ${result} at address ${params[2]}`)
    const memory = computer.program
    memory[params[2].address] = result
}

// if param1 === param2 assign 1 to address indicated by param3, otherwise assign 0
function setOnEqual(computer) {
    params = getParams(computer, 3)
    const result = params[0].value === params[1].value ? 1 : 0
    debug(`saving ${result} at address ${params[2]}`)
    const memory = computer.program
    memory[params[2].address] = result
}

function updateRelativeBase(computer) {
    params = getParams(computer, 1)
    computer.relativeBase += params[0].value
    debug(`relativeBase set to ${computer.relativeBase}`)
}

// instructions are in order of opcode offset (array index === opcode - 1)
const ALL_INSTRUCTIONS = [
    { name: 'ADD', exec: add },
    { name: 'MULT', exec: mult },
    { name: 'READ_INPUT', exec: readInput },
    { name: 'WRITE_OUTPUT', exec: writeOutput },
    { name: 'JUMP_ZERO', exec: jumpZero },
    { name: 'JUMP_NOT_ZERO', exec: jumpNotZero },
    { name: 'SET_ON_LESS_THAN', exec: setOnLessThan },
    { name: 'SET_ON_EQUAL', exec: setOnEqual },
    { name: 'UPDATE_RELATIVE_BASE', exec: updateRelativeBase }
]
