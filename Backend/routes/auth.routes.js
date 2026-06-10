// ===== DEPENDENCIAS Y CONFIGURACIÓN =====
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");

// Rutas para el login 
router.post("/register", register);
router.post("/login", login);

module.exports = router;