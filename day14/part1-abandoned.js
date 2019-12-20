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

const inputFiles = [
    { name: 'data.txt', expected: 443537 },
    { name: 'ex1.txt', expected: 165 },
    { name: 'ex2.txt', expected: 13312 },
    { name: 'ex3.txt', expected: 180697 },
    { name: 'ex4.txt', expected: 2210736 }
]
const inputFile = inputFiles.find(f => f.name === process.argv[2])

const reactions = require('../file-reader')
    .readFile(inputFile.name, '\n', String)
    .map(parseReaction)

function countAndElementToString(countAndElement) {
    return `${countAndElement.qty} ${countAndElement.name}`
}
function reactionToString(reaction) {
    const left = reaction.inputs.map(countAndElementToString).join(', ')
    const right = countAndElementToString(reaction.output)
    return left + ' => ' + right
}

const findReactionProducing = name =>
    reactions.find(r => r.output.name === name)

function reduce(reaction, depth = 0) {
    return reaction.inputs
        .map(input => {
            const producer = findReactionProducing(input.name)
            const scaledProducer = {
                inputs: producer.inputs.map(pi => ({
                    ...pi,
                    qty: Math.ceil(
                        (pi.qty * Math.ceil(input.qty)) / producer.output.qty
                    )
                    // qty: Math.ceil(pi.qty / producer.output.qty) * input.qty
                })),
                output: { ...producer.output, qty: input.qty }
            }
            console.log(
                ' '.repeat(depth * 2),
                'reducing input:',
                countAndElementToString(input),
                'with scaledProducer:',
                reactionToString(scaledProducer)
            )
            if (scaledProducer.inputs[0].name === 'ORE') {
                return scaledProducer
            } else {
                return reduce(scaledProducer, depth + 1)
            }
        })
        .flat()
}

const finalReaction = findReactionProducing('FUEL')
const results = reduce(finalReaction)
// console.log('results:', results)
// console.log('results:', JSON.stringify(results, null, 2))
// console.log('results:', results.map(reactionToString))

const groupedResults = results.reduce((groups, r) => {
    const group = groups.find(g => g.output.name === r.output.name)
    if (group) {
        group.inputs[0].qty += r.inputs[0].qty
        group.output.qty += r.output.qty
    } else {
        groups.push(r)
    }
    return groups
}, [])

console.log('groupedResults:', groupedResults.map(reactionToString))

const sss = groupedResults.map(g => {
    const lookup = reactions.find(r => r.output.name === g.output.name)
    console.log('lookup:', reactionToString(lookup))
    return Math.ceil((lookup.inputs[0].qty * g.output.qty) / lookup.output.qty)
})

const sum = sss.reduce((sum, r) => sum + r, 0)
console.log(
    sum === inputFile.expected ? '👍' : '🥵',
    'ORE Required:',
    sum,
    'expected:',
    inputFile.expected
)
