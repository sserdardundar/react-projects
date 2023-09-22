import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import WalletIcon from "@mui/icons-material/Wallet";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export const BottomNavigator = (props) => {
  const [value, setValue] = React.useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    const path= window.location.pathname
    const paths = path.split('/')
    setValue(paths[1])
},[])
  return (
    <Box sx={{ width: "100vw", position: "fixed", mt: "93.5vh" }} top={0} zIndex={1000}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction value={'home'} label="Home"  onClick={() => navigate("/home")} icon={<HomeIcon />} />
        <BottomNavigationAction value={'userwallet'} label="Wallet" onClick={() => navigate("/userwallet")} icon={<WalletIcon />} />
        <BottomNavigationAction value={'account'} label="Settings"  onClick={() => navigate("/account")} icon={<SettingsIcon />} />
      </BottomNavigation>
    </Box>
  );
};
