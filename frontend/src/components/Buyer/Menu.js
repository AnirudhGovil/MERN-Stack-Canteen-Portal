import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import Rating from "@mui/material/Rating";
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

const Menu = (props) => {
    var hour1 = new Date();
    const hour = hour1.getHours();
    const [users, setUsers] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [sortName, setSortName] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [quantity, setQuantity] = useState(1);
    const onChangeQuantity = (event) => {
        setQuantity(event.target.value);
      };
    const resetInputs = () => {
        setQuantity(0);
    };

    useEffect(
        () => {
            axios
            .get("http://localhost:4000/user/vendors")
            .then((response) => {
                setVendors(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
            axios
                .get("http://localhost:4000/user/getAllFoodItems")
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

    const orderFunction = (event) => {

        if(localStorage.getItem('wallet')>=event.price)
        {
        const newOrder = {
            itemName: event.name,
            buyerEmail: localStorage.getItem('email'),
            shop: event.shop,
            price: event.price,
            addOns : event.addOns,
            date : Date.now(),
            quantity : quantity,
            status : "PLACED",
        };
        console.log(newOrder)

        axios
            .post("http://localhost:4000/user/registerOrder", newOrder)
            .then((response) => {
                alert(event.name + "\tOrdered");
                localStorage.setItem("wallet", response.data.wallet);
                window.location=('http://localhost:3000/Menu')
            });
        }
        else
        {
            alert("Insufficient Funds");   
        }        
    };

    return( 
        <div>
        <Grid container align = { "center" } >
        <Grid item xs = { 12 } align = { "right" } >
        Wallet Amount = {`${localStorage.getItem('wallet')}`}
        </Grid> 
        <Grid><br></br></Grid>
        <Grid><br></br></Grid>
        <Grid item xs = { 12 } align = { "center" } >
        Menu 
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
            Item 
        </TableCell> 
        <TableCell> { " " } 
        <Button onClick = { sortChange } > { sortName ? < ArrowDownwardIcon/> : < ArrowUpwardIcon/> } 
        </Button>
        Price 
        </TableCell> 
        <TableCell> 
            Shop 
        </TableCell> 
        <TableCell > 
            Non - Veg 
        </TableCell> 
        <TableCell> 
            Tags 
        </TableCell> 
        <TableCell> 
            Add Ons 
        </TableCell>
        <TableCell> { " " } 
        <Button onClick = { sortChange } > { sortName ? < ArrowDownwardIcon/> : < ArrowUpwardIcon/> } 
        </Button>
            Rating 
        </TableCell> 
        <TableCell> 
        Quantity 
        </TableCell> 
        <TableCell> { " " } 
        <Button onClick = { sortChange } > { sortName ? < ArrowDownwardIcon/> : < ArrowUpwardIcon/> } 
        </Button>
        </TableCell> 
        </TableRow > 
        </TableHead> 
        <TableBody > 
            {
            users.map( (food, ind) => (
                <TableRow key = { ind } >
                <TableCell > { ind } </TableCell> 
                <TableCell > { food.name } </TableCell> 
                <TableCell > { food.price } </TableCell> 
                <TableCell > { food.shop } </TableCell> 
                <TableCell > { food.nonveg.toString() } </TableCell> 
                <TableCell > { food.tags } </TableCell> 
                <TableCell > { food.addOns } </TableCell> 
                <TableCell >  
                <Rating value={ (food.rating.reduce(function(a, b){return a + b;}, 0))/food.rating.length} readOnly precision={0.1} />
                </TableCell> 
                <TableCell>
                <TextField
                    variant="outlined"
                    value={quantity}
                    onChange={onChangeQuantity}
                    style={{width:50}}
                />
                </TableCell>
                <TableCell >
                <Button disabled={(vendors.map(a=>a.timings1)[vendors.map(a=>a.shop).indexOf(food.shop)] > hour || vendors.map(a=>a.timings2)[vendors.map(a=>a.shop).indexOf(food.shop)] < hour)} onClick = {() => orderFunction(food)}>
                Order 
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

export default Menu;