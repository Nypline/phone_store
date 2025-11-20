import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../validation/productValidation.js";
import validate from "../validation/validates.js";

export const getAllProduct = async () => {
  const [product] = await pool.query("Select * from products");
  return product;
};

export const getProductById = async (id) => {
  const [product] = await pool.query(
    "Select * from products FROM product WHERE id = ?",
    [id]
  );
  if (product.length === 0) {
    throw new ResponseError(404, "product not found");
  }
  return product[0];
};

export const createProduct = async (request) => {
  const validated = validate(createProductSchema, request);
  const { user_id, name, description, price, stock } = validated;

  const [result] = await pool.query(
    "INSERT INTO products (user_id, name, description, price, stock) VALUES (?, ?, ?, ?, ?)",
    [user_id, name, description, price, stock]
  );

  return {
    id: result.insertId,
    user_id,
    name,
    description,
    price,
    stock,
  };
};

export const updateProduct = async (id, request) => {
  const validated = validate(updateProductSchema, request);
  const { user_id, name, description, price, stock } = validated;

  const [result] = await pool.query(
    "UPDATE products SET user_id = ?, name = ?, description = ?, price = ?, stock = ? WHERE id = ?",
    [user_id, name, description, price, stock]
  );

  return result;
};

export const deleteProduct = async (id) => {
  const [result] = await pool.query("DELETE FROM products WHERE id = ?", [id]);
  return result;
};
