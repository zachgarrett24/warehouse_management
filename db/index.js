const { Client } = require('pg'); // imports the pg module

// supply the db name and location of the database
const client = new Client('postgres://localhost:5432/warehouse_management');

async function getAllUsers() {
    const { rows } = await client.query(`
        SELECT *
        FROM users;
    `);
  
    return rows;
}

async function createUser({ username, password, name, company }) {
    try {
      const { rows } = await client.query(`
        INSERT INTO users(username, password, name, company)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
      `, [username, password, name, company]);
  
      return rows;
    } catch (error) {
      throw error;
    }
}

module.exports = {
  client,
  createUser,
  getAllUsers
}