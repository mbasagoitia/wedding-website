import express from "express";
import path from 'path';
import { join } from "path";
import { fileURLToPath } from 'url';
import cors from "cors";
import dotenv from "dotenv";
// import errorHandler from "./middlewares/errorHandler.js";
import checkoutRouter from "./routes/checkoutRouter.js";
import photoRouter from "./routes/photoRouter.js";
import authRouter from "./routes/authRouter.js";
import rsvpRouter from "./routes/rsvpRouter.js";

dotenv.config();

const app = express();

app.use(express.json());

const corsOptions = {
    origin: 'http://wedding.basagoitia.net',
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));


app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../client/build")));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(checkoutRouter);
app.use('/photos', photoRouter);
app.use('/auth', authRouter);
app.use('/rsvp', rsvpRouter);
// OAuth callback: https://wedding.basagoitia.net/auth/google/callback

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