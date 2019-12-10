const orbits = require('./common')

const YOU = orbits.find(n => n.name === 'YOU')
const SAN = orbits.find(n => n.name === 'SAN')

const getParents = node =>
    node.parent ? [node.parent, ...getParents(node.parent)] : []

const youParents = getParents(YOU)
const sanParents = getParents(SAN)

function getSanDistanceToCommonParent() {
    let sanDistanceToCommonParent = 0
    let parent = sanParents[0]
    while (!youParents.find(p => p.name === parent.name)) {
        sanDistanceToCommonParent += 1
        parent = parent.parent
    }
    return { sanDistanceToCommonParent, commonParent: parent }
}

const {
    sanDistanceToCommonParent,
    commonParent
} = getSanDistanceToCommonParent()

function getDistanceToParent(node, parent) {
    let count = 0
    while (node !== parent) {
        ++count
        node = node.parent
    }
    return count
}

const youDistanceToCommonParent = getDistanceToParent(YOU.parent, commonParent)
const totalDistance = sanDistanceToCommonParent + youDistanceToCommonParent
console.log({
    sanDistanceToCommonParent,
    youDistanceToCommonParent,
    totalDistance
})
