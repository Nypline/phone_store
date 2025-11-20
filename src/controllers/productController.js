import * as productServices from "../services/productServices.js";

export const getAllProductHandler = async (req, res, next) => {
  try {
    const response = await productServices.getAllProduct();
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await productServices.getProductById(id);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const createProductHandler = async (req, res, next) => {
  try {
    const newProduct = await productServices.createProduct(req.body);

    res.status(201).json({
      status: "success",
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fields = req.body;

    const updatedProduct = await productServices.updateProduct(id, fields);

    res.status(200).json({
      status: "success",
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    await productServices.deleteProduct(id);

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
