const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
dotenv.config();

const app = express();
const server = http.createServer(app);
app.use(express.json());

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'uploads/images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve static files for uploaded images
app.use('/uploads/images', express.static(uploadDir));

// CORS configuration
const corsOptions = {
    origin: ['http://localhost:5173', 'https://dukaan-olive.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
app.use(cors(corsOptions));

// Welcome route
app.get('/', (req, res) => res.send('Welcome to Dukaan API'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Import routes
const bookRoute = require('./routes/book/book.router');
const orderRoute = require('./routes/order/order.router');
const userRoute = require('./routes/user/user.router');
const adminRoute = require('./stats/admin.stats');
const { router: uploadRoute } = require('./routes/upload.router');

// Use routes
app.use('/api/books', bookRoute);
app.use('/api/orders', orderRoute);
app.use('/api/auth', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api', uploadRoute);

// Database connection
const db_url = process.env.DB_URL;
const port = process.env.WEBSITES_PORT || 8080;

mongoose
    .connect(db_url, {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
    })
    .then(() => {
        server.listen(port, () => {
            console.log(`Backend server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error(`${error} did not connect`);
    });

// Mongoose connection listeners
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB Cluster');
});

mongoose.connection.on('error', (error) => {
    console.error('Mongoose connection error:', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});
