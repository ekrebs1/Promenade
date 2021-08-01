const { client, db } = require("./client");

async function createUser({ username, password, email, name, admin = false }) {
  try {
    const {
      rows: [users],
    } = await client.query(
      `
        INSERT INTO users(username, password, email, name, admin )
        VALUES ($1,$2, $3, $4, $5)
        ON ONFLICT (username, email) DO NOTHING 
        RETURNING *;
        `,
      [username, password, email, name, admin]
    );
    return users;
  } catch (error) {
    console.error(" Error createUser in db/user.");
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows: id } = await client.query(`
      SELECT id
      FROM users
      `);

    const users = await Promise.all(id.map((user) => getUserByID(user.id)));
    return users;
  } catch (error) {
    console.error("Error with getAllUsers in db/users.");
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * FROM users
    WHERE username=($1)
    `,
      [username]
    );
    return user;
  } catch (error) {
    console.error("Error with getUserByUsername in db/users.");
    throw error;
  }
}

async function verifyUniqueUser(username, email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * FROM users
    WHERE username=($1)
    OR email=($2);
    `,
      [username, email]
    );
    return user;
  } catch (error) {
    console.error("Error with verifyUniqueUser in db/users.");
    throw error;
  }
}

async function patchUser(user_id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  try {
    if (setString > 0) {
      await client.query(
        `
      UPDATE users
      SET ${setString}
      WHERE id=${user_id}
      RETURNING *
      `,
        Object.values(fields)
      );
    }
    return await getUserById(user_id);
  } catch (error) {
    console.error("Error with patchUser in db/users.");
    throw error;
  }
}

async function deleteUser(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    DELETE FROM users
    WHERE id=$1
`,
      [id]
    );
  } catch (error) {
    console.error("Error with deleteUser in db/users.");
    throw error;
  }
}

// USER ADDRESS

async function createUserAddress({
  user_id,
  street,
  street_2,
  state,
  zip_code,
}) {
  try {
    await client.query(
      `
    INSERT INTO user_address(user_id, street, street_2, state, zip_code)
    VALUES($1, $2, $3, $4, $5)
    ON CONFLICT (user_id) DON NOTHING 
    RETURNING *
    `,
      [user_id, street, street_2, state, zip_code]
    );
    return await joinAddressToUser(user_id);
  } catch (error) {
    console.error("Error with createUserAddress in db/users.");
    throw error;
  }
}

async function joinAddressToUser(user_id) {
  try {
    const { rows: userWithAddress } = await client.query(
      `
    SELECT users.id
    FROM users
    INNER JOIN user_address ON user_id= users.id
    WHERE user_address.user_id= $1
    `,
      [user_id]
    );
    return userWithAddress;
  } catch (error) {
    console.error("Error with joinAddressToUser in db/users.");
    throw error;
  }
}

// GUESTS

async function createGuest({ email, name }) {
  try {
    const {
      rows: [guests],
    } = await client.query(
      `
    INSERT INTO guests(email, name)
    VALUES($1, $2)
    ON CONFLICT (email) DO NOTHING
    RETURNING *
    `,
      [email, name]
    );
    return guests;
  } catch (error) {
    console.error(" Error with createGuest in db/users.");
    throw error;
  }
}

module.exports = {
  client,
  db,
  createUser,
  getAllUsers,
  getUserByUsername,
  verifyUniqueUser,
  patchUser,
  deleteUser,
  createUserAddress,
  joinAddressToUser,
  createGuest,
};
