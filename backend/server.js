const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// --- CORS ---
const allowedOrigins = [
  "http://localhost:3000",
  "https://mernn-budget-tracker.netlify.app",
  "https://mernn-budget-trackerfinal-1.onrender.com"
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true); // Postman, curl, SSR, etc.
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS: " + origin));
  },
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true, // keep only if you actually use cookies
};

// Apply before routes
app.use(cors(corsOptions));
// Explicitly answer preflight
app.options("*", cors(corsOptions));

// --- Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.get("/", (req, res) => res.json({ message: "API Running", status: "OK" }));

// --- Error handler (keeps CORS headers set above)
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
