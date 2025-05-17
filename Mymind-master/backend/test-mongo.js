const mongoose = require('mongoose');

console.log('Attempting to connect to MongoDB...');
mongoose.connect('mongodb://localhost:27017/user_management')
  .then(() => {
    console.log('Successfully connected to MongoDB');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });