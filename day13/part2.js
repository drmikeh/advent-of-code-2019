const runProgram = require('../day09/run-program')
const makeComputer = require('../day09/make-computer')

const computer = makeComputer('./data.txt')
computer.program[0] = 2 // fake insert 2 quarters = free play

const EMPTY = 0
const WALL = 1
const BLOCK = 2
const PADDLE = 3
const BALL = 4

const TILES = ['EMPTY', 'WALL', 'BLOCK', 'PADDLE', 'BALL']

function play() {
    let numberOfBlocks = 0
    let blocksCache = {}
    let gameOver = false
    let joystick = 0
    let ball = { x: 0, y: 0 }
    let paddle = { x: 0, y: 0 }
    let isGameStarted = false // the game will start after we find the first block
    let allBlocksDestroyed = false
    let score = null

    let minX = 999
    let minY = 999
    let maxX = 0
    let maxY = 0

    while (!gameOver) {
        const x = runProgram(computer, joystick, true)
        const y = runProgram(computer, joystick, true)
        const tile = runProgram(computer, joystick, true)

        minX = Math.min(x, minX)
        maxX = Math.max(x, maxX)
        minY = Math.min(y, minY)
        maxY = Math.max(y, maxY)

        if (x === -1 && y === 0) {
            score = tile
            gameOver = allBlocksDestroyed
        } else {
            const hash = `${x},${y}`
            if (tile !== BLOCK) {
                if (blocksCache[hash]) {
                    numberOfBlocks--
                    blocksCache[hash] = false
                }
            }
            switch (tile) {
                case BLOCK:
                    isGameStarted = true
                    if (!blocksCache[hash]) {
                        numberOfBlocks++
                        blocksCache[hash] = true
                    }
                    break
                case PADDLE:
                    paddle = { x, y }
                    break
                case BALL:
                    ball = { x, y }
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

        if (isGameStarted && numberOfBlocks === 0) {
            allBlocksDestroyed = true
        }

        console.log({ x, y, tile: TILES[tile], numberOfBlocks })
    }

    console.log({ minX, maxX, minY, maxY, score }) // 14538
}

play()
