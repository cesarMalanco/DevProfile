const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware.js");
const { createProfile, getProfileStats } = require("../controllers/profile.controller");

router.get("/stats", getProfileStats);
router.post("/", upload.single("foto_perfil"), createProfile);

module.exports = router;