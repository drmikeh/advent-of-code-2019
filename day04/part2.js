const [start, end] = require('../file-reader').readFile('data.txt', '-', Number)

/*
function getConsecutiveLength(password, index) {
    let length = 0
    for (let i = index; i >= 0; i--) {
        length += password[index] === password[i] ? 1 : 0
    }
    console.log(password, index, password[index], length)
    return length
}
*/

function checkPassword(password) {
    let result = false
    for (var i = 1; i < 6; i++) {
        if (
            password[i] === password[i - 1] &&
            password[i] !== password[i + 1] &&
            password[i] !== password[i - 2]
        ) {
            // console.log('true:', i)
            result = true
        }
        if (password[i - 1] > password[i]) {
            return false
        }
    }
    // if (result) console.log('match:', password)
    return result
}

let total = 0
for (let password = start; password <= end; password++) {
    total += checkPassword(password.toString())
}
console.log(total)
