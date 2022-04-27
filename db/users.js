const client = require("./client");
const bcrypt = require("bcrypt");

const createUser = async({ username, password, email, firstName, lastName, isAdmin }) => {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  const hashedEmail = await bcrypt.hash(email, SALT_COUNT);
  try {
    const { rows: [user] } = await client.query(
      ` INSERT INTO users (username, password, email, "firstName", "lastName", "isAdmin") 
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
      `,
      [username, hashedPassword, hashedEmail, firstName, lastName, isAdmin]
    );

    delete user.password;
    console.log('user', user);
    return user;
  } catch (error) {
    throw error;
  }
}

const getUser = async({ username, password }) => {
  const user = await getUserByUsername(username);
  const hashedPassword = user.password;
  const passwordsMatch = await bcrypt.compare(password, hashedPassword);

  try {
    const { rows: [user] } = await client.query(
      `SELECT * FROM users
       WHERE username = $1
      `,
      [username]
    );

    if (passwordsMatch) {
      delete user.password;
      return user;
    }
  } catch (error) {
    throw error;
  }
}

const getAllUsers = async() => {
  try {
    const { rows } = await client.query(`
      SELECT id, username, "firstName", "lastName", email FROM users;
    `);
    return rows;
  } catch (error) {
    throw error;
  };
};

const getUserById = async(id) => {
  try {
    const { rows: [user] } = await client.query(`
      SELECT * FROM users 
      WHERE id=${id}
    `);
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
}

const getUserByUsername = async(username) => {
  try {
    const { rows: [user] } = await client.query(
      `SELECT * FROM users
        WHERE username=$1;
      `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

/*


*/
module.exports = {
  client,
  createUser,
  getUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
}