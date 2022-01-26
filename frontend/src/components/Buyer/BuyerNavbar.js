import * as React from 'react';
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/BuyerUI")}
          >
            Buyer Portal
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/Menu")}>
           Menu 
          </Button>
          <Button color="inherit" onClick={() => navigate("/MyOrders")}>
           My Orders 
          </Button>
          <Button color="inherit" onClick={() => navigate("/Wallet")}>
           My Wallet 
          </Button>
          <Button color="inherit" onClick={() => navigate("/profile")}>
           My Profile
          </Button>
          <Button color="inherit" onClick={() => {
            localStorage.clear();
            navigate("/");
            }}>
           Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
