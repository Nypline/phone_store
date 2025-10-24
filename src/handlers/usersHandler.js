import { pool } from "../config/db.js";

export const getAllUsersHandler = async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, fullname, username, email, role, adress, phone_number, age FROM users"
    );
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
    throw error;
  }
};

export const getUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const [users] = await pool.query(
      "SELECT id, fullname, username, email, role, adress, phone_number, age FROM users WHERE id = ?",
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: users[0],
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
    throw error;
  }
};

export const addUserHandler = async (req, res) => {
  const { fullname, username, email, password, role } = req.body;

  if (
    !fullname ||
    fullname.trim() === "" ||
    !username ||
    username.trim() === "" ||
    !email ||
    email.trim() === "" ||
    !password ||
    password.trim() === "" ||
    !role ||
    role.trim() === ""
  ) {
    return res.status(400).json({
      status: "fail",
      message: "All fields are required",
    });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO users (fullname, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
      [fullname, username, email, password, role]
    );
    const newUser = {
      id: result.insertId,
      fullname,
      username,
      email,

      role,
    };

    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
    throw error;
  }
};

export const updateUserHandler = async (req, res) => {
  const { id } = req.params;
  const { fullname, username, email, adress, phone_number, age } = req.body;
  try {
    await pool.query(
      "UPDATE users SET fullname = ?, username = ?, email = ?, adress = ?, phone_number = ?, age = ? WHERE id = ?",
      [fullname, username, email, adress, phone_number, age, id]
    );
    const [userUpdate] = await pool.query(
      "SELECT id, fullname, username, email, role, adress, phone_number, age FROM users WHERE id = ?",
      [id]
    );
    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: userUpdate[0],
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
    throw error;
  }
};

export const deleteUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const [deleteUser] = await pool.query("DELETE FROM users WHERE id = ?", [
      id,
    ]);
    if (deleteUser.affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
    throw error;
  }
};
