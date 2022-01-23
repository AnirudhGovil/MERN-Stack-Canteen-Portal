import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";

const RegisterFood = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [nonveg, setNonveg] = useState(false);
  const [tags, setTags] = useState(null);

  const onChangeName = (event) => {
    setPrice(event.target.value);
  };

  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const onChangeNonveg = (event) => {
    setNonveg(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setPrice("");
    setNonveg("");
    setTags(null);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newFood = {
      email: localStorage.getItem('email'),
      shop: localStorage.getItem('shop'),
      name: name,
      price: Number(price),
      rating: Number(0),
      nonveg: nonveg,
      tags: "",
    };

    axios
      .post("http://localhost:4000/user/registerFood", newFood)
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
          label="Item Name"
          variant="outlined"
          value={name}
          onChange={onChangeName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Item Price"
          variant="outlined"
          value={price}
          onChange={onChangePrice}
        />
      </Grid>
      <Grid item xs={12}>
        Nonveg
        <Switch
          variant="outlined"
          value={nonveg}
          onChange={onChangeNonveg}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Register Food Item
        </Button>
      </Grid>
    </Grid>
  );
};

export default RegisterFood;
