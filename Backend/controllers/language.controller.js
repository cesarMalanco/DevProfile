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