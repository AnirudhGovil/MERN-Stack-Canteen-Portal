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
import Rating from "@mui/material/Rating";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Switch from "@mui/material/Switch";

const MyOrders = (props) => {
  const [users, setUsers] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [sortName, setSortName] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [newValue, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };
    
    useEffect(
        () => {
            axios
                .get("http://localhost:4000/user/getMyOrders",{
                    headers: {
                        'buyeremail':localStorage.getItem('email')
                    }
                })
                .then((response) => {
                    setUsers(response.data);
                    setSortedUsers(response.data);
                    setSearchText("");
                    console.log(JSON.stringify(response.data))
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
            });
            handleClickOpen();
    };

    const rateFunction = (event) => {
        const rateOrder = {
            foodItem : event.foodItem,
            rating : event.rating
        };
        console.log(rateOrder)

        axios
            .post("http://localhost:4000/user/rateOrder", rateOrder)
            .then((response) => {
                console.log(response.data);
                window.location=('http://localhost:3000/MyOrders')
            });
        
        
    };


    return ( 
        <div>
        <Grid container align = { "center" } >
        <Grid item xs = { 12 } align = { "center" } >
        Orders for {`${localStorage.getItem('name')}`}
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
        <TableCell> 
     
        </TableCell>
        <TableCell> 
     
        </TableCell>
        <TableCell> 
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
                <Button  disabled={order.status.localeCompare("READY FOR PICKUP")} onClick = {() => editFunction(order)}  >
                PICK UP
                </Button> 
                </TableCell > 
                
                <Dialog open={open} onClose={handleClose}>
        <DialogTitle>RATE</DialogTitle>
        <DialogActions>
        <Rating
                name="simple-controlled"
                onChange={(event, newValue) => {
                    setValue(newValue);
                    console.log(newValue);
                }
                } 
                />
        <Button id="bt" onClick = {() => rateFunction({foodItem : order.itemName, rating : newValue})} >
                SUBMIT</Button>
        </DialogActions>
      </Dialog>
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

export default MyOrders;