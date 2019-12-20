const calcOre = require('./calc-ore')
const { expected, readReactions } = require('./read-reactions')

const oreRequired = calcOre(readReactions(), 'FUEL', 1)
console.log(
    oreRequired === expected ? '👍' : '🥵',
    'ORE Required:',
    oreRequired,
    'expected:',
    expected
)
