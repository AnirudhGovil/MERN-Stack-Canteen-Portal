import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
const emailID = localStorage.getItem('currentUser');

const ProfileVendors = (props) => {

  const [name, setName] = useState(localStorage.getItem('name'));
  const [password, setPassword] = useState(localStorage.getItem('password'));
  const [contactNumber, setContactNumber] = useState(localStorage.getItem('contactNumber'));
  const [shop, setShop] = useState(localStorage.getItem('shop'));
  const [timings1, setTimings1] = useState(localStorage.getItem('timings1'));
  const [timings2, setTimings2] = useState(localStorage.getItem('timings2'));

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeContactNumber = (event) => {
    setContactNumber(event.target.value);
  };

  const onChangeShop = (event) => {
    setShop(event.target.value);
  };

  const onChangeTimings1 = (event) => {
    setTimings1(event.target.value);
  };

  const onChangeTimings2 = (event) => {
    setTimings2(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };


  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      email: localStorage.getItem('email'),
      password: password,
      name: name,
      contactNumber: contactNumber,
      shop: shop,
      timings1: timings1,
      timings2: timings2,
      orders: localStorage.getItem('orders')
    };

    axios
      .post("http://localhost:4000/user/vendorprofile", newUser)
      .then((response) => {
        alert("Success");
        localStorage.setItem("password", response.data.password);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("contactNumber", response.data.contactNumber);
        localStorage.setItem("shop", response.data.shop);
        localStorage.setItem("timings1", response.data.timings1);
        localStorage.setItem("timings2", response.data.timings2);
        console.log(response.data);
        window.location = 'http://localhost:3000/profilevendors';
      });
  };

  return (

    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        {`${localStorage.getItem('email')}`}
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          //defaultValue= {`${localStorage.getItem('name')}`}
          onChange={onChangeUsername}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Contact Number"
          variant="outlined"
          value={contactNumber}
          //defaultValue= {`${localStorage.getItem('contactNumber')}`}
          onChange={onChangeContactNumber}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Opening Timing"
          variant="outlined"
          value={timings1}
          //defaultValue= {`${localStorage.getItem('timings')}`}
          onChange={onChangeTimings1}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Closing Timing"
          variant="outlined"
          value={timings2}
          //defaultValue= {`${localStorage.getItem('timings')}`}
          onChange={onChangeTimings2}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Shop"
          variant="outlined"
          value={shop}
          //defaultValue= {`${localStorage.getItem('shop')}`}
          onChange={onChangeShop}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          //defaultValue= {`${localStorage.getItem('password')}`}
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
