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





// ******************************************************************************************************************************************************************
// Sliding Window
// maxSubarraySum
// 7. Given an array of integers and a number, write a function called maxSubarraySum, which finds the 
//    maximum sum of a subarray with the length of the number passed to the function 

//    Note that the subarray must consist of consecutive elements from the original array. In the first 
//    example below, [11, 200, 300] is a subarray of the original array, but [100, 300] is not 

function maxSubarraySum(array, n) {
    if (array.length < n) return null

    let maxSum = 0
    for (let i = 0; i < n; i++) maxSum += array[i]

    let p1 = 0
    let p2 = n
    let tempSum = maxSum

    while (p2 < array.length) {
        tempSum = tempSum - array[p1] + array[p2]
        if (tempSum > maxSum) {
            maxSum = tempSum
        }

        p1 += 1
        p2 += 1
    }

    return maxSum
}

console.log(maxSubarraySum([100, 200, 300, 400], 2))                // 700
console.log(maxSubarraySum([1, 4, 2, 10, 23, 3, 1, 0, 20], 4))      // 39
console.log(maxSubarraySum([-3, 4, 0, -2, 6, -1], 2))               // 5 
console.log(maxSubarraySum([3, -2, 7, -4, 1, -1, 4, -2, 1], 2))     // 5
console.log(maxSubarraySum([2, 3], 3))                              // null

// Tip for sliding window:
// You were thinking how to sum all those n elements without making a nested array
// Answer: well you do it by first summing them into a maxSum with its own loop and then doing a tempSum in the main loop
// Key: The sliding window needs to go to the end(so it needs to transeverse through the whole array) this is the key

// Certain algorithm patterns have certain ways of doing them 
// For multiple pointer the array needs to be sorted
// For sliding window the array needs to be transeversed through the end

// I see that often Math.max or Math.min is being used for the sliding window





// ******************************************************************************************************************************************************************
// Sliding Window
// maxSubarraySum
// 8. Write a function called maxSubarraySum which accepts an array
//    of integers and a number called n. The function should calculate 
//    the maximum sum of n consecutive elements in the array


function maxSubarraySum(arr, num) {
    let maxSum = 0;
    let tempSum = 0;
    if (arr.length === 0) return null;
    for (let i = 0; i < num; i++) {
        maxSum += arr[i];
    }
    tempSum = maxSum;
    for (let i = num; i < arr.length; i++) {
        tempSum = tempSum - arr[i - num] + arr[i];
        maxSum = Math.max(maxSum, tempSum);
    }
    return maxSum;
}


console.log(maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2)) // 10
console.log(maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4)) // 17
console.log(maxSubarraySum([4, 2, 1, 6], 1)) // 6
console.log(maxSubarraySum([4, 2, 1, 6, 2], 4)) // 13
console.log(maxSubarraySum([], null)) // null

// Time Complexity
//      - O(n)

// Tip
//      - You keep sliding like decreasing in the back and increasing at the front the subarray





// ******************************************************************************************************************************************************************
// Divide and Conquer
// search
// 9. Given a sorted array of integers, write a function called search, that
//    accepts a value and an array. Return the index where the value passed to the function 
//    is located. If the value is not found, return -1

function search(array, value) {
    let min = 0 
    let max = array.length - 1

    while (min <= max) {
        let middle = Math.floor((min + max) / 2)
        let currentElement = array[middle]

        if (array[middle] < value) {
            min = middle + 1
        } else if (array[middle] > value) {
            max = middle - 1
        } else {
            return middle
        }
    }

    return -1
}

console.log(search([1, 3, 5, 8, 12, 13, 15, 16, 18, 20, 22, 30, 40, 50, 55, 67], 13))





// ******************************************************************************************************************************************************************
// Recursion 
// 10. This is just a basic way to help you understand recursion by iterating 

function iterate(months) {
    if (months.length === 0) return;

    console.log(months[0])
    return iterate(months.slice(1))
}


let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
iterate(months)





// ******************************************************************************************************************************************************************
// Recursion 
// nestedEvenSum
// 11. Write a recursive function called nestedEvenSum. Return the sum of all even 
//     numbers in an object which may contain nested objects  


function nestedEvenSum(obj) {
    let answer = 0
    if (Object.keys(obj).length === 0) return answer
    for (const key in obj) {
        if (typeof obj[key] === 'number' && obj[key] % 2 === 0) {
            answer += obj[key]
        } else if (typeof obj[key] === 'object') {
            answer += nestedEvenSum(obj[key])
        }
    }
    return answer
}

var obj1 = {
    outer: 2,
    obj: {
        inner: 2,
        otherObj: {
            superInner: 2,
            notANumber: true,
            alsoNotANumber: "yup"
        }
    }
}

var obj2 = {
    a: 2,
    b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
    c: { c: { c: 2 }, cc: 'ball', ccc: 5 },
    d: 1,
    e: { e: { e: 2 }, ee: 'car' }
};

console.log(nestedEvenSum(obj1)); // 6
console.log(nestedEvenSum(obj2)); // 10