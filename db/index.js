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

async function getUserById(userId) {
  try {
    const { rows: [ user ] } = await client.query(`
      SELECT id, username, name, company
      FROM users
      WHERE id=${ userId }
    `);

    if (!user) {
      throw {
        name: "UserNotFoundError",
        message: "A user with that id does not exist"
      }
    }

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  createUser,
  getAllUsers,
  getUserById
}