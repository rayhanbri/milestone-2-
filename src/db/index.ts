import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.connection_string,
});

//   Keyword	Simple Meaning
// user_id	Column name
// INT	Stores integer numbers
// UNIQUE	Duplicate values are not allowed
// REFERENCES	Creates relation with another table
// users	Parent table name
// (id)	References the id column of users table
// ON DELETE CASCADE	If parent row is deleted, related child rows are automatically deleted

export const initDB = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(20) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
            `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS profiles(
      id SERIAL PRIMARY KEY,
      user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      bio TEXT,
      address TEXT,
      phone VARCHAR(15),
      gender VARCHAR(10),

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )  
        `);

    console.log("Database connected successfully!");
  } catch (error) {
    console.log(error);
  }
};
