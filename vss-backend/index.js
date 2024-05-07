const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connection = require('./models/db');

const authRoutes = require('./routes/auth');


// Database connection
connection.connect((err) => {
    if (err) {
        throw new Error('Error connecting to the database: ' + err.stack);
    }
    console.log('Connected to the database as ID ' + connection.threadId);
});


// Express app
const app = express();
app.use(express.json());
app.use(cors());


// Routes
app.use('/api/auth', authRoutes);


app.use('/api/hi', (req, res) => {
    const query = 'SELECT * FROM user';
    connection.query(query, (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.json(results);
      });
})

app.use('/hi', (req, res) => {
    res.send('hi')
})


// Start server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`);
});
