// === DEPENDENCIAS Y CONFIGURACIÓN ===
require("dotenv").config();
const express = require("express");
const cors = require("cors");
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
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/uploads",express.static(path.join(__dirname, "uploads")));
app.use("/api/profile",profileRoutes);
app.use("/api/cvs", cvRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/languages", languageRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "API DevProfile funcionando"
    });
});

// Rutas
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});