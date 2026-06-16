const ProjectModel = require("../models/project.model");

const createProject = async (req, res) => {
    try {
        const imagePath = req.file ? req.file.filename : null;
        const projectData = { ...req.body, imagen: imagePath };

        const result = await ProjectModel.createProject(projectData);

        res.status(201).json({
            message: "Project created successfully",
            insertId: result.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error creating project"
        });
    }
};

const updateProject = async (req, res) => {
    try {
        const id = req.params.id;
        const imagePath = req.file ? req.file.filename : req.body.imagen || null;
        const projectData = { ...req.body, imagen: imagePath };

        await ProjectModel.updateProject(id, projectData);

        res.status(200).json({ message: "Project updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating project" });
    }
};

const deleteProject = async (req, res) => {
    try {
        const id = req.params.id;
        await ProjectModel.deleteProjectById(id);
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting project" });
    }
};

module.exports = { createProject, updateProject, deleteProject };