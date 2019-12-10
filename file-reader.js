const fs = require('fs')
exports.readFile = (fileName, separator = '\n', mapFunction = Number) => {
    return fs
        .readFileSync(fileName, 'utf-8')
        .split(separator)
        .filter(Boolean)
        .map(mapFunction)
}
