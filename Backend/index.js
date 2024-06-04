const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/voluntere')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(cors());
app.use(morgan('tiny'));

const mod = require('./routes/mod.js');

app.use(express.json());
app.use('/api/mod', mod);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
