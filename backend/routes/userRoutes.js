const express = require("express");
const { requireAuth } = require("@clerk/express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/me", requireAuth(), userController.me);

module.exports = router;