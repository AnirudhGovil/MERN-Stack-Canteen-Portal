import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Statistics = (props) => {

  const [users, setUsers] = useState([]);

  const onCompleted = (event) => {

    const shopID = {
      shop: localStorage.getItem('shop')
    };

    axios
      .post("http://localhost:4000/user/completedOrders", shopID)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("completedOrders",response.data.length);
        window.location = 'http://localhost:3000/Statistics';
      });
    
  };

  const onPending = (event) => {

    const shopID = {
      shop: localStorage.getItem('shop')
    };

    axios
      .post("http://localhost:4000/user/currentlyPlacedOrders", shopID)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("currentlyPlacedOrders",response.data.length);
        
      });

      axios
      .post("http://localhost:4000/user/cookingOrders", shopID)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("cookingOrders",response.data.length);
        
      });

      axios
      .post("http://localhost:4000/user/toBePickedUpOrders", shopID)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("yetToBePickedOrders",response.data.length);
        window.location = 'http://localhost:3000/Statistics';  
      });
      
  };

  const onAccepted = (event) => {

    const shopID = {
      shop: localStorage.getItem('shop')
    };

    axios
      .post("http://localhost:4000/user/totalOrders", shopID)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("totalOrders",response.data.length);
        localStorage.setItem("OrdersArray",response.data)
        window.location = 'http://localhost:3000/Statistics';
      });
    
  };

  const onTop5 = (event) => {

    const shopID = {
      shop: localStorage.getItem('shop')
    };

    axios
    .get("http://localhost:4000/user/getOrders")
    .then((response) => {
      setUsers(JSON.stringify(response.data));
      console.log(JSON.stringify(response.data))
    });
    console.log(users);
    localStorage.setItem("Top5",users);
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
      Statistics
      </Grid>

      <Grid item xs={12}>
      <Button onClick={onCompleted} >
      Completed Orders
      </Button>
      </Grid>
      <Grid item xs={12}>
      {`${localStorage.getItem('completedOrders')}`}
      </Grid>
      <Grid item xs={12}>
      <Button onClick={onPending} >
      Pending Orders
      </Button>
      </Grid>
      <Grid item xs={12}>
      Currently Placed : {`${localStorage.getItem('currentlyPlacedOrders')}`}
      </Grid>
      <Grid item xs={12}>
      Currently Cooking : {`${localStorage.getItem('cookingOrders')}`}
      </Grid>
      <Grid item xs={12}>
      To Be Picked Up : {`${localStorage.getItem('yetToBePickedOrders')}`}
      </Grid>

      <Grid item xs={12}>
      <Button onClick={onAccepted} >
      Total Orders Received
      </Button>
      </Grid>
      <Grid item xs={12}>
      {`${localStorage.getItem('totalOrders')}`}
      </Grid>

      <Grid item xs={12}>
      <Button onClick={onTop5} >
      Top Items Ordered
      </Button>
      </Grid>
      <Grid item xs={12}>
      {`${localStorage.getItem('Top5')}`}
      </Grid>

    </Grid>
  );
};

export default Statistics;
