const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware.js");
const {createProfile} = require("../controllers/profile.controller");

router.post("/",upload.single("foto_perfil"),createProfile);

module.exports = router;