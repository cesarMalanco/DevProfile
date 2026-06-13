const express = require("express");
const router = express.Router();

const { createSkill, getSkills, updateSkill, deleteSkill } = require("../controllers/skill.controller");

router.post("/", createSkill);
router.get("/", getSkills);
router.put("/:id", updateSkill);
router.delete("/:id", deleteSkill);

module.exports = router;