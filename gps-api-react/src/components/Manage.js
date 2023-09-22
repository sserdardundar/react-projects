import { Alert, AlertTitle, Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { DeleteAccount, FreezeAccount } from './ReqWithAuth';

export const Manage = (props) => {
    const [wait, setWait] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setWait(false);
      }, 200);
    }, []);
    const {action}=useParams()
  return (
    <>
      {wait ? (
        <Box sx={{display:'flex', height:'90vh', width:'80vw'}} justifyContent='center' alignItems='center'>
            <CircularProgress />
        </Box>
      ) : props.tok ? (action==='delete'?
        <Box sx={{ height: "100%", display: "flex" }}>
          <DeleteAccount token={props.tok} />
        </Box>:action==='freeze'?<Box sx={{ height: "100%", display: "flex" }}>
          <FreezeAccount token={props.tok} />
        </Box>:null
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <Alert severity="error" sx={{ width: "20vw" }}>
            <AlertTitle>Error</AlertTitle>
            <strong>Please Log in</strong>
          </Alert>
        </Box>
      )}
    </>
  )
}
