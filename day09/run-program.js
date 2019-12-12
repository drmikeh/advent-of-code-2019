const DEBUG_LEVEL = 0

function info(...args) {
    if (DEBUG_LEVEL >= 1) {
        console.log('info:', args)
    }
}

function debug(...args) {
    if (DEBUG_LEVEL >= 2) {
        console.log('debug:', args)
    }
}

function safeRead(memory, address) {
    if (memory[address] === undefined) {
        memory[address] = 0
    }
    debug(`  safeRead: memory[${address}] has value ${memory[address]}`)
    return memory[address]
}

function getParamFromMode(memory, ptr, mode, relativeBase) {
    const address = memory[ptr] + (mode === 2 ? relativeBase : 0)
    const value = mode === 1 ? memory[ptr] : safeRead(memory, address)
    return { address, value }
}

function getParams(num, memory, ptr, modes, relativeBase) {
    const params = []
    for (let n = 0; n < num; n++) {
        params.push(
            getParamFromMode(memory, ptr + n + 1, modes[n], relativeBase)
        )
    }
    return params
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

function runProgram(amp, input) {
    const memory = amp.program
    let output = null
    while (amp.ptr < memory.length && memory[amp.ptr] !== 99) {
        debug('PTR:', amp.ptr)
        const instruction = memory[amp.ptr]
        const opcode = instruction % 10
        let modes = null
        let params = null

        switch (opcode) {
            // ADDITION
            case 1:
                modes = getModes(instruction)
                params = getParams(3, memory, amp.ptr, modes, amp.relativeBase)
                info('  ADD')
                const result1 = params[0].value + params[1].value
                debug(`  saving ${result1} at address ${params[2].address}`)
                memory[params[2].address] = result1
                amp.ptr += 4
                break
            // MULTIPLICATION
            case 2:
                modes = getModes(instruction)
                params = getParams(3, memory, amp.ptr, modes, amp.relativeBase)
                info('  MULT')
                const result2 = params[0].value * params[1].value
                debug(`  saving ${result2} at address ${params[2].address}`)
                memory[params[2].address] = result2
                amp.ptr += 4
                break
            // READ INPUT AND STORE IN ADDRESS
            case 3:
                modes = getModes(instruction)
                params = getParams(1, memory, amp.ptr, modes, amp.relativeBase)
                info('  READ_INPUT')
                debug(`  saving ${input} at address ${params[0].address}`)
                memory[params[0].address] = input
                amp.ptr += 2
                break
            // WRITE OUTPUT FROM ADDRESS
            case 4:
                modes = getModes(instruction)
                params = getParams(1, memory, amp.ptr, modes, amp.relativeBase)
                info('  WRITE_OUTPUT')
                output = params[0].value
                amp.ptr += 2
                // return output
                // console.log('output', output)
                break
            // JUMP ON ZERO (if param1 is zero assign instr_ptr to value in param2)
            case 5:
                modes = getModes(instruction)
                params = getParams(2, memory, amp.ptr, modes, amp.relativeBase)
                info(
                    '  JUMP_ZERO:',
                    params[0].value ? 'jumping' : 'not jumping'
                )
                amp.ptr = params[0].value ? params[1].value : amp.ptr + 3
                break
            // JUMP ON NOT ZERO (if param1 is not zero assign instr_ptr to value in param2)
            case 6:
                modes = getModes(instruction)
                params = getParams(2, memory, amp.ptr, modes, amp.relativeBase)
                info(
                    '  JUMP_NOT_ZERO:',
                    params[0].value ? 'jumping' : 'not jumping'
                )
                amp.ptr = !params[0].value ? params[1].value : amp.ptr + 3
                break
            // SET LESS THAN (if param1 < param2 assign 1 to address indicated by param3, otherwize assign 0)
            case 7:
                modes = getModes(instruction)
                params = getParams(3, memory, amp.ptr, modes, amp.relativeBase)
                info('  SET_LESS_THAN')
                const result7 = params[0].value < params[1].value ? 1 : 0
                memory[params[2].address] = result7
                debug(`  saving ${result7} at address ${params[2]}`)
                amp.ptr += 4
                break
            // SET ADDRESS ON EQUAL (if param1 === param2 assign 1 to address indicated by param3, otherwise assign 0)
            case 8:
                modes = getModes(instruction)
                params = getParams(3, memory, amp.ptr, modes, amp.relativeBase)
                info('  SET_EQUAL')
                const result8 = params[0].value === params[1].value ? 1 : 0
                memory[params[2].address] = result8
                debug(`  saving ${result8} at address ${params[2]}`)
                amp.ptr += 4
                break
            // Update relative base address
            case 9:
                modes = getModes(instruction)
                params = getParams(1, memory, amp.ptr, modes, amp.relativeBase)
                info('  UPDATE_RELATIVE_BASE:')
                amp.relativeBase += params[0].value
                debug(`  >> relativeBase set to ${amp.relativeBase}`)
                amp.ptr += 2
                break
            default:
                throw new Error(
                    `unrecognized opcode: ${opcode} at address ${amp.ptr}`
                )
        }
    }
    debug('HALT:', memory[amp.ptr])
    return output // reached the HALT instruction
}

module.exports = runProgram
