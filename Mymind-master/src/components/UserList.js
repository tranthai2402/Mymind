import React, { useState, useEffect } from 'react';
import { 
  List, ListItem, ListItemText, ListItemAvatar, 
  Avatar, CircularProgress, Typography 
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    // Giả lập việc tải danh sách người dùng từ API
    const fetchUsers = async () => {
      try {
        // Giả lập gọi API
        setTimeout(() => {
          const mockUsers = [
            { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'https://via.placeholder.com/50' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://via.placeholder.com/50' },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com', avatar: 'https://via.placeholder.com/50' },
            { id: 4, name: 'Alice Brown', email: 'alice@example.com', avatar: 'https://via.placeholder.com/50' },
          ];
          setUsers(mockUsers);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
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