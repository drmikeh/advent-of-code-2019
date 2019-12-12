const orbits = require('../file-reader.js')
    .readFile('data.txt', '\n', String)
    .map(s => s.split(')'))

function getOrbits() {
    // 1. build nodes from the orbits
    const root = { name: 'COM', parent: null }
    const nodes = [root]
    orbits.forEach(o => {
        const [center, orbiter] = o
        nodes.push({ name: orbiter, parent: center })
    })

    // 2. build tree by connecting nodes to parent nodes
    nodes.forEach(node => {
        if (node.parent) {
            node.parent = nodes.find(n => n.name === node.parent)
        }
    })
    return nodes
}
module.exports = getOrbits
