const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware.js");

const { createProject } = require("../controllers/project.controller");

router.post("/", upload.single("Foto_proyecto"), createProject);
const { updateProject, deleteProject } = require("../controllers/project.controller");

router.put("/:id", upload.single("Foto_proyecto"), updateProject);
router.delete("/:id", deleteProject);

module.exports = router;