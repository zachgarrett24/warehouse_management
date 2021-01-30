// grab our client with destructuring from the export in index.js
const { 
    client,
    getAllUsers
} = require('./index');

async function dropTables() {
    try {
        console.log('starting to drop tables...')
        await client.query(`
            DROP TABLE IF EXISTS users;
        `)
        console.log('finished dropping tables...')
    } catch (error) {
        console.error('error dropping tables!')
        throw error;
    }
}

async function createTables() {
    try {
        console.log('starting to build tables...')
        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);
        console.log('finished building tables...')
    } catch (error) {
        console.log('error building tables!')
        throw error;
    }
}

async function rebuildDB() {
    try {
        client.connect();
        await dropTables();
        await createTables();
    } catch (error) {
        throw error;
    }
}

async function testDB() {
  try {
    const users = await getAllUsers();
    console.log(users);

  } catch (error) {
    console.error(error);
  } 
}

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());
