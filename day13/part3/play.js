const EMPTY = 0
const WALL = 1
const BLOCK = 2
const PADDLE = 3
const BALL = 4

const TILES = ['EMPTY', 'WALL', 'BLOCK', 'PADDLE', 'BALL']

function getCell(x, y) {
    const table = document.getElementById('game')
    const row = table.getElementsByTagName('tr')[y]
    const cell = row.getElementsByTagName('td')[x]
    return cell
}

let delay = 0
let speeds = [0, 30]
let isSlow = false

function setOnClick(id, fn) {
    document.getElementById(id).onclick = fn
}

function play() {
    console.log('play')
    const computer = makeComputer()
    computer.program[0] = 2 // fake insert 2 quarters = free play

    let numBlocksRemaining = 0
    let numBlocksDestroyed = 0
    let blocksCache = {}
    let gameOver = false
    let joystick = 0
    let ball = { x: 0, y: 0 }
    let paddle = { x: 0, y: 0 }
    let isGameStarted = false // the game will start after we find the first block
    let allBlocksDestroyed = false
    let score = null
    let gamePaused = false

    function setStatus() {
        const status = gamePaused
            ? 'Paused'
            : 'Playing ' +
              (isSlow ? 'slowly' : 'quickly') +
              ' with debug level ' +
              getDebugLevel()
        document.getElementById('status').innerHTML = status
    }

    function toggleSpeed() {
        if (isSlow) {
            delay = speeds[0]
        } else {
            delay = speeds[1]
        }
        isSlow = !isSlow
        setStatus(gamePaused, isSlow)
    }
    setOnClick('speed', toggleSpeed)

    function togglePause() {
        gamePaused = !gamePaused
        setStatus(gamePaused, isSlow)
        if (!gamePaused) {
            step()
        }
    }
    setOnClick('pause', togglePause)

    function step() {
        const x = runProgram(computer, joystick, true)
        const y = runProgram(computer, joystick, true)
        const tile = runProgram(computer, joystick, true)

        setStatus() // not ideal but I needed to support updating the status when the debug level changes

        if (x === -1 && y === 0) {
            score = tile
            document.getElementById('score').innerHTML = score
            gameOver = allBlocksDestroyed
        } else {
            const hash = `${x},${y}`
            if (tile !== BLOCK) {
                if (blocksCache[hash]) {
                    numBlocksRemaining--
                    document.getElementById(
                        'blocks-remaining'
                    ).innerHTML = numBlocksRemaining
                    numBlocksDestroyed++
                    document.getElementById(
                        'blocks-destroyed'
                    ).innerHTML = numBlocksDestroyed
                    blocksCache[hash] = false
                }
            }
            switch (tile) {
                case EMPTY:
                    getCell(x, y).className = 'empty'
                    break
                case WALL:
                    getCell(x, y).className = 'wall'
                    break
                case BLOCK:
                    isGameStarted = true
                    delay = speeds[0]
                    if (!blocksCache[hash]) {
                        numBlocksRemaining++
                        document.getElementById(
                            'blocks-remaining'
                        ).innerHTML = numBlocksRemaining
                        blocksCache[hash] = true
                    }
                    const cell = getCell(x, y)
                    cell.className = 'block'
                    const colors = [
                        'rgb(255, 128, 128)',
                        'rgb(128, 255, 128)',
                        'rgb(128, 128, 255)'
                    ]
                    // const blue = Math.floor((y / MAX_Y) * 128) + 128
                    cell.style.backgroundColor = colors[y % colors.length]
                    break
                case PADDLE:
                    getCell(paddle.x, paddle.y).className = 'empty'
                    paddle = { x, y }
                    getCell(x, y).className = 'paddle'
                    break
                case BALL:
                    getCell(ball.x, ball.y).className = 'empty'
                    ball = { x, y }
                    getCell(x, y).className = 'ball'
                    break
            }
        }

        if (ball.x > paddle.x) {
            joystick = 1
        } else if (ball.x < paddle.x) {
            joystick = -1
        } else {
            joystick = 0
        }

        if (isGameStarted && numBlocksRemaining === 0) {
            allBlocksDestroyed = true
        }

        debug({ x, y, tile: TILES[tile], numBlocksRemaining })

        if (!gameOver && !gamePaused) {
            setTimeout(step, delay)
        } else if (gameOver) {
            getCell(ball.x, ball.y).className = 'empty' // hide the ball
            setStatus('Game Over')
        }
    }
    step()
    console.log('Score:', score) // 14538
}
