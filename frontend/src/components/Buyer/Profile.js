import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react";

const Profile = (props) => {


  const handleChange = (event) => {
    setBatch(event.target.value);
  };


  const [name, setName] = useState(localStorage.getItem('name'));
  const [password, setPassword] = useState(localStorage.getItem('password'));
  const [contactNumber, setContactNumber] = useState(localStorage.getItem('contactNumber'));
  const [age, setAge] = useState(localStorage.getItem('age'));
  const [batch, setBatch] = useState(localStorage.getItem('batch'));

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeContactNumber = (event) => {
    setContactNumber(event.target.value);
  };

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const onChangeBatch = (event) => {
    setBatch(event.target.value);
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
      age: age,
      batch: batch,
      wallet: localStorage.getItem('wallet')
    };

    axios
      .post("http://localhost:4000/user/userprofile", newUser)
      .then((response) => {
        alert("Success");
        localStorage.setItem("password", response.data.password);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("contactNumber", response.data.contactNumber);
        localStorage.setItem("age", response.data.age);
        localStorage.setItem("batch", response.data.batch);
        localStorage.setItem("wallet", response.data.wallet);
        console.log(response.data);
        window.location = 'http://localhost:3000/profile';
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
          //defaultValue={`${localStorage.getItem('name')}`}
          value={name}
          onChange={onChangeUsername}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Contact Number"
          variant="outlined"
          value={contactNumber}
          //defaultValue={`${localStorage.getItem('contactNumber')}`}
          onChange={onChangeContactNumber}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Age"
          variant="outlined"
          value={age}
          //defaultValue= {`${localStorage.getItem('age')}`}
          onChange={onChangeAge}
        />
      </Grid>
      <Grid item xs={12}>
      <Box sx={{ maxWidth: 246 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Batch</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={batch}
          label="Batch"
          onChange={onChangeBatch}
        >
          <MenuItem value={"UG1"}>UG1</MenuItem>
          <MenuItem value={"UG2"}>UG2</MenuItem>
          <MenuItem value={"UG3"}>UG3</MenuItem>
          <MenuItem value={"UG4"}>UG4</MenuItem>
          <MenuItem value={"UG5"}>UG5</MenuItem>
        </Select>
      </FormControl>
    </Box>
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
          Make Changes Buyer
        </Button>
      </Grid>
    </Grid>
  );
};

export default Profile;
