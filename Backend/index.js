const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 3010;

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/voluntere')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(cors({ origin: 'http://localhost', credentials: true}));
app.use(morgan('tiny'));
app.use(helmet());

const mod = require('./routes/mod.js');
const user = require('./routes/user.js');
const community = require('./routes/community.js');
const event = require('./routes/event.js');

app.use(express.json());
app.use('/api/mod', mod);
app.use('/api/user', user);
app.use('/api/community', community);
app.use('/api/event', event);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
