const express = require("express");
const router = express.Router();
const { requireAuth } = require("@clerk/express");

const userController = require("../controllers/userController");

// router.get("/me", requireAuth(), userController.me);
router.get(
  "/me",
  requireAuth(),
  (req, res, next) => {
    next();
  },
  userController.me,
);

module.exports = router;
