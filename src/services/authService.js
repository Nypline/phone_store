import { pool } from "../config/db.js";
import { registerSchema } from "../validation/authValidation.js";
import validate from "../validation/validates.js";
import bcrypt from "bcrypt";

export const register = async (request) => {
  const validated = validate(registerSchema, request);
  const {
    fullname,
    username,
    email,
    password,
    role,
    address,
    phone_number,
    age,
  } = validated;
  const hashedPassword = await bcrypt.hash(password, 10);
  const [users] = await pool.query(
    "INSERT INTO users (fullname, username, email, password, role, adress, phone_number, age) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      fullname,
      username,
      email,
      hashedPassword,
      role,
      address,
      phone_number,
      age,
    ]
  );
  const newUser = {
    id: users.insertId,
    fullname,
    username,
    email,
    role,
    address,
    phone_number,
    age,
  };
  return newUser;
};
