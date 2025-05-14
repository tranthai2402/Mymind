import React, { useState, useEffect } from 'react';
import { 
  Typography, Card, CardContent, CardMedia, 
  Button, Grid, Divider, CircularProgress, Box 
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập việc tải thông tin người dùng từ API
    const fetchUserDetails = async () => {
      try {
        // Giả lập gọi API
        setTimeout(() => {
          const mockUser = {
            id: parseInt(userId),
            name: `User ${userId}`,
            email: `user${userId}@example.com`,
            phone: `123-456-${userId}${userId}${userId}${userId}`,
            website: `user${userId}.website.com`,
            address: {
              street: 'Example Street',
              suite: `Suite ${userId}00`,
              city: 'Sample City',
              zipcode: `${userId}${userId}${userId}${userId}${userId}`
            },
            company: {
              name: `Company ${userId}`,
              catchPhrase: 'Sample catchphrase',
              bs: 'Sample bs'
            },
            avatar: 'https://via.placeholder.com/150'
          };
          setUser(mockUser);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Typography variant="h6">User not found</Typography>;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        User Details
      </Typography>
      
      <Card sx={{ mb: 3 }}>
        <Grid container>
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              image={user.avatar}
              alt={user.name}
              sx={{ height: 200, objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <CardContent>
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {user.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone: {user.phone}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Website: {user.website}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      
      <Divider sx={{ my: 2 }} />
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Address
          </Typography>
          <Typography variant="body2">
            {user.address.street}, {user.address.suite}
          </Typography>
          <Typography variant="body2">
            {user.address.city}, {user.address.zipcode}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Company
          </Typography>
          <Typography variant="body2">
            {user.company.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.company.catchPhrase}
          </Typography>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3 }}>
        <Button 
          variant="contained" 
          onClick={() => navigate(`/photos/${userId}`)}
          sx={{ mr: 1 }}
        >
          View Photos
        </Button>
        <Button variant="outlined" onClick={() => navigate('/users')}>
          Back to Users
        </Button>
      </Box>
    </div>
  );
};

export default UserDetail;