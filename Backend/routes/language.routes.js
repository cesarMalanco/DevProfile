const express = require("express");
const router = express.Router();

const { createLanguage, updateLanguage, deleteLanguage } = require("../controllers/language.controller");

router.post("/", createLanguage);
router.put("/:id", updateLanguage);
router.delete("/:id", deleteLanguage);

module.exports = router;