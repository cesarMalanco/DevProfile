const CvModel = require("../models/cv.model");
const ProfileModel = require("../models/profile.model");

const createCv = async (req, res) => {
    try {
        const { id_usuario, id_plantilla, nombre_cv } = req.body;
        if (!id_usuario) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const result = await CvModel.createCv({ id_usuario, id_plantilla, nombre_cv });

        res.status(201).json({
            message: "CV created successfully",
            insertId: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error saving CV" });
    }
};

const getUserCvs = async (req, res) => {
    try {
        const userId = req.query.userId || req.query.id_usuario;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const cvs = await CvModel.getUserCvs(userId);
        res.status(200).json(cvs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching CVs" });
    }
};

const updateCv = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_cv, id_plantilla } = req.body;

        await CvModel.updateCv(id, { nombre_cv, id_plantilla });
        res.status(200).json({ message: "CV updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating CV" });
    }
};

const getCvById = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await CvModel.getCvById(id);
        if (!data) return res.status(404).json({ message: "CV not found" });

        const profile = await ProfileModel.getProfileByUser(data.cv.id_usuario);

        res.status(200).json({ ...data, profile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching CV" });
    }
};

const deleteCv = async (req, res) => {
    try {
        const { id } = req.params;
        await CvModel.deleteCv(id);
        res.status(200).json({ message: "CV deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting CV" });
    }
};

module.exports = {
    createCv,
    getUserCvs,
    updateCv,
    deleteCv,
    getCvById
};
