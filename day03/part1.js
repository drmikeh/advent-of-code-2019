const getIntersections = require('./common')

// find the minimum distance from origin to an intersection
const minFunction = (min, intersection) =>
    Math.min(min, Math.abs(intersection.x) + Math.abs(intersection.y))

const minDistance = getIntersections().reduce(minFunction, 999999)
console.log(minDistance)
