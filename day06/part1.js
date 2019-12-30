const getOrbits = require('./get-orbits')

const countParents = node => (node.parent ? 1 + countParents(node.parent) : 0)

// sum up the depths of all nodes in the tree
const totalOrbits = getOrbits().reduce((sum, node) => {
    return sum + countParents(node)
}, 0)

console.log(totalOrbits)
