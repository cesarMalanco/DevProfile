const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware.js");

const { createProject } = require("../controllers/project.controller");

router.post("/", upload.single("Foto_proyecto"), createProject);

module.exports = router;