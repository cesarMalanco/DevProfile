const ProfileModel = require("../models/profile.model");

const createProfile = async (req, res) => {
    try {
        const userId = req.body.id_usuario;
        const existingProfile = await ProfileModel.getProfileByUser(userId);
        const photoPath = req.file ? req.file.filename : existingProfile?.foto_perfil || null;
        const profileData = { ...req.body, foto_perfil: photoPath };

        if (existingProfile) {
            await ProfileModel.updateProfile(existingProfile.id_perfil, profileData);
            return res.status(200).json({
                message: "Perfil actualizado correctamente",
                insertId: existingProfile.id_perfil
            });
        }

        const result = await ProfileModel.createProfile(profileData);
        res.status(201).json({
            message: "Perfil guardado correctamente",
            insertId: result.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al guardar perfil"
        });
    }
};

const getProfileStats = async (req, res) => {
    try {
        const userId = req.query.id_usuario;

        if (!userId) {
            return res.status(400).json({ message: "id_usuario es requerido" });
        }

        const stats = await ProfileModel.getProfileStats(userId);
        res.status(200).json(stats[0] || {
            cvs: 0,
            skills: 0,
            projects: 0,
            education: 0,
            languages: 0
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error obteniendo estadísticas" });
    }
};

module.exports = {
    createProfile,
    getProfileStats
};