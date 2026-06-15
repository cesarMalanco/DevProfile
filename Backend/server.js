// === DEPENDENCIAS Y CONFIGURACIÓN ===
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();

const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");
const cvRoutes = require("./routes/cv.routes");
const skillRoutes = require("./routes/skill.routes");
const projectRoutes = require("./routes/project.routes");
const educationRoutes = require("./routes/education.routes");
const languageRoutes = require("./routes/language.routes");


// === MIDDLEWARES ===
const FRONTEND_URL = process.env.FRONTEND_URL || "https://devprofile-react.netlify.app";

app.use(cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.options("*", cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


// === RUTAS ESTÁTICAS Y API ===
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/cvs", cvRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/languages", languageRoutes);


// === FRONTEND  ===
const frontendDistPath = path.join(__dirname, "..", "Frontend", "dist");
if (fs.existsSync(frontendDistPath)) {
    app.use(express.static(frontendDistPath));
}


// === FALLBACK / 404 ===
app.use((req, res) => {
    if (req.originalUrl.startsWith("/api") || req.originalUrl.startsWith("/uploads")) {
        return res.status(404).json({ message: "Not found" });
    }

    if (fs.existsSync(frontendDistPath)) {
        return res.sendFile(path.join(frontendDistPath, "index.html"));
    }

    res.status(404).json({ message: "Not found" });
});


// === SERVIDOR ===
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});