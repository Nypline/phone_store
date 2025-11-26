import * as AuthService from "../services/authService.js";
export const registerHandler = async (req, res, next) => {
  try {
    const newUser = await AuthService.register(req.body);
    res.status(201).json({
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};
