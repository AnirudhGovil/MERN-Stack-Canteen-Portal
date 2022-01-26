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

const Orders = (props) => {
  const [users, setUsers] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [sortName, setSortName] = useState(true);
    const [searchText, setSearchText] = useState("");
    useEffect(
        () => {
            axios
                .get("http://localhost:4000/user/getOrders")
                .then((response) => {
                    setUsers(response.data);
                    setSortedUsers(response.data);
                    setSearchText("");
                })
                .catch((error) => {
                    console.log(error);
                });
        }, []);

    const sortChange = () => {
        let usersTemp = users;
        const flag = sortName;
        usersTemp.sort((a, b) => {
            if (a.date != undefined && b.date != undefined) {
                return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
            } else {
                return 1;
            }
        });
        setUsers(usersTemp);
        setSortName(!sortName);
    };

    const editFunction = (event) => {
        const newOrder = {
            buyerEmail: event.buyerEmail,
            date : event.date,
            status : event.status
        };

        axios
            .post("http://localhost:4000/user/pickOrder", newOrder)
            .then((response) => {
                alert(response.data.itemName + "\tPicked Up");
                console.log(response.data);
                window.location=('http://localhost:3000/MyOrders')
            });
        
        
    };


    return ( 
        <div>
        <Grid container align = { "center" } >
        <Grid item xs = { 12 } align = { "center" } >
        Orders for {`${localStorage.getItem('shop')}`}
        </Grid> 
        <Grid><br></br></Grid>
        <Grid><br></br></Grid>
        <Grid><br></br></Grid>
        <Grid item xs = { 12 } /*md={9} lg={9}*/ >
        <Paper >
        <Table size = "small" >
        <TableHead >
        <TableRow >
        <TableCell > 
            Sr No. 
        </TableCell> 
        <TableCell>
                    {" "}
                    <Button onClick={sortChange}>
                      {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>
                    Date
                  </TableCell>
        <TableCell>
          Item Name 
        </TableCell> 
        <TableCell> { " " } 
        <Button onClick = { sortChange } > { sortName ? < ArrowDownwardIcon/> : < ArrowUpwardIcon/> } 
        </Button>
         Add Ons
        </TableCell> 
        <TableCell> 
         Shop
        </TableCell> 
        <TableCell> 
         Quantity
        </TableCell> 
        <TableCell> 
        Status        
        </TableCell> 
        </TableRow > 
        </TableHead> 
        <TableBody > 
            {
            users.map((order, ind) => (
                 <TableRow key = { ind } >
                <TableCell > { ind } </TableCell> 
                <TableCell > { order.date } </TableCell> 
                <TableCell > { order.itemName } </TableCell> 
                <TableCell > { order.addOns } </TableCell> 
                <TableCell > { order.shop } </TableCell> 
                <TableCell > { order.quantity } </TableCell> 
                <TableCell > { order.status} </TableCell> 
                <TableCell>
                <Button  disabled={order.status.localeCompare("READY FOR PICKUP")} onClick = {() => editFunction(order)} >
                PICK UP
                </Button> 
                </TableCell > 
                </TableRow>
            ))}
        </TableBody> 
        </Table> 
        </Paper> 
    </Grid > 
    </Grid>  
    </div>
    );
};

export default Orders;