// Greatest common divisor of 2 integers
const gcd2 = (a, b) => (b ? gcd2(b, a % b) : b === 0 ? a : NaN)

// Greatest common divisor of a list of integers
function gcd(array) {
    let n = 0
    for (let i = 0; i < array.length; i++) n = gcd2(array[i], n)
    return n
}

// Least common multiple of 2 integers
const lcm2 = (a, b) => (a * b) / gcd2(a, b)

// Least common multiple of a list of integers
function lcm(array) {
    let n = 1
    for (let i = 0; i < array.length; i++) n = lcm2(array[i], n)
    return n
}

const array = [6, 18, 42]
console.log(gcd(array))
console.log(lcm(array))
