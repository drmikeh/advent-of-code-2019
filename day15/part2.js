function restoreOxygen(nodes) {
    let allNextNodes = new Set()
    nodes.forEach(node => {
        const hashPos = hash(node.pos)
        node.value = OXYGEN_RESTORED
        mazeCache.set(hashPos, OXYGEN_RESTORED)
        renderCell(node.pos)
        visited.add(hashPos)
        node.children
            .filter(n => n.value !== WALL && !visited.has(hash(n.pos)))
            .forEach(n => allNextNodes.add(n))
        if (node.parent && !visited.has(hash(node.parent.pos))) {
            allNextNodes.add(node.parent)
        }
    })
    return allNextNodes
}

let totalMinutes = -1
const visited = new Set()

async function part2() {
    console.log('part2')
    let nodes = new Set([oxygenSystemNode])
    while (nodes.size > 0) {
        nodes = restoreOxygen(nodes)
        totalMinutes = totalMinutes + 1
        renderTotalMinutes()
        await sleep(delay)
    }
}
