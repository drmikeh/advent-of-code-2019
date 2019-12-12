const image = require('../file-reader').readFile('./data.txt', '\n', String)[0]

/*
function getLayers(width, height) {
    const layers = []
    for (let index = 0; index < image.length; index += width * height) {
        layers.push(image.slice(index, index + width * height))
    }
    return layers
}
*/

const getLayers = (width, height) =>
    image.match(new RegExp(`.{${width * height}}`, 'g'))

module.exports = getLayers
