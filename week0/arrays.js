const myArray = [1, 10, 3, 6, 'ArrayElement'];

/**
 * 1. Log 3 and 6 elements from myArray to console
 * Please, use more than on solution
 */

console.log(`3: ${myArray[2]}`);
console.log(`6: ${myArray[3]}`);

/**
 *  2. Log type of each element
 */

myArray.forEach((elem) => {
  console.log(elem);
});

/**
 *  3. Check if all elements in array is Number
 *  Should return Boolean
 */

const isNumber = myArray.every((elem) => typeof elem === 'number');

console.log({
  isNumber,
});

/**
 * 4. Check if at least one element is bigger than 5
 * Should return Boolean
 */

const isBiggerThanFive = myArray.some((elem) => elem > 5);

console.log({
  isBiggerThanFive,
});

/**
 * 5. Create another variable that will include only elements that bigger than 5
 * Should return another Array
 */

const elementsBiggerThanFive = myArray.filter((elem) => elem > 5);

console.log({
  elementsBiggerThanFive,
});

/**
 * 6. Multiply numbers of Array by 2
 * Should return another Array
 */

const multiplied = myArray.map((elem) => (typeof elem === 'number' ? elem * 2 : elem));

console.log({
  multiplied,
});

/**
 * 7. Calculate array sum
 */

const sum = myArray.filter((elem) => typeof elem === 'number').reduce((result, elem) => result + elem);

console.log({
  sum,
});

/**
 * 8. Sort array in ascending and descending order
 */

const asc = myArray.sort((a, b) => a - b).slice(0);
const desc = myArray.sort((a, b) => b - a).slice(0);

console.log({
  asc,
  desc,
});
