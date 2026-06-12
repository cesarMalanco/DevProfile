const express = require("express");
const router = express.Router();

const {createSkill} = require("../controllers/skill.controller");


router.post("/", createSkill);

module.exports = router;