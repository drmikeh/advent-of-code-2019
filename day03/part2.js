const getIntersections = require('./common')

// find the minimum distance from origin to an intersection
const minFunction = (min, intersection) => Math.min(min, intersection.distance)

const minDistance = getIntersections().reduce(minFunction, 999999)
console.log(minDistance)
