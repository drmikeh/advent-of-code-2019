const DEBUG = false
function debug(...args) {
    if (DEBUG) console.log(...args)
}

function countAndElementToString(countAndElement) {
    return `${countAndElement.qty} ${countAndElement.name}`
}
function reactionToString(reaction) {
    const left = reaction.inputs.map(countAndElementToString).join(', ')
    const right = countAndElementToString(reaction.output)
    return left + ' => ' + right
}

function calcOre(reactions, product, qty, surplusCache = new Map(), depth = 0) {
    const producer = reactions.find(r => r.output.name === product)
    const surplus = surplusCache.has(product) ? surplusCache.get(product) : 0
    const factor = Math.ceil(Math.max(qty - surplus, 0) / producer.output.qty)
    const extra = producer.output.qty * factor - (qty - surplus)
    if (product !== 'ORE') surplusCache.set(product, extra)
    debug(
        ' '.repeat(depth * 2),
        'reducing',
        qty,
        product,
        'with producer',
        reactionToString(producer),
        'and factor',
        factor,
        'and extra',
        extra
    )

    const sum = producer.inputs.reduce((sum, input) => {
        debug(' '.repeat(depth * 2), { input, sum })
        return (
            sum +
            (input.name === 'ORE'
                ? factor * input.qty
                : calcOre(
                      reactions,
                      input.name,
                      factor * input.qty,
                      surplusCache,
                      depth + 1
                  ))
        )
    }, 0)
    debug(' '.repeat(depth * 2), { sum })
    debug({ surplusCache })
    return sum
}

module.exports = calcOre
