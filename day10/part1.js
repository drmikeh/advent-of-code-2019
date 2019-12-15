const { getAstroids, countVisible } = require('./common')

const astroids = getAstroids()
const results = astroids.map(home => ({
    ...home,
    count: countVisible(astroids, home)
}))
results.sort((a, b) => b.count - a.count)
console.log(results[0].count) // 326
