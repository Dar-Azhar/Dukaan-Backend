// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const cloudinary = require('../cloudinary');

// const router = express.Router();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadDir = path.join(__dirname, '../uploads/images');
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         const currentTime = Date.now();
//         cb(null, `${currentTime}-${file.originalname}`);
//     },
// });

// const upload = multer({ storage });
// const IMAGE_DIRECTORY = 'uploads/images';

// router.post('/upload', upload.single('file'), (req, res) => {
//     try {
//         const url = `${req.protocol}://${req.get('host')}/${IMAGE_DIRECTORY}/${req.file.filename}`;
//         return res.status(200).json({ status: 'success', url });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ status: 'error', message: 'File upload failed', error: error.message });
//     }
// });

// module.exports = {router, upload};


const express = require('express');
const multer = require('multer');
const cloudinary = require('../cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const router = express.Router();

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary, // Cloudinary instance
    params: {
        folder: 'uploads/images', 
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], 
        public_id: (req, file) => `${Date.now()}-${file.originalname}`, 
    },
});

const upload = multer({ storage });

// File upload route
router.post('/upload', upload.single('coverImage'), async (req, res) => {
    try {
        // req.file should have the secure_url provided by Cloudinary
        const { path, filename } = req.file;
        const secureUrl = req.file.path || req.file.secure_url;

        return res.status(200).json({
            status: 'success',
            message: 'File uploaded successfully',
            url: secureUrl, 
            filename, 
        });
    } catch (error) {
        console.error('Error during file upload:', error);
        return res.status(500).json({
            status: 'error',
            message: 'File upload failed',
            error: error.message,
        });
    }
});

module.exports = { router, upload };

