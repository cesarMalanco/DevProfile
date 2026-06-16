const express = require("express");
const router = express.Router();

const { createProject, updateProject, deleteProject } = require("../controllers/project.controller");

router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;