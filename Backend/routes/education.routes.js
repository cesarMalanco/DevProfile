const express = require("express");
const router = express.Router();

const { createEducation, updateEducation, deleteEducation } = require("../controllers/education.controller");

router.post("/", createEducation);
router.put("/:id", updateEducation);
router.delete("/:id", deleteEducation);

module.exports = router;