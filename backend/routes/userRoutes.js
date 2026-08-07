const express = require("express");
const router = express.Router();
const { requireAuth } = require("@clerk/express");
console.log("USER ROUTES LOADED");

const userController = require("../controllers/userController");

// router.get("/me", requireAuth(), userController.me);
router.get(
  "/me",
  requireAuth(),
  (req, res, next) => {
    console.log("GET /me route hit");
    next();
  },
  userController.me,
);

module.exports = router;
