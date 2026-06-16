const ProjectModel = require("../models/project.model");

const getImageValue = (req) => {
    if (req.file) return req.file.filename;
    if (req.body.imagen) return req.body.imagen;
    if (req.body.Foto_proyecto) return req.body.Foto_proyecto;
    return null;
};

const createProject = async (req, res) => {
    try {
        const imagePath = getImageValue(req);
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
        const imagePath = getImageValue(req);
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