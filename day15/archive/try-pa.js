const prompt = require('prompt-sync')()
const n = Number(prompt('How many more times? '))

for (let i = 0; i < n; i++) {
    console.log('Hi')
}
