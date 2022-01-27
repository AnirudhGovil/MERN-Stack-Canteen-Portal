import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
var type = 0;

const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const resetInputs = () => {
    setEmail("");
    setPassword("");
  };

  const onSubmit1 = (event) => {
    event.preventDefault();

    const newUser = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:4000/user/login", newUser)
      .then((response) => {
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("password", response.data.password);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("contactNumber", response.data.contactNumber);
        localStorage.setItem("age", response.data.age);
        localStorage.setItem("batch", response.data.batch);
        localStorage.setItem("wallet", response.data.wallet);
        alert("Login Successful");
        window.location = 'http://localhost:3000/BuyerUI';
      });


    resetInputs();
  };

  const onSubmit2 = (event) => {
    event.preventDefault();

    const newUser = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:4000/user/login2", newUser)
      .then((response) => {
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("password", response.data.password);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("contactNumber", response.data.contactNumber);
        localStorage.setItem("shop", response.data.shop);
        localStorage.setItem("timings1", response.data.timings1);
        localStorage.setItem("timings2", response.data.timings2);
        localStorage.setItem("orders", 0);
        localStorage.setItem("Top5",['none','none','none','none','none']);
        alert("Login Successful");
        window.location = 'http://localhost:3000/VendorUI';
      });


    resetInputs();
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid>
<br></br><br></br><br></br><br></br>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={onChangeEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          onChange={onChangePassword}
        />
      </Grid>

      <Grid item xs={12}>
      <Grid item xs={12}>
      <Button
            id="basic-button"
            color="inherit"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            LOGIN
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
            <MenuItem onClick={onSubmit1}>Buyer</MenuItem>
            <MenuItem onClick={onSubmit2}>Vendor</MenuItem>
          </Menu>
      </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
