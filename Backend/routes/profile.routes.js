const express = require("express");
const router = express.Router();
const { createProfile, getProfileStats } = require("../controllers/profile.controller");

router.get("/stats", getProfileStats);
router.post("/", createProfile);

module.exports = router;