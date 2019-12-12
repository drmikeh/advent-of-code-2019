const getLayers = require('./get-layers')

const WIDTH = 25
const HEIGHT = 6

const layers = getLayers(WIDTH, HEIGHT)

// 0 is black, 1 is white, and 2 is transparent

let finalImage = ''
for (let i = 0; i < WIDTH * HEIGHT; i++) {
    let layerIndex = 0
    while (layers[layerIndex][i] === '2') {
        ++layerIndex
    }
    const color = layers[layerIndex][i]
    finalImage += color === '1' ? '*' : ' '
    if ((i + 1) % WIDTH === 0) {
        finalImage += '\n'
    }
}

console.log(finalImage)
