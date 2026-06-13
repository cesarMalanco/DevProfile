const EducationModel = require("../models/education.model");

const createEducation = async (req, res) => {
    try {
        await EducationModel.createEducation(req.body);

        res.status(201).json({
            message: "Education saved successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error saving education"
        });
    }
};

module.exports = {createEducation};