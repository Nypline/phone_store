import { pool } from "../config/db.js";

export const getAllProductHandler = async (req, res) => {
  try {
    const [products] = await pool.query("SELECT * FROM products");
    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
    throw error;
  }
};

export const getProductByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const [products] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);

    if (products.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: products[0],
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
    throw error;
  }
};

export const addProductHandler = async (req, res) => {
  const { user_id, name, description, price, stock } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO products (user_id, name, description, price, stock) VALUES (?, ?, ?, ?, ?)",
      [user_id, name, description, price, stock]
    );
    const newProduct = {
      id: result.insertId,
      user_id,
      name,
      description,
      price,
      stock,
    };

    res.status(201).json({
      status: "success",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
    throw error;
  }
};

export const updateProductHandler = async (req, res) => {
  const { id } = req.params;
  const { user_id, name, description, price, stock } = req.body;
  try {
    await pool.query(
      "UPDATE products SET user_id = ?, name = ?, description = ?, price = ?, stock = ? WHERE id = ?",
      [user_id, name, description, price, stock, id]
    );
    const [productUpdate] = await pool.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );
    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: productUpdate[0],
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
    throw error;
  }
};

export const deleteProductHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const [deleteProduct] = await pool.query(
      "DELETE FROM products WHERE id = ?",
      [id]
    );
    if (deleteProduct.affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
    throw error;
  }
};
