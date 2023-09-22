import React, { useState } from 'react'
import  SideBar  from './components/SideBar';
import { RightBar } from './components/RightBar';
import { Feed } from './components/Feed';
import {Box, Stack, ThemeProvider, createTheme } from '@mui/material';
import  Navbar  from './components/Navbar';
import { Add } from './components/Add';


function App() {
    const [mode,setMode]=useState('light')
    const darkTheme=createTheme({
        palette:{
            mode:mode,
            primary:{
                main:'#00acee',
            },
            success:{
                main:'#FFFC00'
            },
            g1:{
                main:"#4285F4"
            },
            g2:{
                main:"#DB4437"
            },
            g3:{
                main:"#F4B400"
            },
            g4:{
                main:"#0F9D58"
            }
        }
    })
  return (
    <ThemeProvider theme={darkTheme}>
    <Box bgcolor={'background.default'} color='text.primary'>
	<Navbar/>
	<Stack direction={'row'} spacing={3}  justifyContent={'space-evenly'}>
	    <SideBar setMode={setMode} mode={mode}/>
	    <Feed/>
	    <RightBar/>
	</Stack>
    <Add/> 
	</Box>
    </ThemeProvider>
  ); 
}

export default App;
