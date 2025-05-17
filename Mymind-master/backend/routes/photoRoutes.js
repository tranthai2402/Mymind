const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Photo = require('../models/Photo');
const User = require('../models/User');

// GET /photosOfUser/:id
router.get('/photosOfUser/:id', async (req, res) => {
  try {
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
    
    // Lấy tất cả ảnh của người dùng và populate thông tin user trong comments
    const photos = await Photo.find({ user_id: id })
      .populate('comments.user', '_id first_name last_name')
      .lean();
      
    // Thêm xử lý đảm bảo format đúng theo API spec
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
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;