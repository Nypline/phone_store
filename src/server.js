import express from "express";
import { testConnection } from "./config/db.js";
import userRouter from "./routers/userRoute.js";
import productRouter from "./routers/productRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, Express Server is running 🚀");
});

const PORT = 3000;

app.use(userRouter);
app.use(productRouter);

app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  testConnection();
});
