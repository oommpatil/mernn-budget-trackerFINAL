const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ---- CORS (allow your Netlify + localhost) ----
const allowedOrigins = [
  "http://localhost:3000",
  "https://mernn-budget-tracker.netlify.app"
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.get("/", (req, res) => {
  res.json({ message: "API Running", status: "OK" });
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
