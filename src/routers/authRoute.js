import express from "express";
import { registerHandler } from "../controllers/authController.js";
const authRouter = express.Router();

authRouter.post("/register", registerHandler);
export default authRouter;
