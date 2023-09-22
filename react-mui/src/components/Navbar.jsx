import React, { useState } from 'react'
import { AppBar, Avatar, Badge, Box, InputBase, Menu, MenuItem, Toolbar ,Typography,styled} from '@mui/material'
import { Mail, Notifications, Pets } from '@mui/icons-material'

const StyledToolbar= styled(Toolbar)({
	backgroundColor:'#14171A',
  display:'flex',
  justifyContent:'space-between'
})

const Search= styled('div')(({theme})=>({
	backgroundColor:'gray',
	color:'black',
	padding:'0 10px',
	borderRadius:theme.shape.borderRadius,
	width:'30%'
}))
const Icons= styled(Box)(({theme})=>({
	display:'none', gap:'20px', alignItems:'center' ,[theme.breakpoints.up('sm')]:{
		display:'flex'
	}
}))
const UserBox= styled(Box)(({theme})=>({
	display:'flex', gap:'10px', alignItems:'center',[theme.breakpoints.up('sm')]:{
		display:'none'
	}
}))

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position='sticky'>
      <StyledToolbar>
	<Typography variant='h6' sx={{display:{xs:'none', sm :'block' },color:'white'}}>SSD</Typography>
    <Pets sx={{display:{xs:'block',sm:'none'}}}/>
	<Search><InputBase placeholder='Search...'/></Search>
    <Icons>
	<Badge badgeContent={4} color="error" >
  		<Mail sx={{color:'white'}} />
	</Badge>
	<Badge badgeContent={4} color="error" >
		<Notifications sx={{color:'white'}}/>
	</Badge>
<Avatar src='https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' sx={{width:30,height:30}}
	 onClick={handleClick}
	 />
</Icons >
<UserBox onClick={handleClick}>
<Avatar src='https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' sx={{width:30,height:30}} />
<Typography variant='span'>John</Typography>
</UserBox>
</StyledToolbar>
<Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      </AppBar>
  );
}

export default Navbar