import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import checkoutRouter from "./routes/checkoutRouter.js";
import photoRouter from "./routes/photoRouter.js";
import authRouter from "./routes/authRouter.js";
import rsvpRouter from "./routes/rsvpRouter.js";
import messageRouter from "./routes/messageRouter.js";
import webhookRouter from "./routes/webhookRouter.js";
import testWebhookRouter from "./routes/testWebhookRouter.js";

dotenv.config();

const app = express();

app.use(cookieParser());

app.use("/api/webhook", webhookRouter)
app.use("/api/webhooktest", testWebhookRouter);

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static("public"));

app.use("/api/checkout", checkoutRouter);

app.use("/api/photos", photoRouter);
app.use("/api/auth", authRouter);
app.use("/api/rsvp", rsvpRouter);
app.use("/api/send-message", messageRouter);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
