import React from "react";
import { CardContent, Typography, Divider } from "@mui/material";
import models from "../../modelData/models";
import "./styles.css";
import {useParams, Link} from "react-router-dom";
import { Card, CardMedia } from "@mui/material";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos () {
    const userId = useParams();
    const user = models.userModel(userId.userId);
    const photos = models.photoOfUserModel(userId.userId);
    if (!user) {
        return <Typography>Loading...</Typography>;
    }
    if (!photos) {
        return <Typography>Loading...</Typography>;
    }
    const photoPath = "`src/images";
    return (
      <div>
        <Typography variant="h5" gutterBottom>
          Photos of {user.first_name} {user.last_name}
        </Typography>
        {photos.map((photo) => (
          <Card key={photo._id} className="photo-card" sx={{ margin: 2 }}>
            <CardMedia
              component="img"
              height="140"
              image= {`${photoPath}/${photo.image_path}`}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Created at: {new Date(photo.date_time).toLocaleString()}
              </Typography>
              <Divider sx={{ margin: '10px 0' }} />
              {photo.comments.length > 0 ? (
                  photo.comments.map((comment) => (
                      <div key={comment._id} style={{ marginBottom: 10 }}>
                          <Typography variant="subtitle2">
                              <Link href={`/users/${comment.user._id}`}>
                                  {comment.user.first_name} {comment.user.last_name}
                              </Link>{" "}
                              commented on {new Date(comment.date_time).toLocaleString()}
                          </Typography>
                          <Typography variant="body1">
                              {comment.comment}
                          </Typography>
                      </div>
                  ))) : (
                    <Typography variant="body2" color="text.secondary">
                        No comments yet.
                    </Typography>
                  )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
}

export default UserPhotos;
