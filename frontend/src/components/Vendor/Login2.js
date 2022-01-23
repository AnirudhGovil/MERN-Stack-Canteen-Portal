import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const Login2 = (props) => {

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

  const onSubmit = (event) => {
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
        localStorage.setItem("timings", response.data.timings);
        alert("Login Successful");
        window.location = 'http://localhost:3000/VendorUI';
      });


    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>
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
        <Button variant="contained" onClick={onSubmit}>
          Vendor Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login2;
