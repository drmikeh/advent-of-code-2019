const getOrbits = require('./get-orbits')

// 3. find path length to root for all nodes
const totalOrbits = getOrbits().reduce((sum, node) => {
    const countParents = node =>
        node.parent ? 1 + countParents(node.parent) : 0
    return sum + countParents(node)
}, 0)

console.log(totalOrbits)
