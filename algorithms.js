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





// ******************************************************************************************************************************************************************
// Recursion 
// stringifyNumbers
// 12. Write a function called stringifyNumbers which takes in an object and finds all of the values 
//     which are numbers and converts them to strings. 

function stringifyNumbers(obj) {
    let stringified = {}

    for (const key in obj) {
        if (typeof obj[key] === "number")  {
            stringified[key] = obj[key].toString()
        } else if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
            stringified[key] = stringifyNumbers(obj[key])
        } else {
            stringified[key] = obj[key]
        }
    }

    return stringified
}


let obj = {
    num: 1,
    test: [],
    data: {
        val: 4,
        info: {
            isRight: true,
            random: 66
        }
    }
}


console.log(stringifyNumbers(obj))





// ******************************************************************************************************************************************************************
// Recursion 
// collectString
// 13. Write a function called collectString which accepts an object and returns an array of all the 
//     values in the object that have a typeof string

function collectStrings(obj) {
    let collectedStrings = []
    if (Object.keys(obj).length === 0) return collectedStrings

    for (const key in obj) {
        if (typeof obj[key] === "string") {
            collectedStrings.push(obj[key])
        } else if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
            return collectedStrings.concat(collectStrings(obj[key]))
        }
    }

    return collectedStrings
}

const obj = {
    stuff: "foo",
    data: {
        val: {
            thing: {
                info: "bar",
                moreInfo: {
                    evenMoreInfo: {
                        weMadeIt: "baz"
                    }
                }
            }
        }
    }
}

console.log(collectStrings(obj)) // ["foo", "bar", "baz"])





// ******************************************************************************************************************************************************************
// Binary Search 
// 14. Write a function that accepts a sorted array and a value. Return the index of the target if found else return -1
// Time Complexity: O(log n)
// Space Complexity: O(1)


function binarySearch(array, target){
  let left = 0
  let right = array.length - 1

  while (left <= right) {
      const middle =  (left + right) / 2

      if (target > array[middle]) {
          left = middle + 1
      } else if (target < array[middle]) {
            right = middle - 1
      } else {
          return middle
      }    
  }

  return -1
}

console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 12))






// ******************************************************************************************************************************************************************
// Bubble Sort 
// 15. Implement bubble sort 
// Time Complexity: O(n^2)
// ascending version

function bubbleSort(array) {
    let iteration = true
    while(iteration) {
        iteration = false
        for(let i = 0; i < array.length - 1; i++) {
            let current = array[i]
            let next = array[i + 1]
            console.log(array)
            if (current > next) {
                array[i] = next
                array[i + 1] = current
                iteration = true
            }
        }

        if(iteration) break
    }

    return array
}

console.log(bubbleSort([29, 10, 14, 30, 37, 14, 18]))
console.log(bubbleSort([37, 45, 29, 8]))
console.log(bubbleSort([8, 1, 2, 3, 4, 5, 6, 7]))





// ******************************************************************************************************************************************************************
// Selection Sort
// 16. Implement selection sort
// Time Complexity: O(n^2)

function selectionSort(array) {
    for (let i = 0; i < array.length; i++) {
        let lowest = i
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[lowest]) {
                lowest = j
            }
        }

        if (i !== lowest) {
            let temp = array[i]
            array[i] = array[lowest]
            array[lowest] = temp
        }
    }

    return array
}


console.log(selectionSort([5, 3, 4, 1, 2]))
console.log(selectionSort([10, 4, 5, 1, 8, 9]))
console.log(selectionSort([0, 2, 34, 22, 10, 19, 17]))





// ******************************************************************************************************************************************************************
// Insertion Sort
// 17. Implement selection sort
// Time Complexity: O(n^2)

function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {

        for (let j = i; j > 0; j--) {
            if (array[j] < array[j - 1]) {
                const temp = array[j]
                array[j] = array[j - 1]
                array[j - 1] = temp
            } else {
                break
            }   
        }
    }

    return array
}

console.log(insertionSort([2, 1, 9, 76, 4]))


// starting with the second element 
// check if its smaller then the first





// ******************************************************************************************************************************************************************
// Merge Sort
// 18. Implement merge sort

// Splitting of arrays
function mergeSort(array) {
    if (array.length <= 1) return array

    let middle = Math.floor((array.length) / 2)
    let left = mergeSort(array.slice(0, middle))
    let right = mergeSort(array.slice(middle))

    return mergeTwoSortedArrays(left, right)
}

// // Merge Two Sorted Arrays - First Important Step for Merge sort
function mergeTwoSortedArrays(arr1, arr2) {
    let sorted = []

    let i = 0
    let j = 0 
    while(i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            sorted.push(arr1[i])
            i++
        } else {
            sorted.push(arr2[j])
            j++
        }
    }

    while (i < arr1.length) {
        sorted.push(arr1[i])
        i++
    }
    while (j < arr2.length) {
        sorted.push(arr2[j])
        j++
    }

    return sorted
}

console.log(mergeSort([90, 5, 32, 11, 1, 35, 4000, 65, 11]));
console.log(mergeTwoSortedArrays([1, 10, 50], [2, 14, 99, 100]))
console.log(mergeTwoSortedArrays([1, 100, 350], [12, 114, 299, 1100]))





// ******************************************************************************************************************************************************************
// Quick Sort
// 19. Implement quick sort

// https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/11072078#questions/10592084
// Pivot Helper 
//     - Needs to return the index of the pivot point
function pivot(arr, start = 0, end = arr.length + 1) {
    function swap(array, i, j) {
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    let pivot = arr[start];
    let swapIdx = start;

    for (let i = start + 1; i < arr.length; i++) {
        if (pivot > arr[i]) {
            swapIdx++;
            swap(arr, swapIdx, i);
        }
    }
    swap(arr, start, swapIdx);
    return swapIdx;
}

console.log(pivot([5, 1, 6, 8, 2, 7, 3, 4]))

// // Quick Sort   
function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        let pivotIndex = pivot(arr, left, right) //3
        //left
        quickSort(arr, left, pivotIndex - 1);
        //right
        quickSort(arr, pivotIndex + 1, right);
    }
    return arr;
}

console.log(quickSort([100, -3, 2, 4, 6, 9, 1, 2, 5, 3, 23]))





// ******************************************************************************************************************************************************************
// Radix Sort
// 20. Implement radix sort

// Get the place of a number
function getDigit(num, place) {
    let reverseNum = num.toString().split("").reverse().join("")
    if (place >= reverseNum.length) return 0

    return parseInt(reverseNum[place])
}

function digitCount(num) {
    return num.toString().length
}

function mostDigits(nums) {
    let max = 0
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i]
        max = Math.max(max, digitCount(num))
    }

    return max
}

function radix(nums) {
    let longest = mostDigits(nums)

    for (let i = 0; i < longest; i++) {
        let bucket = Array.from({length: 10}, () => [])

        for (let j = 0; j < nums.length; j++) {
            const num = nums[j];
            const digit = getDigit(num, i)

            bucket[digit].push(num)
        }

        nums = [].concat(...bucket)
    }

    return nums
}

console.log(getDigit(12345, 0)) // 5
console.log(getDigit(12345, 1)) // 4
console.log(getDigit(12345, 3)) // 4
console.log(digitCount(0))
console.log(mostDigits([1, 22, 33, 444, 532233]))
console.log(radix([23,345,5467,12,2345,9852]))





// ******************************************************************************************************************************************************************
// Singly Linked List
// 21. Implement a Singly Linked List

class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }

    push(value) {
      let newNode = new Node(value)
      if (!(this.head)) {
        this.head = newNode
        this.tail = this.head
      } else {
          this.tail.next = newNode
          this.tail = newNode
      }
      this.length += 1
      return this
    }

    pop() {
        if (!(this.length)) return undefined 

        let node = this.head
        let newTail = node
        while (node.next) {
            newTail = node
            node = node.next
        }
        this.tail = newTail
        this.tail.next = null
        this.length -= 1
        if (this.length === 0) {
            this.head = null
            this.tail = null
        }

        return node
    }

    shift() {
        if (!(this.length)) return undefined 

        let newHead = this.head.next
        let prevHead = this.head
        this.head = newHead
        prevHead.next = null
        this.length -= 1
        if (this.length === 0) {
            this.tail = null
        }
        return prevHead
    }

    unshift(value) {
        let node = new Node(value)
        if (!this.head) {
            this.head = node 
            this.tail = node
            return this
        }

        let prevHead = this.head
        this.head = node
        this.head.next = prevHead
        this.length += 1
        return this
    }
}

let s1 = new SinglyLinkedList()
s1.push(1)
s1.push(2)
s1.push(3)
s1.push(4)
s1.reverse()
console.log(s1.print());





// ******************************************************************************************************************************************************************
// Doubly Linked List
// 20. Implement a Doubly Linked List

class Node {
    constructor(value) {
        this.value = value
        this.next = null
        this.prev = null
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }

    push(value) {
        let newNode = new Node(value)
        if (this.head === null) {
            this.head = newNode
            this.tail = newNode
        } else {
            this.tail.next = newNode
            newNode.prev = this.tail
            this.tail = newNode
        }

        this.length++
        return this
    }

    pop() {
        if (this.head === null) return undefined
        let poppedNode = this.tail
        if (this.length === 1) {
            this.head = null
            this.tail = null
        } else {
            this.tail = poppedNode.prev
            this.tail.next = null
            poppedNode.prev = null
        }

        this.length -= 1
        return poppedNode
    }

    shift() {
        if (this.length === 0) return undefined
        let shiftedNode = this.head

        if (this.length === 1) {
            this.head = null
            this.tail = null
        } else {
            this.head = shiftedNode.next
            shiftedNode.next = null
            this.head.prev = null
        }

        this.length -= 1
        return shiftedNode
    }

    unshift(value) {
        let newNode = new Node(value)

        if (this.length === 0) {
            this.head = newNode
            this.tail = newNode
        } else {
            this.head.prev = newNode
            newNode.next = this.head
            this.head = newNode
        }

        this.length++
        return this
    }

    get(index) {
        if (index < 0 || index >= this.length) return null

        let halfLength = Math.floor(this.length / 2)
        if (index <= halfLength) {

            let counter = 0
            let current = this.head
            while (current) {
                if (counter === index) {
                    return current
                }

                counter += 1
                current = current.next
            }
        } else {

            let counter = this.length - 1
            let current = this.tail
            while (counter) {
                if (counter === index) {
                    return current
                }

                counter -= 1
                current = current.prev
            }

        }
    }

    set(index, value) {
        let node = this.get(index)

        if (node) {
            node.value = value
            return true
        } else {
            return false
        }
    }

    insert(index, value) {
        if (index < 0 || index >= this.length) return false
        if (index === 0) return !!this.unshift(value)
        if (index === this.length - 1) return !!this.push(value)
        let newNode = new Node(value)

        let beforeNodes = this.get(index - 1)
        let afterNodes = this.get(index)
        beforeNodes.next = newNode
        newNode.prev = beforeNodes
        newNode.next = afterNodes
        afterNodes.prev = newNode
        this.length++
        return true
    }

    remove(index) {
        if (index < 0 || index >= this.length) return undefined
        if (this.length === 0) return undefined
        if (index === 0) return this.shift()
        if (index === this.length - 1) return this.pop()

        let removedNode = this.get(index)
        removedNode.prev.next = removedNode.next
        removedNode.next.prev = removedNode.prev
        removedNode.next = null
        removedNode.prev = null
        this.length--
        return removedNode
    }

    reverse() {
        if (!(this.head)) return undefined

        let node = this.head
        this.head = this.tail
        this.tail = node

        let counter = 0
        let prev = null
        let next

        while (counter < this.length) {
            next = node.next
            node.prev = next
            node.next = prev
            prev = node
            node = next
            counter++
        }

        return this
    }

    reverse() {
        if (!(this.head)) return undefined

        let node = this.head
        this.head = this.tail
        this.tail = node

        let counter = 0
        let prev = null
        let next

        while (counter < this.length) {
            next = node.next
            node.prev = next
            node.next = prev
            prev = node
            node = next
            counter++
        }

        return this
    }

    print() {
        let nodeValues = []

        let current = this.head
        while (current) {
            nodeValues.push(current.value)
            current = current.next
        }

        return nodeValues
    }
}

let dll = new DoublyLinkedList()
dll.push(1)
dll.push(4)
dll.push(5)
dll.push(7)
dll.push(9)
dll.push(17)
dll.push(21)
dll.push(29)
dll.push(30)
dll.push(32)
dll.push(33)
dll.push(39)
dll.push(41)
dll.reverse()






// ******************************************************************************************************************************************************************
// Stack Singly Linked List
// 21. Implement a Stack Linked List

class Node {
    constructor(value) {
        this.value = value
        this.next = null
        this.prev = null
    }
}

class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    push(value) {
        var newNode = new Node(value);
        if (!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else {
            var temp = this.first;
            this.first = newNode;
            this.first.next = temp;
        }
        return ++this.size;
    }

    pop() {
        if (!this.first) return null;
        var temp = this.first;
        if (this.first === this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return temp.value;
    }

    peek() {
        if (!(this.size)) return null
        return this.first
    }
}

let stack = new Stack()
console.log(stack)






// ******************************************************************************************************************************************************************
// Queue Singly Linked List
// 22. Implement a Queue Singly Linked List

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    enqueue(val) {
        var newNode = new Node(val);
        if (!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }
        return ++this.size;
    }

    dequeue() {
        if (!this.first) return null;

        var temp = this.first;
        if (this.first === this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return temp.value;
    }
}






// ******************************************************************************************************************************************************************
// check if a sequence of different types of brackets (or parentheses) is correctly balanced
//“{()[{({})[]()}]}([])”

function isBalanced(parentheses) {
    const sequence = []

    for (const paren of parentheses) {        if (sequence[sequence.length - 1] === "{" && paren === "}") {
            sequence.pop()
        } else if (sequence[sequence.length - 1] === "[" && paren === "]") {
            sequence.pop()
        } else if (sequence[sequence.length - 1] === "(" && paren === ")") {
            sequence.pop()
        } else {
            sequence.push(paren)
        }
    }

    return !sequence.length
}

console.log(isBalanced("{()[{({})[]()}]}([])"))
console.log(isBalanced("{{}(}"))

// O(n) Time | O(n) Space





// ******************************************************************************************************************************************************************
// Two Number Sum

// Write a function that takes in a non - empty array of distinct integers and an
// integer representing a target sum. If any two numbers in the input array sum
// up to the target sum, the function should return them in an array, in any
// order.If no two numbers sum up to the target sum, the function should return
// an empty array.


// Note that the target sum has to be obtained by summing two different integers
// in the array; you can't add a single integer to itself in order to obtain the
// target sum.


// You can assume that there will be at most one pair of numbers summing up to
// the target sum.

// Example
// Input
    // array = [3, 5, -4, 8, 11, 1, -1, 6]
    // target 10

// Output 
    // [11, -1]

function twoNumberSum(array, targetSum) {
    const nums = {}

    for (const num of array) {
        const potentialMatch = targetSum - num

        if (potentialMatch in nums) {
            return [potentialMatch, num]
        } else {
            nums[num] = true
        }
    }

    return []
}





// ******************************************************************************************************************************************************************
// Nth Fibonacci

// The Fibonacci sequence is defined as follows: the first number of the sequence
// is 0, the second number is 1, and the nth number is the sum of the (n - 1)th
// and(n - 2)th numbers. Write a function that takes in an integer n  and 
// returns the nth Fibonacci number.


// Important note: the Fibonacci sequence is often defined with its first two numbers 
// as F0 = 0 and F1 = 1. For the purpose of this question, the first Fibonacci number is 
// F0; therefore, getNthFib(1) is equal to F0, getNthFib(2) is equal to F1

// Sample  Input 
// getNthFib(6)

// Sample Output
// 5

function getNthFib(n, memo = { "1": 0, "2": 1 }) {
    if (n in memo) return memo[n]
    else memo[n] = getNthFib(n - 1) + getNthFib(n - 2)

    return memo[n]
}

// Time:    O(n)
// Space:   O(n) 





// ******************************************************************************************************************************************************************
// Find 3 Largest Numbers 

// Write a function that takes in an array of at least three integers and,
// without sorting the input array, returns a sorted array of the three largest
// integers in the input array.

// The function should return duplicate integers if necessary; for example, it
// should return [10, 10, 12]  for an input array of [10, 5, 9, 10, 12]


function findThreeLargestNumbers(array) {
    const threeLargest = [null, null, null]
    for (const num of array) {
        updateLargest(threeLargest, num)
    }

    return threeLargest
}

function updateLargest(threeLargest, num) {
    if (threeLargest[2] === null || num > threeLargest[2]) {
        shiftAndUpdate(threeLargest, num, 2)
    } else if (threeLargest[1] === null || num > threeLargest[1]) {
        shiftAndUpdate(threeLargest, num, 1)
    } else if (threeLargest[0] === null || num > threeLargest[0]) {
        shiftAndUpdate(threeLargest, num, 0)
    }
}

function shiftAndUpdate(array, num, idx) {
    for (let i = 0; i <= idx; i++) {
        if (i === idx) {
            array[i] = num
        } else {
            array[i] = array[i + 1]
        }
    }
}


// O(n) time | O(1) space





// ******************************************************************************************************************************************************************
// --- Directions
// Check to see if two provided strings are anagrams of eachother.
// One string is an anagram of another if it uses the same characters
// in the same quantity. Only consider characters, not spaces
// or punctuation.  Consider capital letters to be the same as lower case
// --- Examples
//   anagrams('rail safety', 'fairy tales') --> True
//   anagrams('RAIL! SAFETY!', 'fairy tales') --> True
//   anagrams('Hi there', 'Bye there') --> False

function getCharFrequency(string) {
    const punctuations = { ".": true, "?": true, "!": true, ",": true }
    let result = {}

    for (const char of string) {
        if (result[char.toLowerCase()] && !(punctuations[char])) {
            result[char.toLowerCase()]++
        } else if (!(punctuations[char])) {
            result[char.toLowerCase()] = 1
        }
    }

    return result
}

function anagrams(stringA, stringB) {
    let freqOneObj = getCharFrequency(stringA)
    let freqTwoObj = getCharFrequency(stringB)

    if (Object.keys(freqOneObj).length !== Object.keys(freqTwoObj).length) return false

    for (const key in freqOneObj) {
        if (freqOneObj[key] !== freqTwoObj[key]) {
            return false
        }
    }

    return true
}


// Time Complexity - O(n)






// ******************************************************************************************************************************************************************
// --- Directions
// Given an array and chunk size, divide the array into many subarrays
// where each subarray is of length size
// --- Examples
// chunk([1, 2, 3, 4], 2)                   --> [[ 1, 2], [3, 4]]
// chunk([1, 2, 3, 4, 5], 2)                --> [[ 1, 2], [3, 4], [5]]
// chunk([1, 2, 3, 4, 5, 6, 7, 8], 3)       --> [[ 1, 2, 3], [4, 5, 6], [7, 8]]
// chunk([1, 2, 3, 4, 5], 4)                --> [[ 1, 2, 3, 4], [5]]
// chunk([1, 2, 3, 4, 5], 10)               --> [[ 1, 2, 3, 4, 5]]

function chunk(array, size) {
    const result = []
    let index = 0

    while (index < array.length) {
        result.push(array.slice(index, index + size))
        index += size
    }

    return result
}






// ******************************************************************************************************************************************************************
// Reverse an Integer
// --- Directions
// Given an integer, return an integer that is the reverse
// ordering of numbers.
// --- Examples
//   reverseInt(15) === 51
//   reverseInt(981) === 189
//   reverseInt(500) === 5
//   reverseInt(-15) === -51
//   reverseInt(-90) === -9

function reverseInt(n) {
    if (n === 0) return 0

    let stringified = n.toString().split("").reverse().join("")
    return parseInt(stringified) * Math.sign(n)
}






// ******************************************************************************************************************************************************************
// Reverse a String
// --- Directions
// Given a string, return a new string with the reversed
// order of characters
// --- Examples
//   reverse('apple') === 'leppa'
//   reverse('hello') === 'olleh'
//   reverse('Greetings!') === '!sgniteerG'

function reverse(str) {
    let reversedStr = ""
    for (let i = str.length - 1; i >= 0; i--) {
        const char = str[i]
        reversedStr += char
    }

    return reversedStr
}






// ******************************************************************************************************************************************************************
// Branch Sums 

// Write a function that takes in a Binary Tree and returns a list of its branch
// sums ordered from leftmost branch sum to rightmost branch sum.

// A branch sum is the sum of all values in a Binary Tree branch.A Binary Tree
// branch is a path of nodes in a tree that starts at the root node and ends at
// any leaf node.

// Each BinaryTree node has an integer value, a left child node and a right child node.
// Children node can either be BinaryTree nodes themselves or Node / Null

class BinaryTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

const branchSums = root => {
    const sums = []
    calBranchSums(root, 0, sums)
    return sums
}

const calBranchSums = (node, sum, sums) => {
    if (!node) return

    const runningSum = sum + node.value
    if (!node.left && !node.right) {
        sums.push(runningSum)
        return
    }

    calBranchSums(node.left, runningSum, sums)
    calBranchSums(node.right, runningSum, sums)
}






// ******************************************************************************************************************************************************************
// FizzBuzz
// 1. Write a program that prints the numbers from 1 to 100. But for mutliples of three print "Fizz"
//    instead of the number and for the mutliples of five print "Buzz". For numbers which are 
//    mutiples of both three and five print "FizzBuzz"

function fizzBuzz() {
    for (let i = 1; i <= 100; i++) {
        if ((i % 3 === 0) && (i % 5 !== 0)) {
            console.log("Fizz")
        } else if ((i % 3 !== 0) && (i % 5 === 0)) {
            console.log("Buzz")
        } else if ((i % 3 === 0) && (i % 5 === 0)) {
            console.log("FizzBuzz")
        } else {
            console.log(i)
        }
    }
}

fizzBuzz()






// ******************************************************************************************************************************************************************
// Binary Search Tree
// 23. Implement a binary search tree

class Node {
    constructor(value) {
        this.value = value
        this.right = null
        this.left = null
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null
    }

    insert(value) {
        let newNode = new Node(value)
        if (!(this.root)) {
            this.root = newNode
        } else {

            let current = this.root
            while (true) {
                if (newNode.value < current.value && current.left === null) {
                    current.left = newNode
                    break
                } else if (newNode.value > current.value && current.right === null) {
                    current.right = newNode
                    break
                } else if (newNode.value < current.value) {
                    current = current.left
                } else if (newNode.value > current.value) {
                    current = current.right
                } else {
                    break
                }
            }
        }

        return this
    }

    find(value) {
        if (!(this.root)) return undefined

        let current = this.root
        while (true) {
            if (current.value === value) {
                return current
            } else if (value < current.value && current.left !== null) {
                current = current.left
            } else if (value > current.value && current.right !== null) {
                current = current.right
            } else {
                return undefined
            }

        }
    }
}

let bts = new BinarySearchTree()





// ******************************************************************************************************************************************************************
// Breath First Search
// 24. Implement a breath first serch

class QNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Node {
    constructor(value) {
        this.value = value
        this.right = null
        this.left = null
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    enqueue(val) {
        var newNode = new QNode(val);
        if (!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }
        return ++this.size;
    }

    dequeue() {
        if (!this.first) return null;

        var temp = this.first;
        if (this.first === this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return temp.value;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null
    }

    insert(value) {
        let newNode = new Node(value)
        if (!(this.root)) {
            this.root = newNode
        } else {

            let current = this.root
            while(true) {
                if (newNode.value < current.value && current.left === null) {
                    current.left = newNode
                    break
                } else if (newNode.value > current.value && current.right === null) {
                    current.right = newNode
                    break
                } else if (newNode.value < current.value) {
                    current = current.left
                } else if (newNode.value > current.value) {
                    current = current.right
                } else {
                    break
                }
            }
        }

        return this
    }

    find(value) {
        if (!(this.root)) return undefined

        let current = this.root
        while (true) {
            if (current.value === value) {
                return current
            } else if (value < current.value && current.left !== null) {
                current = current.left
            } else if (value > current.value && current.right !== null) {
                current = current.right
            } else {
                return undefined
            }

        }
    }
}

let bst = new BinarySearchTree()
bst.insert(25)
bst.insert(32)
bst.insert(17)
bst.insert(39)
bst.insert(30)
bst.insert(23)
bst.insert(14)
console.log(bst.BFS())