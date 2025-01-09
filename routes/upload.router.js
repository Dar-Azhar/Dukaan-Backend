const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads/images');
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const currentTime = Date.now();
        cb(null, `${currentTime}-${file.originalname}`);
    },
});

const upload = multer({ storage });
const IMAGE_DIRECTORY = 'uploads/images';

router.post('/upload', upload.single('file'), (req, res) => {
    try {
        const url = `${req.protocol}://${req.get('host')}/${IMAGE_DIRECTORY}/${req.file.filename}`;
        return res.status(200).json({ status: 'success', url });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'File upload failed', error: error.message });
    }
});

module.exports = {router, upload};
