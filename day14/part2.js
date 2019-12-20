const calcOre = require('./calc-ore')
const { readReactions } = require('./read-reactions')

const reactions = readReactions()
const oreToFuelRatio = calcOre(reactions, 'FUEL', 1)
const ORE_STORAGE = 1000 * 1000 * 1000 * 1000

const DEBUG = false
function debug(...args) {
    if (DEBUG) console.log(...args)
}

// start with a minimum estimate - i.e. the fuel produced if there were no optimization (i.e. sharing of excess ore produced between reactions)
let fuelProduced = Math.ceil(ORE_STORAGE / oreToFuelRatio)

while (true) {
    const oreRequired = calcOre(reactions, 'FUEL', fuelProduced)
    const estimatedFuelProduced = Math.ceil(oreRequired / oreToFuelRatio)
    debug({ oreRequired, fuelProduced })
    if (oreRequired < ORE_STORAGE) {
        const strideAmount = Math.ceil(
            (ORE_STORAGE - oreRequired) / oreToFuelRatio
        )
        debug(
            `${fuelProduced} : ${estimatedFuelProduced} : skipping forward by approximately ${strideAmount} as ${oreRequired.toExponential()} < ${ORE_STORAGE.toExponential()}`
        )
        fuelProduced += strideAmount
    } else {
        debug(
            `${fuelProduced} going back by 1 as ${oreRequired.toExponential()} > ${ORE_STORAGE.toExponential()}`
        )
        fuelProduced -= 1
        // sanity check
        const oreNotUsed =
            ORE_STORAGE - calcOre(reactions, 'FUEL', fuelProduced)
        console.log({ fuelProduced, oreNotUsed, oreToFuelRatio }) // 2910558
        break
    }
}
