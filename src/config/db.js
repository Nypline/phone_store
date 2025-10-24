import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "phone_store_db",
});

export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log("Database connected successfully ✅");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};

export default pool;
