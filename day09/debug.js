const DEBUG_LEVEL = 0

function info(...args) {
    if (DEBUG_LEVEL >= 1) {
        console.log('info:', args)
    }
}

function debug(...args) {
    if (DEBUG_LEVEL >= 2) {
        console.log('  debug:', args)
    }
}

module.exports = {
    info,
    debug
}
