import {AddAPhoto, Add as AddIcon, Attachment, EmojiEmotions, Image, ScheduleSend }from '@mui/icons-material'
import { Avatar, Box, Button, ButtonGroup, Fab,Modal, Stack, TextField, Tooltip, Typography, styled} from '@mui/material'
import React, { useState } from 'react'

const StyledModal=styled(Modal)({
    display:'flex',
    alignItems:'center',
    justifyContent:"center"
})
const UserBox=styled(Box)({
    display:'flex',
    alignItems:'center',
    gap:'20px',
    marginBottom:'20px'
})
export const Add = () => {
    const [open,setOpen]= useState(false)
  return (
    <>
    <Tooltip title="Add" sx={{position:'fixed', bottom:20, left:{xs:'calc(100% - 65px)',sm:30}}} onClick={(e)=>{setOpen(true)}}>
    <Fab color="primary" aria-label="add" >
        <AddIcon/>
    </Fab>
    </Tooltip>
    <StyledModal
      open={open}
      onClose={(e)=>{setOpen(false)}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box width={400} height={200} bgcolor={'background.default'} color='text.primary' borderRadius={10} p={5} >
        <Typography variant='h6' color={'gray'} textAlign={'center'}> Create Content</Typography>
        <UserBox>
        <Avatar src='https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' sx={{width:30,height:30}} />
        <Typography fontWeight={500} variant='span'>John Doodle</Typography>
        </UserBox>
        <TextField
        sx={{width:'calc(100% - 15px)'}}
          id="standard-multiline-static"
          multiline
          rows={2}
          placeholder='What d u think??'
          variant="standard"
        />
        <Stack direction={'row'} gap={3} mt={2} mb={3}>
            <AddAPhoto color='g1'/>
            <Image color='g2'/>
            <EmojiEmotions color='g3'/>
            <Attachment color='g4'/>
        </Stack>
        <ButtonGroup variant="contained" sx={{width:'100%'}} >
          <Button sx={{width:'90%'}} >Post</Button>
          <Button title='Schedule Post'><ScheduleSend/></Button>
        </ButtonGroup>
      </Box>
    </StyledModal>
    </>
  )
}
