// ******************************************************************************************************************************************************************
// Frequency Counter 
// 1. Suppose we want to write a function that calculates the sum of all numbers 
//    from 1 up (and including) some number n 

function sumOfAllNumbers(n) {
    total = 0

    for(let i = 0; i <= n; i++) {
        total += i
    }

    return total
}

Shorter
function sumOfAllNumbers(n) {
   return n * (n + 1) / 2
}


console.log(sumOfAllNumbers(1))
console.log(sumOfAllNumbers(2))
console.log(sumOfAllNumbers(5))

// This would measure the time it took to execute this function
// In nodeJS the performance.now() is not available
// let t1 = performance.now()
// sumOfAllNumbers(10)
// let t2 = performance.now()

// console.log(`Time Elapesed: ${(t2 - t1) / 1000} seconds`)





// ******************************************************************************************************************************************************************
// Frequency Counter 
// 2. Write a function which takes in a string and returns counts of each character in the string
function charCount(string) {
    const sanitizedString = string.toLowerCase().split(" ").join("")
    const count = {}

    for(let char of sanitizedString) {
        count[char] = ++count[char] || 1
    }

    return count
}

console.log(charCount("helloworld"))
console.log(charCount("hhhhh"))
console.log(charCount("Hello You beautiful world 1234567"))

// ++count[char] || count[char]++ https://stackoverflow.com/questions/17241877/difference-between-and-1-in-javascript





// ******************************************************************************************************************************************************************
// Frequency Counter 
// 3. Write a function called same, which accepts two arrays. The function should return true
//    if every value in the array has its corresponding value squared in the second array.
//    The frequency of values must be the same.

function same(arr1, arr2) {
    if (arr1.length !== arr2.length) return false

    let freq1 = {}
    let freq2 = {}

    for(let val of arr1) {
        freq1[val] = (freq1[val] || 0) + 1
    }
    for(let val of arr2) {
        freq2[val] = (freq2[val] || 0) + 1
    }

    for(let key in freq1) {
        if (!(key ** 2 in freq2)) {
            return false
        }
        if (freq2[key ** 2] != freq1[key]) {
            return false
        }
    }

    return true
}

console.log(same([1, 2, 3], [4, 1, 9]) ) // true
console.log(same([1, 2, 3], [1, 1, 9]))  // false
console.log(same([1, 2, 1], [4, 4, 1]))  // false