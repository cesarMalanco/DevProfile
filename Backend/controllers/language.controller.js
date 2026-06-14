const LanguageModel = require("../models/language.model");

const createLanguage = async (req, res) => {
    try {
        const result = await LanguageModel.createLanguage(req.body);

        res.status(201).json({
            message: "Language created successfully",
            insertId: result.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error creating language"
        });
    }
};

module.exports = { createLanguage };

const updateLanguage = async (req, res) => {
    try {
        const id = req.params.id;
        await LanguageModel.updateLanguage(id, req.body);
        res.status(200).json({ message: "Language updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating language" });
    }
};

const deleteLanguage = async (req, res) => {
    try {
        const id = req.params.id;
        await LanguageModel.deleteLanguageById(id);
        res.status(200).json({ message: "Language deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting language" });
    }
};

module.exports = { createLanguage, updateLanguage, deleteLanguage };