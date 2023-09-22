import { Avatar, AvatarGroup, Box, ImageList, ImageListItem, List, ListItem, ListItemText, Typography,ListItemAvatar, Divider } from '@mui/material'
import React from 'react'

export const RightBar = () => {
  return (
    <Box flex={2} p={2} sx={{display:{xs:'none',sm:'block'}}}>
         <Box position={"fixed"} width={330}>
            <Typography variant='h6' fontWeight={100}>
                Online Friends
            </Typography>
            <AvatarGroup max={10}>
            <Avatar alt="Remy Sharp" src="https://imageio.forbes.com/specials-images/imageserve/5c76b7d331358e35dd2773a9/0x0.jpg?format=jpg&crop=4401,4401,x0,y0,safe&height=416&width=416&fit=bounds" />
            <Avatar alt="Travis Howard" src="https://upload.turkcewiki.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg" />
            <Avatar alt="Cindy Baker" src="https://cdn.yeniakit.com.tr/images/news/625/steve-jobs-308c65.jpg" />
            <Avatar alt="Agnes Walker" src="https://pbs.twimg.com/profile_images/1674815862879178752/nTGMV1Eo_400x400.jpg" />
            <Avatar alt="Trevor Henderson" src="https://m.media-amazon.com/images/M/MV5BYTNlOGZhYzgtMmE3OC00Y2NiLWFhNWQtNzg5MjRhNTJhZGVmXkEyXkFqcGdeQXVyNzg5MzIyOA@@._V1_.jpg" />
            </AvatarGroup>
            <Typography variant='h6' fontWeight={100}mt={2}>
                Latest Photos
            </Typography>
            <ImageList cols={3} rowHeight={100} gap={3}>
            <ImageListItem > 
             <img
            src='https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'
            alt=''
             />
            </ImageListItem>
            <ImageListItem>
             <img
            src='https://images.unsplash.com/photo-1551782450-a2132b4ba21d'
            alt=''
             />
            </ImageListItem>
            <ImageListItem > 
             <img
            src='https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'
            alt=''
             />
            </ImageListItem>
            <ImageListItem>
             <img
            src='https://images.unsplash.com/photo-1551782450-a2132b4ba21d'
            alt=''
             />
            </ImageListItem>
            <ImageListItem > 
             <img
            src='https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'
            alt=''
             />
            </ImageListItem>
            <ImageListItem>
             <img
            src='https://images.unsplash.com/photo-1551782450-a2132b4ba21d'
            alt=''
             />
            </ImageListItem>
            </ImageList>
            <Typography variant='h6' fontWeight={100}mt={2}>
                Latest Conversations
            </Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://m.media-amazon.com/images/M/MV5BYTNlOGZhYzgtMmE3OC00Y2NiLWFhNWQtNzg5MjRhNTJhZGVmXkEyXkFqcGdeQXVyNzg5MzIyOA@@._V1_.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="https://imageio.forbes.com/specials-images/imageserve/5c76b7d331358e35dd2773a9/0x0.jpg?format=jpg&crop=4401,4401,x0,y0,safe&height=416&width=416&fit=bounds" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="https://cdn.yeniakit.com.tr/images/news/625/steve-jobs-308c65.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
         </Box>
    </Box>
  )
}
