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


const RegisterFood = (props) => {
    const [users, setUsers] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [sortName, setSortName] = useState(true);
    const [searchText, setSearchText] = useState("");
    useEffect(
        () => {
            axios
                .get("http://localhost:4000/user/getFoodItems")
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


    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [nonveg, setNonveg] = useState(Boolean(0));
    const [tags, setTags] = useState("");
    const [addOns, setAddOns] = useState("");

    const onChangeName = (event) => {
        setName(event.target.value);
    };

    const onChangePrice = (event) => {
        setPrice(event.target.value);
    };

    const onChangeTags = (event) => {
        setTags(event.target.value);
    };

    const onChangeNonveg = (event) => {
        setNonveg(event.target.value = true);
    };

    const onChangeAddOns = (event) => {
        setAddOns(event.target.value);
    };

    const resetInputs = () => {
        setName("");
        setPrice("");
        setNonveg("");
        setTags("");
        setAddOns("");
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const newFood = {
            name: name,
            shop: localStorage.getItem('shop'),
            price: price,
            rating: Number(0),
            nonveg: nonveg,
            tags: [tags],
            addOns: [addOns]
        };

        console.log(newFood);

        axios
            .post("http://localhost:4000/user/registerFood", newFood)
            .then((response) => {
                alert("Created\t" + response.data.name);
                console.log(response.data);
                window.location=('http://localhost:3000/RegisterFood')
            });

        resetInputs();
        
    };  

    const editFunction = (event) => {
        localStorage.setItem('foodItem',event.name)
        localStorage.setItem('shop', localStorage.getItem('shop'))
        localStorage.setItem('price',event.price)
        localStorage.setItem('nonveg',event.nonveg)
        localStorage.setItem('tags',event.tags)
        localStorage.setItem('addOns',event.addOns)
        window.location=('http://localhost:3000/FoodEdit')
    };

    const deleteFunction = (event) => {
        const newFood = {
            name: event.name,
        };

        axios
            .post("http://localhost:4000/user/deletefood", newFood)
            .then((response) => {
                alert("Deleted\t" + response.data.name);
                console.log(response.data);
                window.location=('http://localhost:3000/RegisterFood')
            });
        
        
    };


    return ( 
        <div>
    <Grid container align = { "center" }spacing = { 2 } >
        <Grid item xs = { 12 } >
        Add New Item to Menu </Grid>  
        <Grid item xs = { 12 } >
        <TextField label = "Item Name" variant = "outlined" value = { name } onChange = { onChangeName }/> 
        </Grid > 
        <Grid item xs = { 12 } >
        <TextField label = "Item Price" variant = "outlined" value = { price } onChange = { onChangePrice }/> 
        </Grid > 
        <Grid item xs = { 12 } > 
        Nonveg 
        <Switch variant = "outlined" value = { nonveg } onChange = { onChangeNonveg }/> 
        </Grid > 
        <Grid item xs = { 12 } >
        <TextField label = "Item Tags" variant = "outlined" value = { tags } onChange = { onChangeTags }/> 
        </Grid > 
        <Grid item xs = { 12 } >
        <TextField label = "Item Add Ons" variant = "outlined" value = { addOns } onChange = { onChangeAddOns }/> 
        </Grid > 
        <Grid item xs = { 12 } >
        <Button variant = "contained" onClick = { onSubmit } >
        Register Food Item 
        </Button> 
        </Grid > 
        </Grid> 
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Grid container align = { "center" } >
        <Grid item xs = { 12 } align = { "center" } >
        Edit Menu 
        </Grid> 
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
        </TableRow > 
        </TableHead> 
        <TableBody > 
            {
            users.map((food, ind) => (
                 <TableRow key = { ind } >
                <TableCell > { ind } </TableCell> 
                <TableCell > { food.name } </TableCell> 
                <TableCell > { food.price } </TableCell> 
                <TableCell > { food.shop } </TableCell> 
                <TableCell > { food.nonveg.toString() } </TableCell> 
                <TableCell > { food.tags } </TableCell> 
                <TableCell > { food.addOns } </TableCell> 
                <TableCell >
                <Button onClick = {() => editFunction(food)} >
                Edit 
                </Button> 
                </TableCell > 
                <TableCell >
                <Button onClick = {() => deleteFunction(food)} >
                Delete 
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

export default RegisterFood;