const express = require("express");
const router = express.Router();

const { createLanguage } = require("../controllers/language.controller");

router.post("/", createLanguage);

module.exports = router;