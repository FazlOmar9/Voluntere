const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;


// Connect to MongoDB
mongoose.connect('mongodb://localhost/voluntere', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(cors())


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});