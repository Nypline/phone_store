import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../validation/userValidation.js";
import validate from "../validation/validates.js";

export const getAllUsers = async () => {
  const [users] = await pool.query(
    "SELECT id, fullname, username, email, role, adress, phone_number, age FROM users"
  );
  return users;
};

export const getUserById = async (id) => {
  const [users] = await pool.query(
    "SELECT id, fullname, username, email, role, adress, phone_number, age FROM users WHERE id = ?",
    [id]
  );
  if (users.length === 0) {
    throw new ResponseError(404, "User not found");
  }
  return users[0];
};

export const createUser = async (request) => {
  const validated = validate(createUserSchema, request);
  const { fullname, username, email, password, role } = validated;

  const [result] = await pool.query(
    "INSERT INTO users (fullname, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
    [fullname, username, email, password, role]
  );

  console.log("Validated Data:", JSON.stringify(validated));

  return {
    id: result.insertId,
    fullname,
    username,
    email,
    role,
  };
};

export const updateUser = async (id, request) => {
  const validated = validate(updateUserSchema, request);
  const { fullname, username, email, adress, phone_number, age } = validated;

  const [result] = await pool.query(
    "UPDATE users SET fullname = ?, username = ?, email = ?, adress = ?, phone_number = ?, age = ? WHERE id = ?",
    [fullname, username, email, adress, phone_number, age, id]
  );

  return result;
};

export const deleteUser = async (id) => {
  const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
  return result;
};
