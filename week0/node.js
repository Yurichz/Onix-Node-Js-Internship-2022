/**
 * 1. call https://jsonplaceholder.typicode.com/users and write it to file users.json
 * todo: install module to call this API, and use node FS module
 */

/**
 * 2. Let's work with running node script with some environment variables
 * todo: Pass parameter ENV when you run this script.
 * If param is PRODUCTION  get data from https://jsonplaceholder.typicode.com/todos and write it to file todos.json
 * If param is DEV get data from https://jsonplaceholder.typicode.com/albums and write if to file albums.json
 */
const fs = require('fs');

const config = {
  PRODUCTION: {
    url: 'https://jsonplaceholder.typicode.com/todos',
    fileName: 'todos',
  },
  DEV: {
    url: 'https://jsonplaceholder.typicode.com/albums',
    fileName: 'albums',
  },
  USERS: {
    url: 'https://jsonplaceholder.typicode.com/users',
    fileName: 'users',
  },
};

function getConfig() {
  if (process.env.NODE_ENV) return config[process.env.NODE_ENV];

  return config.USERS;
}

async function getAndWriteData() {
  try {
    const { url, fileName } = getConfig();
    const resData = await fetch(`${url}`);
    const baseData = await resData.json();

    fs.writeFile(`./week0/${fileName}.json`, JSON.stringify(baseData), (err) => {
      !err || console.log(err);
    });
  } catch (err) {
    console.log(err);
  }
}
getAndWriteData();
