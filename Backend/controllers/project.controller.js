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

module.exports = { createProject };