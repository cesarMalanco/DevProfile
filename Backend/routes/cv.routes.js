const express = require("express");
const router = express.Router();
const { createCv, getUserCvs, updateCv, deleteCv, getCvById } = require("../controllers/cv.controller");

router.get("/", getUserCvs);
router.get("/:id", getCvById);
router.post("/", createCv);
router.put("/:id", updateCv);
router.delete("/:id", deleteCv);

module.exports = router;
