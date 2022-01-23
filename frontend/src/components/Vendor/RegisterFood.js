import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";

const RegisterFood = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [shop, setShop] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [nonveg, setNonveg] = useState(false);
  const [tags, setTags] = useState(null);

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const onChangeRating = (event) => {
    setRating(event.target.value);
  };

  const onChangeNonveg = (event) => {
    setNonveg(event.target.value);
  };

  const onChangeShop = (event) => {
    setShop(event.target.value);
  };

  const resetInputs = () => {
    setEmail("");
    setShop("");
    setName("");
    setPrice("");
    setRating("");
    setNonveg("");
    setTags(null);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      email: email,
      shop: shop,
      name: name,
      price: price,
      rating: rating,
      nonveg: nonveg,
      tags: "",
    };

    axios
      .post("http://localhost:4000/user/registerFood", newUser)
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
          onChange={onChangeUsername}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Contact Number"
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
        <TextField
          label="Shop"
          variant="outlined"
          value={shop}
          onChange={onChangeShop}
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
