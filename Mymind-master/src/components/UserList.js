import React, { useState, useEffect } from 'react';
import { 
  List, ListItem, ListItemText, ListItemAvatar, 
  Avatar, CircularProgress, Typography 
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUsers } from '../services/api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to load users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadUsers();
  }, []);

  const handleUserClick = (userId) => {
    navigate(`/users/${userId}`);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Typography variant="h6" sx={{ p: 2 }}>
        Users
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem 
            key={user.id} 
            button 
            onClick={() => handleUserClick(user.id)}
            selected={userId === user.id?.toString()}
          >
            <ListItemAvatar>
              <Avatar src={user.avatar} alt={user.name} />
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UserList;