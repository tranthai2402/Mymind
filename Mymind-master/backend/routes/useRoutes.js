const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/User');

// GET /user/list
router.get('/list', async (req, res) => {
  try {
    const users = await User.find({}, '_id first_name last_name').lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /user/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Kiểm tra ID có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    
    const user = await User.findById(id, '_id first_name last_name location description occupation').lean();
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;