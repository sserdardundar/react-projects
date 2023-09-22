import { Box, Button, List } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import WalletIcon from "@mui/icons-material/Wallet";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

export const DrawerX = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "200px", bgcolor: "#212121" }}>
      <List style={{ marginTop: "20px", marginLeft: "20px" }}>
        <Button
          variant="text"
          size="large"
          sx={{ mb: "20px", color: "white" }}
          onClick={() => navigate("/home")}
        >
          <HomeIcon sx={{ marginRight: "5px" }} />
          Homepage
        </Button>
        <Button
          variant="text"
          size="large"
          sx={{ mb: "20px", color: "white" }}
          onClick={() => navigate("/userwallet")}
        >
          <WalletIcon sx={{ marginRight: "5px" }} />
          Wallet
        </Button>
        <Button
          variant="text"
          size="large"
          sx={{ mb: "20px", color: "white" }}
          onClick={() => navigate("/account")}
        >
          <SettingsIcon sx={{ marginRight: "5px" }} />
          Settings
        </Button>
      </List>
    </Box>
  );
};
