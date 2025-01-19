const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dufgb03fr',
    api_key: '883511487346621',
    api_secret: 'ARYf_5Nw1o-C8AUiEKm6AYrpMEk',
});

module.exports = cloudinary;
