import express from "express";
import {
  getAllProductHandler,
  getProductByIdHandler,
  addProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "../handlers/productHandler.js";

const productRouter = express.Router();

productRouter.get("/products", getAllProductHandler);
productRouter.get("/products/:id", getProductByIdHandler);
productRouter.post("/products", addProductHandler);
productRouter.put("/products/:id", updateProductHandler);
productRouter.delete("/products/:id", deleteProductHandler);

export default productRouter;
