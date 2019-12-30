const getIntersections = require('./get-intersections')

const minFunction = (min, intersection) => Math.min(min, intersection.distance)

const minDistance = getIntersections().reduce(minFunction, 999999)
console.log(minDistance)
