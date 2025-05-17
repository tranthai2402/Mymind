const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/user_management')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

// Define routes directly for simplicity (without importing)
// User routes
app.get('/user/list', async (req, res) => {
  try {
    const User = require('./models/User');
    const users = await User.find({}, '_id first_name last_name').lean();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: error.message });
  }
});

app.get('/user/:id', async (req, res) => {
  try {
    const User = require('./models/User');
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    
    const user = await User.findById(id, '_id first_name last_name location description occupation').lean();
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: error.message });
  }
});

app.get('/photosOfUser/:id', async (req, res) => {
  try {
    const User = require('./models/User');
    const Photo = require('./models/Photo');
    const { id } = req.params;
    
    // Kiểm tra ID có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    
    // Kiểm tra xem người dùng có tồn tại không
    const userExists = await User.exists({ _id: id });
    
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Lấy tất cả ảnh của người dùng
    const photos = await Photo.find({ user_id: id })
      .populate('comments.user', '_id first_name last_name')
      .lean();
      
    // Format data as per API spec
    const formattedPhotos = photos.map(photo => ({
      _id: photo._id,
      user_id: photo.user_id,
      file_name: photo.file_name,
      date_time: photo.date_time,
      comments: photo.comments.map(comment => ({
        _id: comment._id,
        comment: comment.comment,
        date_time: comment.date_time,
        user: {
          _id: comment.user._id,
          first_name: comment.user.first_name,
          last_name: comment.user.last_name
        }
      }))
    }));
    
    res.json(formattedPhotos);
  } catch (error) {
    console.error('Error fetching user photos:', error);
    res.status(500).json({ message: error.message });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));