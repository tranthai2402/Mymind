import React, {useEffect, useState} from "react";
import {Typography, Button} from "@mui/material";

import "./styles.css";
import {useParams, Link} from "react-router-dom";
import models from "../../modelData/models";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const userId = useParams();
    const [user, setUser] = useState({});
    useEffect(() => {
        const user = models.userModel(userId.userId);
        setUser(user);
    }, [userId.userId]);
    const handleBack = () => {
        window.history.back();
    };
    
    if (!user) {
        return <Typography>Loading...</Typography>;
    }
    return (
        <div>
          <Typography variant="body1">
            Imformation:
          </Typography>
          <Typography variant="body1">
            Full name: {user.first_name} {user.last_name}
          </Typography>
          <Typography variant="body1">
            Email: {user.email}
          </Typography>
          <Typography variant="body1">
            Telephone: {user.phone}
          </Typography>
          <Typography variant="body1">
            Address: {user.address}
          </Typography>
          <Typography variant="body1">
            Date of birth: {user.birthday}
          </Typography>
          <br />
          <Link to={`/photos/${userId}`}>
            <Button class="button" color="primary">
              View Photos
            </Button>
          </Link>
        </div>
    );
}

export default UserDetail;
