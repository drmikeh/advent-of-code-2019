const MAX_X = 36
const MAX_Y = 24

function buildGameBoard() {
    for (let y = 0; y <= MAX_Y; y++) {
        const line = document.createElement('tr')
        for (let x = 0; x <= MAX_X; x++) {
            const el = document.createElement('td')
            // const colorIndex = (x + y) % TILES.length
            // const color = TILES[colorIndex].toLowerCase()
            // el.className = color
            // if (x === 10 && y === 10) el.className = 'ball'
            line.appendChild(el)
        }
        document.getElementById('game').appendChild(line)
    }
}

buildGameBoard()
setTimeout(play, 1000)
