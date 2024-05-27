const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connection = require('./models/db');

const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/video');

// Express app
const app = express();
app.use(express.json());
app.use(cors());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/video', videoRoutes);

// Start server
connection.connect((err) => {
    if (err) {
        throw new Error('Error connecting to the database: ' + err.stack);
    }
    console.log('Connected to the database as ID ' + connection.threadId);
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}...`);
    });
});
