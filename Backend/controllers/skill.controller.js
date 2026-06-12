const SkillModel = require("../models/skill.model");

const createSkill = async (req, res) => {
    try {
        await SkillModel.createSkill(req.body);
        res.status(201).json({
            message: "Habilidad guardada correctamente"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al guardar habilidad"
        });
    }
};

module.exports = {
    createSkill
};