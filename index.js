const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors'); 
const http = require('http');
const mongoose = require('mongoose');
dotenv.config();

const app = express();
const server = http.createServer(app);
app.use(express.json()); 

const corsOptions = {
    origin: ['http://localhost:5173', "https://dukaan-olive.vercel.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
};
app.use(cors(corsOptions));




app.get('/', (req, res) => res.send("Welcome to Dukaan API"));


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Route imports
const bookRoute = require('./routes/book/book.router')
const orderRoute = require('./routes/order/order.router')
const userRoute = require('./routes/user/user.router')
const adminRoute = require('./stats/admin.stats')


// Routes urls
app.use('/api/books', bookRoute);
app.use('/api/orders', orderRoute);
app.use('/api/auth', userRoute);
app.use("/api/admin", adminRoute)


const db_url = process.env.DB_URL;
const port = process.env.WEBSITES_PORT || 8080;
mongoose.connect(db_url, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000
}).then(() => {
    server.listen(port, () => {
        console.log(`Backend server is running on port ${port}`);
    });
}).catch((error) => {
    console.error(`${error} did not connect`);
});


mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB Cluster');
});

mongoose.connection.on('error', (error) => {
    console.error('Mongoose connection error:', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

