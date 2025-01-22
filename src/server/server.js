import express from "express";
import path from 'path';
import { join } from "path";
import { fileURLToPath } from 'url';
import cors from "cors";
import dotenv from "dotenv";
// import errorHandler from "./middlewares/errorHandler.js";
// import mysql from 'mysql2/promise';
// import apiKeyRouter from "./routes/apiKeyRouter.js";
import checkoutRouter from "./routes/checkoutRouter.js";
import photoRouter from "./routes/photoRouter.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../client/build")));

// const dbConfig = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// };

// app.use("/api", apiKeyRouter);
app.use("/checkout", checkoutRouter);
app.use(photoRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use((req, res, next) => {
  try {
    res.sendFile(join(__dirname, "../client/build/index.html"));
  } catch (err) {
    next(err);
  }
});

// app.use(errorHandler);

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});