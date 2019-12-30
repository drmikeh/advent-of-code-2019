/**
 * 3.
 * 4. remove all astroids that have same angle but are further away than the closest astroid
 * 5. remove all remaining astroids, counting as we go. If we reach count === 200, print that astroid
 * 6. jump to step 4 with astroids = original astroids - home - removedAstroids
 **/

const { getAstroids, countVisible, isVisible } = require('./common')

let astroids = getAstroids()
const results = astroids.map(home => ({
    ...home,
    count: countVisible(astroids, home)
}))
results.sort((a, b) => b.count - a.count)
const home = results[0]

// remove the home astroid from the list of astroids
astroids = astroids.filter(rock => rock.x !== home.x || rock.y !== home.y)

// for all astroids, calculate the distance and the angle from the home
astroids = astroids.map(rock => {
    let angle =
        Math.atan2(rock.y - home.y, rock.x - home.x) * (180 / Math.PI) + 90
    if (angle < 0) {
        angle += 360
    }
    return { ...rock, angle }
})

// sort these by angle (0 to 360 degrees)
astroids.sort((rock1, rock2) => {
    return rock1.angle - rock2.angle
})

// remove all blocked astroids
astroids = astroids.filter(rock => isVisible(astroids, home, rock))

console.log('home:', home)
const rock200 = astroids[199]
console.log('answer: ', rock200.x * 100 + rock200.y) // 1623
