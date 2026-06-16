const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {

    const allowedTypes =
        /jpeg|jpg|png/;

    const isValid =
        allowedTypes.test(
            path.extname(file.originalname).toLowerCase()
        );

    if (isValid) {
        cb(null, true);
    } else {
        cb(new Error("Format not allowed"));
    }
};

module.exports = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
});