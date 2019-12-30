const [start, end] = require('../file-reader').readFile('data.txt', '-', Number)

function exactly2Match(password, idx) {
    return (
        password[idx] === password[idx - 1] &&
        password[idx] !== password[idx + 1] &&
        password[idx] !== password[idx - 2]
    )
}

function checkPassword(password) {
    let result = false
    for (var i = 1; i < 6; i++) {
        if (exactly2Match(password, i)) {
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
