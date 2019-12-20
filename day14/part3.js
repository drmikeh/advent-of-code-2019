const calcOre = require('./calc-ore')
const { readReactions } = require('./read-reactions')

const reactions = readReactions()

for (let requiredFuel = 1; requiredFuel < 100; requiredFuel++) {
    const oreNeeded = calcOre(reactions, 'FUEL', requiredFuel)
    const oreToFuelRatio = Math.ceil(oreNeeded / requiredFuel)
    console.log({ oreNeeded, requiredFuel, oreToFuelRatio })
}
