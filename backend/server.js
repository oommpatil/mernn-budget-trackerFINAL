const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// --- ALLOW ALL CORS (no restrictions) ---
app.use(cors({ origin: true, credentials: true }));
app.options("(.*)", cors({ origin: true, credentials: true }));

// --- Body Parsers ---
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- Routes ---
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.get("/", (req, res) => res.json({ message: "API Running", status: "OK" }));

// --- Error Handler ---
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ message: err.message || "Server Error" });
});

// --- Server Start ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
