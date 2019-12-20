const inputFiles = [
    { name: 'data.txt', expected: 443537 },
    { name: 'ex1.txt', expected: 165 },
    { name: 'ex2.txt', expected: 13312 },
    { name: 'ex3.txt', expected: 180697 },
    { name: 'ex4.txt', expected: 2210736 }
]
const inputFile = inputFiles.find(
    f => f.name === (process.argv[2] || 'data.txt')
)

function parseCountAndElement(countAndElement) {
    const parts = countAndElement.split(' ')
    const name = parts[1]
    const qty = Number(parts[0])
    return { name, qty }
}

function parseReaction(str) {
    const [left, right] = str.split(' => ')
    const inputs = left
        .split(',')
        .map(s => s.trim())
        .map(parseCountAndElement)
    const output = parseCountAndElement(right)
    return { inputs, output }
}

function readReactions() {
    return require('../file-reader')
        .readFile(inputFile.name, '\n', String)
        .map(parseReaction)
}

module.exports = { expected: inputFile.expected, readReactions }
