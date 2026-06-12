const ProfileModel = require("../models/profile.model");

const createProfile = async (req, res) => {

    try {
        const photoPath = req.file ? req.file.filename : null;
        const profileData = { ...req.body, foto_perfil: photoPath };
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

module.exports = {
    createProfile
};