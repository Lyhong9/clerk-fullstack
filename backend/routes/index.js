const express = require("express");
const { requireAuth } = require("@clerk/express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Express API is running 🚀",
  });
});

router.get("/api/profile", requireAuth(), (req, res) => {
  res.json({
    message: "Protected Route",
    userId: req.auth.userId,
  });
});

module.exports = router;