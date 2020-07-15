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





// ******************************************************************************************************************************************************************
// Frequency Counter 
// 4. Given two strings, write a function to determine if the second string is an
//    anagram of the first. An anagram is a word, phrase, or a name formed by rearranging 
//    the letters of another, such as cinema formed from iceman

function validAnagram(string1, string2) {
    if (string1 == string2) return true

    const stringOneFreq = {}
    const stringTwoFreq = {}

    for(let char of string1) {
        stringOneFreq[char] = ++stringOneFreq[char] || 1
    }
    for(let char of string2) {
        stringTwoFreq[char] = ++stringTwoFreq[char] || 1
    }

    for(let key in stringOneFreq) {
        if (!(key in stringTwoFreq)) {
            return false
        }
        if (stringOneFreq[key] !== stringTwoFreq[key]) {
            return false
        }
    }

    return true
}


console.log(validAnagram("", ""))                                 // true
console.log(validAnagram("aaz", "zza"))                           // false
console.log(validAnagram("anagram", "nagaram"))                   // true
console.log(validAnagram("rat", "car"))                           // false
console.log(validAnagram("awesome", "awesom"))                    // false
console.log(validAnagram("qwerty", "qeywrt"))                     // true
console.log(validAnagram("texttwisttime", "timetwisttext"))       // true

// This is a O(n) and its better then O(n^2)
// I think time complexity over O(n^2) is bad everythink below is good
// Its ok if we have multiple for loops on their one
// But we get into trouble when we do nested loops 
// 4n cancels out to just n - The trend is still going to be linear 

// When would you use the frequency counter
// Anytime you have multiple pieces of data that you need to compare them
// if they consist of the same individual pieces of data





// ******************************************************************************************************************************************************************
// Multiple Pointers  
// 5. Write a function called sumZero which accepts a sorted array of integers.
//    The function should find the first pair where the sum is 0. Return an array 
//    that includes both values the sum to zero or undefined if a pair does not exist

function sumZero(array) {
    let left = 0
    let right = array.length - 1

    while (left < right) {
        let sum = array[left] + array[right]
        if (sum === 0) {
            return [array[left], array[right]]
        } else if (sum > 0) {
            right--
        } else {
            left++
        }
    }

    return undefined
}


console.log(sumZero([-3, -2, -1, 0, 1, 2, 3])) // [-3, 3]
console.log(sumZero([-2, 0, 1, 3])) // undefined
console.log(sumZero([1, 2, 3])) // undefined

// Brute force:
//       - O(n^2) Time Complexity
//       - O(1) Space Complexity

// Efficient
//       - O(n) Time Complexity
//       - O(1) Space Complexity


// Keys To Solve: Sorted array matters for the multiple pointer - sort the items if not sorted





// ******************************************************************************************************************************************************************
// Multiple Pointers
// countUniqueValues
// 6. Implement a function called countUniqueValues, which accepts a sorted array, and counts 
//    the unique values in the array. There can be negative numbers in the array, but it will 
//    always be sorted. 

// Without a Multiple pointer
// function countUniqueValues(array) {
//     let uniqValuesObj = {}
//     let uniqValues = 0 

//     for(let i = 0; i < array.length; i++) {
//         let value = array[i]

//         if (!(uniqValuesObj[value])) {
//             uniqValuesObj[value] = 1
//             uniqValues += 1
//         }
//     }

//     return uniqValues
// }

function countUniqueValues(array) {
    if (array.length === 0) return 0

    let currentIndex = 0
    let scout = 1

    while (scout < array.length) {
        if (array[currentIndex] < array[scout]) {
            array[currentIndex + 1] = array[scout]
            currentIndex += 1
            scout += 1
        } else {
            scout += 1
        }
    }

    return currentIndex + 1
}



console.log(countUniqueValues([1, 1, 1, 1, 1, 2])) // 2
console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])) // 7
console.log(countUniqueValues([])) // 0
console.log(countUniqueValues([-2, -1, -1, 0, 1])) // 4

// Tips
// -  Array is already sorted
// -  Sometimes the problem gives certain keywords that help you out