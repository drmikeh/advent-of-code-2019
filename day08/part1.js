const getLayers = require('./get-layers')

const WIDTH = 25
const HEIGHT = 6

const countChar = (str, char) =>
    str.split('').reduce((sum, c) => (c === char ? sum + 1 : sum), 0)

const layerWithFewestZeros = getLayers(WIDTH, HEIGHT).reduce(
    (layer1, layer2) => {
        const z1 = countChar(layer1, '0')
        const z2 = countChar(layer2, '0')
        return z1 < z2 ? layer1 : layer2
    }
)

const numOnes = countChar(layerWithFewestZeros, '1')
const numTwos = countChar(layerWithFewestZeros, '2')
console.log(numOnes * numTwos) // 2318
