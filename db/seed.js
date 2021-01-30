// grab our client with destructuring from the export in index.js
const { 
    client,
    createUser,
    getAllUsers
} = require('./index');

async function dropTables() {
    try {
        console.log('starting to drop tables...')
        await client.query(`
            DROP TABLE IF EXISTS users;
        `);
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
                password VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                company VARCHAR(255) NOT NULL,
                active BOOLEAN DEFAULT true
            );
        `);
        console.log('finished building tables...')
    } catch (error) {
        console.log('error building tables!')
        throw error;
    }
}

async function createInitialUsers() {
    try {
        console.log('starting to create users...');
        const albert = await createUser({ username: 'albert', password: 'bertie99', name: 'Bert', company: 'House of Reptiles' });
        const sandra = await createUser({ username: 'sandra', password: 'sosandy', name: 'Sandy Cheeks', company: 'Best Beach Towels' });
        const glamgal = await createUser({ username: 'glamgal', password: 'soglam', name: 'Edward', company: 'Make-up Town' });
        console.log('finished creating users!');
    } catch (error) {
        throw error;
    }
    
}

async function rebuildDB() {
    try {
        client.connect();
        await dropTables();
        await createTables();
        await createInitialUsers();
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
