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
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Canteen Portal
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* <Button color="inherit" onClick={() => navigate("/users")}>
            Users
          </Button> */}

          <Button
            id="basic-button"
            color="inherit"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Register
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => navigate("/register")}>Buyer</MenuItem>
            <MenuItem onClick={() => navigate("/register2")}>Vendor</MenuItem>
          </Menu>

          <Button
            id="basic-button-2"
            color="inherit"
            aria-controls={open2 ? 'basic-menu-2' : undefined}
            aria-haspopup="true"
            aria-expanded={open2 ? 'true' : undefined}
            onClick={handleClick2}
          >
            Login
          </Button>
          <Menu
            id="basic-menu-2"
            anchorEl={anchorEl2}
            open={open2}
            onClose={handleClose2}
            MenuListProps={{
              'aria-labelledby': 'basic-button-2',
            }}
          >
            <MenuItem onClick={() => navigate("/login")}>Buyer Login</MenuItem>
            <MenuItem onClick={() => navigate("/login2")}>Vendor Login</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
