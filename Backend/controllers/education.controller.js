const EducationModel = require("../models/education.model");

const createEducation = async (req, res) => {
    try {
        await EducationModel.createEducation(req.body);

        res.status(201).json({
            message: "Educación guardada correctamente"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error al guardar educación"
        });
    }
};

module.exports = {createEducation};