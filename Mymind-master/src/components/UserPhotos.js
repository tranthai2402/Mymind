import React, { useState, useEffect } from 'react';
import { 
  Typography, Grid, Card, CardMedia, CardContent,
  CircularProgress, Button, Box 
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const UserPhotos = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Giả lập việc tải thông tin người dùng và ảnh từ API
    const fetchData = async () => {
      try {
        // Giả lập gọi API
        setTimeout(() => {
          // Tạo dữ liệu ảnh giả
          const mockPhotos = Array.from({ length: 12 }, (_, i) => ({
            id: i + 1,
            title: `Photo ${i + 1}`,
            url: `https://via.placeholder.com/300/6c757d/ffffff?text=Photo+${i+1}`,
            thumbnailUrl: `https://via.placeholder.com/150/6c757d/ffffff?text=Photo+${i+1}`
          }));
          
          // Tạo dữ liệu người dùng giả
          const mockUser = {
            id: parseInt(userId),
            name: `User ${userId}`
          };
          
          setPhotos(mockPhotos);
          setUser(mockUser);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          {user?.name}'s Photos
        </Typography>
        <Button variant="outlined" onClick={() => navigate(`/users/${userId}`)}>
          Back to User
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {photos.map((photo) => (
          <Grid item xs={12} sm={6} md={4} key={photo.id}>
            <Card>
              <CardMedia
                component="img"
                image={photo.url}
                alt={photo.title}
                sx={{ height: 200, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {photo.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UserPhotos;