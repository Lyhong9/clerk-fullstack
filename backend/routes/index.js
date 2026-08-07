const express = require("express");
const homeController = require("../controllers/homeController");
const userRoutes = require("./userRoutes");

const router = express.Router();

router.get("/", homeController.home);
router.use("/api/users", userRoutes);

module.exports = router;