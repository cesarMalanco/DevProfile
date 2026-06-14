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

const updateEducation = async (req, res) => {
    try {
        const id = req.params.id;
        await EducationModel.updateEducation(id, req.body);
        res.status(200).json({ message: "Education updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating education" });
    }
};

const deleteEducation = async (req, res) => {
    try {
        const id = req.params.id;
        await EducationModel.deleteEducationById(id);
        res.status(200).json({ message: "Education deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting education" });
    }
};

module.exports = { createEducation, updateEducation, deleteEducation };