const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./src/config/db");
const errorHandler = require("./src/middleware/errorHandler");
const rateLimiter = require("./src/middleware/rateLimiter");

const authRoutes = require("./src/routes/authRoutes");
const interviewRoutes = require("./src/routes/interviewRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");

const app = express();

// 🔐 Security + middleware
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "2mb" }));
app.use(morgan("combined"));
app.use(rateLimiter);

// 🗄️ Database
connectDB();

// ✅ Health check
app.get("/", (req, res) => {
  res.json({ message: "AI Interview Server (FREE AI) 🚀" });
});

// 🔗 Routes
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ❌ Error handler (must be LAST)
app.use(errorHandler);

// 🚀 Server + TIMEOUT FIX
const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// ⏱️ IMPORTANT: prevents ECONNRESET with slow free AI
server.setTimeout(120000); // 2 minutes
