const SkillModel = require("../models/skill.model");

const createSkill = async (req, res) => {
    try {
        await SkillModel.createSkill(req.body);
        res.status(201).json({
            message: "Skill saved successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error saving skill"
        });
    }
};

const getSkills = async (req, res) => {
    try {
        const userId = req.query.id_usuario;
        if (!userId) return res.status(400).json({ message: "User ID is required" });
        const skills = await SkillModel.getSkillsByUser(userId);
        res.status(200).json(skills);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching skills" });
    }
};

const updateSkill = async (req, res) => {
    try {
        const id = req.params.id;
        await SkillModel.updateSkill(id, req.body);
        res.status(200).json({ message: "Skill updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating skill" });
    }
};

const deleteSkill = async (req, res) => {
    try {
        const id = req.params.id;
        await SkillModel.deleteSkillById(id);
        res.status(200).json({ message: "Skill deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting skill" });
    }
};

module.exports = {
    createSkill,
    getSkills,
    updateSkill,
    deleteSkill
};