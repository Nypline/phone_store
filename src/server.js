import express from "express";
import { testConnection } from "./config/db.js";
import userRouter from "./routers/userRoute.js";
import productRouter from "./routers/productRoute.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());
const PORT = 3000;
app.use("/", userRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  testConnection();
});
