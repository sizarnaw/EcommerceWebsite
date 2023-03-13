import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
export type CommentsProps ={
    username:string,
    comment:string,
    _id:string
}
export default function Comments({username,comment}:CommentsProps) {
  return (
    
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">

        <ListItemText
          primary= {<b>{username}</b>}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >

              </Typography>
              {comment}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider  component="li" />

    </List>
  );
}