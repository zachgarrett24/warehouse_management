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
      const { rows: [user] } = await client.query(`
        INSERT INTO users(username, password, name, company)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
      `, [username, password, name, company]);
  
      return user;
    } catch (error) {
      throw error;
    }
}

async function updateUser(id, fields = {}) {
  // build the set string
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: [user] } = await client.query(`
      UPDATE users
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
    `, Object.values(fields));

    return user;
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

    delete password;
    user.products = await getProductsByUser(userId);

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username){
  try {
    const {rows: [ user ] } = await client.query(`
      SELECT *
      FROM users
      WHERE username = $1
    `, [username]);

    return user;
  } catch (error) {
    throw error;
  }
}

async function createProduct({authorId, title}){
  try {
    const { rows: [product] } = await client.query(`
        INSERT INTO products("authorId", title)
        VALUES ($1, $2)
        RETURNING *;
      `, [authorId, title]);
  
      return product;
  } catch (error) {
    throw error;
  }
}

async function updateProduct(id, { title, active }){

  const setString = Object.keys({ title, active }).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: [product] } = await client.query(`
      UPDATE products
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
    `, Object.values({ title, active }));

    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts(){
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM products;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getProductById(productId) {
  try {
    const { rows: [ product ]  } = await client.query(`
      SELECT *
      FROM products
      WHERE id = $1;
    `, [productId]);

    if (!product) {
      throw {
        name: "ProductNotFoundError",
        message: "Could not find a product with that productId"
      };
    }

    return product;
  } catch (error) {
    throw error;
  }
}

async function getProductsByUser(userId){
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM products
      WHERE "authorId" = ${userId};
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  createProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  getProductsByUser
}