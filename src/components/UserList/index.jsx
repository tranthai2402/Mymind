import React from "react";
import { List, ListItem, ListItemText, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom"; 
import models from "../../modelData/models"; 

function UserList() {
  const users = models.userListModel(); 

  return (
    <div>
      <Typography variant="body1">List of users:</Typography>
      <List component="nav">
        {users.map((user) => ( 
          <div key={user._id}> 
            <ListItem>
              <ListItemText 
                primary={<Link to={`/users/${user._id}`}>{user.first_name} {user.last_name}</Link>} 
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}

export default UserList;