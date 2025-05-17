const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Load .env file
dotenv.config();

// Load models with absolute paths
const User = require(path.join(__dirname, 'models', 'User'));
const Photo = require(path.join(__dirname, 'models', 'Photo'));

console.log('Attempting to connect to MongoDB...');
console.log('Connection string:', process.env.MONGODB_URI || 'mongodb://localhost:27017/user_management');

// Connect to MongoDB with better error handling
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/user_management')
  .then(() => {
    console.log('MongoDB connected successfully for seeding');
    
    // Proceed with seeding
    seedDatabase()
      .then(() => {
        console.log('Database seeded successfully!');
        mongoose.connection.close();
      })
      .catch(error => {
        console.error('Error seeding database:', error);
        mongoose.connection.close();
      });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Sample data (your existing function)
async function seedDatabase() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Photo.deleteMany({});
    
    // Create users
    const users = await User.create([
      {
        first_name: "John",
        last_name: "Doe",
        location: "New York, NY",
        description: "Software Engineer with 5 years of experience",
        occupation: "Software Engineer"
      },
      {
        first_name: "Jane",
        last_name: "Smith",
        location: "San Francisco, CA",
        description: "Product Manager specializing in SaaS products",
        occupation: "Product Manager"
      },
      {
        first_name: "Bob",
        last_name: "Johnson",
        location: "Chicago, IL",
        description: "Full Stack Developer with a passion for React",
        occupation: "Developer"
      }
    ]);
    
    // Create photos
    await Photo.create([
      {
        user_id: users[0]._id,
        file_name: "photo1.jpg",
        date_time: new Date(),
        comments: [
          {
            comment: "Great photo!",
            date_time: new Date(),
            user: users[1]._id
          },
          {
            comment: "I like the composition",
            date_time: new Date(),
            user: users[2]._id
          }
        ]
      },
      {
        user_id: users[0]._id,
        file_name: "photo2.jpg",
        date_time: new Date(),
        comments: []
      },
      {
        user_id: users[1]._id,
        file_name: "photo3.jpg",
        date_time: new Date(),
        comments: [
          {
            comment: "Beautiful landscape!",
            date_time: new Date(),
            user: users[0]._id
          }
        ]
      }
    ]);
    
    return true;
  } catch (error) {
    console.error('Error in seedDatabase:', error);
    throw error;
  }
}