/* 
   Filename: ComplexCode.js
   Description: This code is an example of a complex JavaScript program that includes multiple functions, classes, and nested loops.
*/

// Class representing a person
class Person {
  constructor(name, age, profession) {
    this.name = name;
    this.age = age;
    this.profession = profession;
  }

  // Method to calculate the birth year
  calculateBirthYear() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.age;
  }
}

// Function to check if a number is prime
function isPrime(num) {
  if (num <= 1) return false;
  for(let i = 2; i <= Math.sqrt(num); i++) {
    if(num % i === 0) return false;
  }
  return true;
}

// Function to generate Fibonacci sequence
function generateFibonacciSequence(length) {
  const sequence = [0, 1];
  for(let i = 2; i < length; i++) {
    sequence[i] = sequence[i-1] + sequence[i-2];
  }
  return sequence;
}

// Function to find the maximum number in an array
function findMaxNumber(arr) {
  let max = arr[0];
  for(let i = 1; i < arr.length; i++) {
    if(arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

// Function to convert a string to title case
function toTitleCase(str) {
  const words = str.toLowerCase().split(" ");
  const titleCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return titleCaseWords.join(" ");
}

// Function to generate random numbers between a range
function generateRandomNumbers(min, max, count) {
  const randomNumbers = [];
  for(let i = 0; i < count; i++) {
    randomNumbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return randomNumbers;
}

// Main program
console.log("----- Welcome to the Complex JavaScript Code -----");

const person1 = new Person("John", 30, "Engineer");
console.log("Person 1:", person1);

const birthYear = person1.calculateBirthYear();
console.log("Birth Year:", birthYear);

const primeCheckValue = 13;
console.log(`Is ${primeCheckValue} a Prime Number?`, isPrime(primeCheckValue));

const fibonacciSequenceLength = 10;
const fibonacciSequence = generateFibonacciSequence(fibonacciSequenceLength);
console.log(`Fibonacci Sequence (${fibonacciSequenceLength} terms):`, fibonacciSequence);

const numbersArray = [34, 56, 12, 90, 67, 5];
const maxNumber = findMaxNumber(numbersArray);
console.log("Maximum Number in array:", maxNumber);

const titleCaseString = "hello world";
console.log("Title Case:", toTitleCase(titleCaseString));

const min = 10;
const max = 50;
const count = 5;
const randomNumbers = generateRandomNumbers(min, max, count);
console.log(`Random Numbers between ${min} and ${max} (${count} numbers):`, randomNumbers);

console.log("----- End of Code -----");