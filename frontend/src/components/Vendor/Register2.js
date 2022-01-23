import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Register2 = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [shop, setShop] = useState("");
  const [timings, setTimings] = useState("");
  const [orders, setOrders] = useState(null);

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeContactNumber = (event) => {
    setContactNumber(event.target.value);
  };

  const onChangeShop = (event) => {
    setShop(event.target.value);
  };

  const onChangeTimings = (event) => {
    setTimings(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const resetInputs = () => {
    setEmail("");
    setPassword("");
    setName("");
    setContactNumber("");
    setShop("");
    setTimings("");
    setOrders(0);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      email: email,
      password: password,
      name: name,
      contactNumber: contactNumber,
      shop: shop,
      timings: timings,
      setOrders: 0,
    };

    axios
      .post("http://localhost:4000/user/register2", newUser)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      });

    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={onChangeUsername}
        />
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
          label="Contact Number"
          variant="outlined"
          value={contactNumber}
          onChange={onChangeContactNumber}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Shop"
          variant="outlined"
          value={shop}
          onChange={onChangeShop}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Timings"
          variant="outlined"
          value={timings}
          onChange={onChangeTimings}
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
          Register Vendor
        </Button>
      </Grid>
    </Grid>
  );
};

export default Register2;
