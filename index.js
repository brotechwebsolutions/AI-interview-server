/**
 * ================================
 * AI SERVER – PRODUCTION READY
 * Optimized for Railway (Free Tier)
 * ================================
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Local imports
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middleware/errorHandler");
const rateLimiter = require("./src/middleware/rateLimiter");

// Routes
const authRoutes = require("./src/routes/authRoutes");
const interviewRoutes = require("./src/routes/interviewRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");

const app = express();

/* ================================
   🔐 SECURITY & CORE MIDDLEWARE
================================ */

// Security headers
app.use(helmet());

// CORS (safe for frontend connection)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true
  })
);

// Body parser
app.use(express.json({ limit: "2mb" }));

// Logging (production safe)
app.use(
  morgan(process.env.NODE_ENV === "production" ? "tiny" : "dev")
);

// Rate limiting (protects free tier)
app.use(rateLimiter);

/* ================================
   🗄️ DATABASE CONNECTION
================================ */

connectDB();

/* ================================
   ✅ HEALTH CHECK (Railway Ping)
================================ */

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "AI Interview Server (FREE AI) 🚀"
  });
});

/* ================================
   🔗 API ROUTES
================================ */

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/dashboard", dashboardRoutes);

/* ================================
   ❌ GLOBAL ERROR HANDLER
   (must be LAST)
================================ */

app.use(errorHandler);

/* ================================
   🚀 SERVER START
================================ */

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

/* ================================
   ⏱️ TIMEOUT FIX
   Prevents ECONNRESET for slow AI
================================ */

server.setTimeout(120000); // 2 minutes
