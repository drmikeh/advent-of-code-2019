let debugLevel = 0

function info(...args) {
    if (debugLevel >= 1) {
        console.log('info:', ...args)
    }
}

function debug(...args) {
    if (debugLevel >= 2) {
        console.log('  debug:', ...args)
    }
}

function toggleDebugMessages() {
    debugLevel = (debugLevel + 1) % 3
}

function clearDebugMessages() {
    console.clear()
}

function getDebugLevel() {
    return debugLevel
}
