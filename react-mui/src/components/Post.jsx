import React, { useState } from 'react'
import { Facebook, Favorite, FavoriteBorder, MoreVert, Share, Twitter, WhatsApp,} from '@mui/icons-material'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, IconButton,Menu,MenuItem,Typography} from '@mui/material'

export const Post = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget); 
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  return (
    <div><Card sx={{margin:{xs:1,sm:9} }}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
          R
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVert />
        </IconButton>
      }
      title="John Doodle"
      subheader="September 14, 2023"
    />
    <CardMedia
      component="img"
      height="1%"
      image="https://images.pexels.com/photos/359992/pexels-photo-359992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      alt="Paella dish"
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        This impressive paella is a perfect party dish and a fun meal to cook
        together with your guests. Add 1 cup of frozen peas along with the mussels,
        if you like.
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
      <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color:'red'}}/>} />
      </IconButton>
      <IconButton aria-label="share" onClick={handleClick}>
        <Share/>
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{paper:
            {style: {
             borderRadius:20
            }}
           }}
      >
        <MenuItem onClick={handleClose}>Facebook<Facebook sx={{color:'darkblue'}}/></MenuItem>
        <MenuItem onClick={handleClose}>WhatsApp<WhatsApp sx={{color:'green'}}/></MenuItem>
        <MenuItem onClick={handleClose}>Twitter<Twitter sx={{color:'skyblue'}}/></MenuItem>
      </Menu>
    </CardActions>
  </Card></div>
  )
}
