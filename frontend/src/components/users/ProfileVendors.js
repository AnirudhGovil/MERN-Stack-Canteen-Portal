import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
const emailID = localStorage.getItem('currentUser');

const ProfileVendors = (props) => {

  axios
    .get("http://localhost:4000/user/profilechange")
    .then((response) => {
      alert("Success");
      console.log(response.data);
    
    });

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [shop, setShop] = useState("");
  const [timings, setTimings] = useState("");

  const onChangeUsername = (event) => {
    setName(event.target.value);
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
    setPassword("");
    setName("");
    setContactNumber("");
    setShop("");
    setTimings("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      email: localStorage.getItem('currentUser'),
      password: password,
      name: name,
      contactNumber: contactNumber,
      shop: shop,
      timings: timings,
    };

    axios
      .post("http://localhost:4000/user/register2", newUser)
      .then((response) => {
        alert("Success");
        console.log(response.data);
      });

    resetInputs();
  };

  return (

    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        {`${emailID}`}
      </Grid>
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
          label="Contact Number"
          variant="outlined"
          value={contactNumber}
          onChange={onChangeContactNumber}
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
          label="Timings"
          variant="outlined"
          value={shop}
          onChange={onChangeShop}
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
          Make Changes Vendor
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProfileVendors;
