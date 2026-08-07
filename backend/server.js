const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { clerkMiddleware } = require("@clerk/express");
const { requireAuth } = require("@clerk/express");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.json({
    message: "Express API is running 🚀",
  });
});

app.get("/api/profile", requireAuth(), (req, res) => {
  res.json({
    message: "Protected Route",

    userId: req.auth.userId,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
