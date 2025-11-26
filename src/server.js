import express from "express";
import { testConnection } from "./config/db.js";
import userRouter from "./routers/userRoute.js";
import productRouter from "./routers/productRoute.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import authRouter from "./routers/authRoute.js";

const app = express();

app.use(express.json());
const PORT = 3000;
app.use(authRouter);
app.use(userRouter);
app.use(productRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  testConnection();
});
