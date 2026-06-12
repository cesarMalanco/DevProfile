const express = require("express");
const router = express.Router();

const { createEducation } = require("../controllers/education.controller");

router.post("/", createEducation);

module.exports = router;