import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import routes from "./routes/index.js";
import { Server } from "socket.io";
import http from "http";
import notificationRoutes from './routes/notificationRoutes.js';
import { initializeSocket } from './socket/socket-server.js';

dotenv.config(); // Load .env variables

console.log("✅ DEBUG SENDGRID:", process.env.SENDGRID_API_KEY);

const app = express();
const server = http.createServer(app); // 👈 Important: use http server

// Initialize Socket.IO with proper authentication
const io = initializeSocket(server);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan("dev"));
app.use(express.json());

// ✅ CONNECT TO DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB Connected successfully."))
  .catch((err) => console.error("❌ Failed to connect to DB:", err));

// ROUTES
app.use('/uploads/avatars', express.static(path.join(process.cwd(), 'uploads/avatars')));
app.use("/api-v1", routes);
app.use('/api/notifications', notificationRoutes);

// Test route
app.get("/", async (req, res) => {
  res.status(200).json({ message: "Welcome to TaskBoard API" });
});

// Error middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// 404 middleware
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// 👇 Start server with http server (for Socket.IO support)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
