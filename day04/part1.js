const [start, end] = require('../file-reader').readFile('data.txt', '-', Number)

function checkPassword(password) {
    let result = false
    for (var i = 1; i < 6; i++) {
        if (password[i] === password[i - 1]) {
            result = true
        }
        if (password[i - 1] > password[i]) {
            return false
        }
    }
    return result
}

let total = 0
for (let password = start; password <= end; password++) {
    total += checkPassword(password.toString())
}
console.log(total)
