/**
 * 1. call https://jsonplaceholder.typicode.com/users and write it to file users.json
 * todo: install module to call this API, and use node FS module
 */
const fs = require('fs');

async function getAndWriteData(arg) {
  const users = await fetch(`https://jsonplaceholder.typicode.com/${arg}`);
  const data = await users.json();

  fs.writeFile(`./week0/${arg}.json`, JSON.stringify(data), (err) => {
    !err || console.log(err);
  });
}
getAndWriteData('users');

/**
 * 2. Let's work with running node script with some environment variables
 * todo: Pass parameter ENV when you run this script.
 * If param is PRODUCTION  get data from https://jsonplaceholder.typicode.com/todos and write it to file todos.json
 * If param is DEV get data from https://jsonplaceholder.typicode.com/albums and write if to file albums.json
 */

if (process.env.NODE_ENV === 'PRODUCTION') getAndWriteData('todos');
if (process.env.NODE_ENV === 'DEV') {
  getAndWriteData('albums');
}
