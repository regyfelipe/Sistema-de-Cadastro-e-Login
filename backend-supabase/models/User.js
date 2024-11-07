const pool = require("../config/db");

const User = {
  async create({ name, email, password, avatar }) {
    const query = `INSERT INTO users (name, email, password, avatar) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [name, email, password, avatar || null]; 

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findByEmail(email) {
    const query = `SELECT * FROM users WHERE email = $1 LIMIT 1`;
    const values = [email];

    const result = await pool.query(query, values);
    return result.rows[0]; 
  }
};

module.exports = User;
