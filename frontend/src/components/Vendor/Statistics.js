import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Switch from "@mui/material/Switch";



const Statistics = (props) => {

  const [orders, setOrders] = useState([]);
  const [items, setFoodItems] = useState([]);
  const [topSoldItems, setTopSoldItems] = useState([]);
  const [Temp,setTemp] = useState(false); 

  useEffect(
    () => {

    const shopID = {
      shop: localStorage.getItem('shop')
    };

    axios
      .post("http://localhost:4000/user/completedOrders", shopID)
      .then((response) => {
        //console.log(response.data);
        localStorage.setItem("completedOrders",response.data.length);
        /*window.location = 'http://localhost:3000/Statistics';*/
      });
    
    axios
    .get("http://localhost:4000/user/getOrders", {
    headers: { 'shop':localStorage.getItem('shop')}})
    .then((response) => {
      setOrders(response.data)
      
    });

    axios
    .get("http://localhost:4000/user/getFoodItems", {
    headers: { 'shop':localStorage.getItem('shop')}})
    .then((response) => {
      setFoodItems(response.data);
      
    })
    .catch((error) => {
        //console.log(error);
    });

    axios
      .post("http://localhost:4000/user/currentlyPlacedOrders", shopID)
      .then((response) => {
        //console.log(response.data);
        localStorage.setItem("currentlyPlacedOrders",response.data.length);
        
      });

      axios
      .post("http://localhost:4000/user/cookingOrders", shopID)
      .then((response) => {
        //console.log(response.data);
        localStorage.setItem("cookingOrders",response.data.length);
        
      });

      axios
      .post("http://localhost:4000/user/toBePickedUpOrders", shopID)
      .then((response) => {
        //console.log(response.data);
        localStorage.setItem("yetToBePickedOrders",response.data.length);
        /*window.location = 'http://localhost:3000/Statistics';*/  
      });

      axios
      .post("http://localhost:4000/user/totalOrders", shopID)
      .then((response) => {
        //console.log(response.data);
        localStorage.setItem("totalOrders",response.data.length);
        localStorage.setItem("OrdersArray",response.data)
        /*window.location("http://localhost:3000/Statistics")*/
      });

    let topSold = [];
        for(let i = 0 ; items[i] != undefined ; i++)
        {
            let count = 0;
            for(let j = 0 ; orders[j] != undefined ; j++)
                if(orders[j].itemName == items[i].name && orders[j].status == "COMPLETED")
                    count+=orders[j].quantity;
            topSold.push({
                name: items[i].name,
                numSold: count
            })
        }
        
        topSold.sort((a,b) => {
            if(a.numSold <= b.numSold)
                return 1;
            else
                return 0;
        });

        let temp = [];
        for(let i = 0 ; i < 5 && topSold[i] != undefined ; i++)
            if(topSold[i].numSold > 0)
                temp.push(topSold[i].name);

        localStorage.setItem("Top5-1",JSON.parse(JSON.stringify(temp))[0]);
        localStorage.setItem("Top5-2",JSON.parse(JSON.stringify(temp))[1]);
        localStorage.setItem("Top5-3",JSON.parse(JSON.stringify(temp))[2]);
        localStorage.setItem("Top5-4",JSON.parse(JSON.stringify(temp))[3]);
        localStorage.setItem("Top5-5",JSON.parse(JSON.stringify(temp))[4]);
        
      },[orders]);

  return (
    <Grid container align={"center"} spacing={2}>
       <Grid item xs={12}>
      <h1>Calculate Stats</h1>
      </Grid>
      <Grid item xs={12}> 
      <h3>Completed Orders : {`${localStorage.getItem('completedOrders')}`}</h3>
      </Grid>
      <Grid item xs={12}>
      <h3>Pending Orders</h3>
      <h4>Currently Placed : {`${localStorage.getItem('currentlyPlacedOrders')}`}</h4>
      <h4>Currently Cooking : {`${localStorage.getItem('cookingOrders')}`}</h4>
      <h4>To Be Picked Up : {`${localStorage.getItem('yetToBePickedOrders')}`}</h4>
      </Grid>
      <Grid item xs={12}>
   
      </Grid>
      <Grid item xs={12}>
      <h3>Total Orders Received :  {`${localStorage.getItem('totalOrders')}`}</h3>
      </Grid>
      <Grid item xs={12}>
      <h3>Top Items Ordered</h3>
      {`${localStorage.getItem('Top5-1')}`}  
      <br></br>
      {`${localStorage.getItem('Top5-2')}`}  
      <br></br>
      {`${localStorage.getItem('Top5-3')}`}  
      <br></br>
      {`${localStorage.getItem('Top5-4')}`}  
      <br></br>
      {`${localStorage.getItem('Top5-5')}`}  
      <br></br>
      </Grid>
    </Grid>
  );
};

/*


*/

export default Statistics;
