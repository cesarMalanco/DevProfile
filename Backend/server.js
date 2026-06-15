// === DEPENDENCIAS Y CONFIGURACIÓN ===
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const path = require("path");
const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");
const cvRoutes = require("./routes/cv.routes");
const skillRoutes = require("./routes/skill.routes");
const projectRoutes = require("./routes/project.routes");
const educationRoutes = require("./routes/education.routes");
const languageRoutes = require("./routes/language.routes");


// Middlewares
app.use(express.json());
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/profile", profileRoutes);
app.use("/api/cvs", cvRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/languages", languageRoutes);
app.use("/api/auth", authRoutes);

const frontendDistPath = path.join(__dirname, "..", "Frontend", "dist");
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
}

app.get("/*", (req, res) => {
    if (req.originalUrl.startsWith("/api") || req.originalUrl.startsWith("/uploads")) {
        return res.status(404).json({ message: "Not found" });
    }

    if (fs.existsSync(frontendDistPath)) {
      return res.sendFile(path.join(frontendDistPath, "index.html"));
    }

    res.status(404).json({ message: "Not found" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});