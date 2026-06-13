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

const getSkills = async (req, res) => {
    try {
        const userId = req.query.id_usuario;
        if (!userId) return res.status(400).json({ message: "id_usuario es requerido" });
        const skills = await SkillModel.getSkillsByUser(userId);
        res.status(200).json(skills);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error obteniendo habilidades" });
    }
};

const updateSkill = async (req, res) => {
    try {
        const id = req.params.id;
        await SkillModel.updateSkill(id, req.body);
        res.status(200).json({ message: "Habilidad actualizada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error actualizando habilidad" });
    }
};

const deleteSkill = async (req, res) => {
    try {
        const id = req.params.id;
        await SkillModel.deleteSkillById(id);
        res.status(200).json({ message: "Habilidad eliminada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error eliminando habilidad" });
    }
};

module.exports = {
    createSkill,
    getSkills,
    updateSkill,
    deleteSkill
};