/**
 * Permutate the elements in the specified array by swapping them in-place and
 * calling the specified callback function on the array for each permutation.
 *
 * NOTE: when permutation succeeds, the array should be in the original state on exit!
 *
 * @param {Array} array - the array of values that need permutating
 * @param {function} callback - will be called for each permutation
 * @returns the number of permutations, returns 0 for an undefined, null, or empty array
 */
function permutate(array, callback) {
    // Do the actual permuation work on array, starting at index
    function p(array, index, callback) {
        // Swap elements i1 and i2 in array a
        function swap(a, i1, i2) {
            let t = a[i1]
            a[i1] = a[i2]
            a[i2] = t
        }
        if (index === array.length - 1) {
            callback(array)
            return 1
        } else {
            let count = p(array, index + 1, callback)
            for (let i = index + 1; i < array.length; i++) {
                swap(array, i, index)
                count += p(array, index + 1, callback)
                swap(array, i, index)
            }
            return count
        }
    }

    if (!array || array.length == 0) {
        return 0
    }
    return p(array, 0, callback)
}

// sample usage: prints each permutation and the total count of permutations
// console.log(permutate([1, 2, 3, 4], console.log))

module.exports = permutate
