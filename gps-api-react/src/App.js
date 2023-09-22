import React from "react";
import Router from "./Router";
import AppBars from "./components/AppBars";
import { Box, useMediaQuery } from "@mui/material";
import { DrawerX } from "./components/Drawer";
import { IconDrawer } from "./components/IconDrawer";
import { BottomNavigator } from "./components/BottomNavigator";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const drawerToggle = useMediaQuery("(min-width:600px)");
  const status = useMediaQuery("(min-width:1200px)");
  const [tok, setTok] = useState("");
  const [name,setName]=useState('')

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100vw" }}>
        <Box position={"fixed"} top={0} zIndex={1000} sx={{ width: "100vw" }}>
          <AppBars setTok={setTok} name={name} setName={setName} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: drawerToggle ? "row" : "column",
            height: "100vh",
            width: "100vw",
          }}
        >
          {drawerToggle ? (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                mt: "6vh",
                height:'100%',
                zIndex: 900,
                display: "flex",
              }}
            >
              {status ? <DrawerX /> : <IconDrawer />}
            </Box>
          ) : (
            <Box sx={{ ml:'6vw',mt: "6vh"}}>
            <Router tok={tok} name={name} setName={setName}/>
            </Box>
          )}
          {drawerToggle ? (
            <Box sx={{ ml: status ? "225px" : "100px", mt: "6vh"}}>
              <Router tok={tok} name={name} setName={setName}/>
            </Box>
          ) : (
            <BottomNavigator />
          )}
        </Box>
      </Box>
    </>
  );
}
export default App;
