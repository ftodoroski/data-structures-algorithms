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