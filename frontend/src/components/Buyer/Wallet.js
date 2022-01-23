import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const Wallet = (props) => {

  const [amount, setAmount] = useState("");

  const onChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  const resetInputs = () => {
    setAmount(0);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const addAmount = {
      email: localStorage.getItem('email'),
      wallet: amount,
    };

    axios
      .post("http://localhost:4000/user/wallet", addAmount)
      .then((response) => {
        localStorage.setItem("wallet", response.data.wallet);
        window.location = 'http://localhost:3000/Wallet';
      });
    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
      Current Amount = {`${localStorage.getItem('wallet')}`}
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Amount to be Added"
          variant="outlined"
          value={amount}
          onChange={onChangeAmount}
        />
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Add Amount
        </Button>
      </Grid>
    </Grid>
  );
};

export default Wallet;
