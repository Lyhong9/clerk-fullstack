const express = require("express");
const { requireAuth } = require("@clerk/express");
const homeController = require("../controllers/homeController");

const router = express.Router();

router.get("/", homeController.home);

router.get("/api/profile", requireAuth(), homeController.profile);

module.exports = router;