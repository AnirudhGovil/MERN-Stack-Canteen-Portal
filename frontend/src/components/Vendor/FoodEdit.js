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

const FoodEdit = (props) => {

    const [name, setName] = useState(localStorage.getItem('foodname'));
    const [price, setPrice] = useState(localStorage.getItem('price'));
    const [addOns, setAddOns] = useState(localStorage.getItem('addOns'));
    const [nonveg, NonVeg] = useState(localStorage.getItem('nonveg'));
    const [tags, setTags] = useState(localStorage.getItem('tags'));

    const onChangeUsername = (event) => {
        setName(event.target.value);
    };

    const onChangeAddOns = (event) => {
        setAddOns(event.target.value);
    };

    const onChangeNonveg = (event) => {
        NonVeg(event.target.value=true);
    };

    const onChangeTags = (event) => {
        setTags(event.target.value);
    };

    const onChangePrice = (event) => {
        setPrice(event.target.value);
    };


    const onSubmit = (event) => {
        event.preventDefault();

        const newFood = {
            name: localStorage.getItem('foodItem'),
            shop: localStorage.getItem('shop'),
            price: price,
            rating: Number(0),
            nonveg: nonveg,
            tags: tags.split(","),
            addOns: [addOns]
        };

        axios
            .post("http://localhost:4000/user/editfood", newFood)
            .then((response) => {
                alert("Success");
                console.log(response.data);
                localStorage.setItem('price',response.data.price)
                localStorage.setItem('nonveg',response.data.nonveg)
                localStorage.setItem('tags',response.data.tags)
                localStorage.setItem('addOns',response.data.addOns)
                window.location = 'http://localhost:3000/RegisterFood';
            });
    };

    return (
<div>
        <Grid container align = { "center" } spacing = { 2 }>
        <Grid item xs = { 12 } > { `${localStorage.getItem('foodItem')}` } </Grid> 
        <Grid item xs = { 12 } >
        <TextField label = "Add Ons"
        variant = "outlined"
        value = { addOns }
        //defaultValue= {`${localStorage.getItem('addOns')}`}
        onChange = { onChangeAddOns }/> 
        </Grid > 
        <Grid item xs = { 12 } >
        <TextField label = "Tags"
        variant = "outlined"
        value = { tags }
        //defaultValue= {`${localStorage.getItem('tags')}`}
        onChange = { onChangeTags }/> 
        </Grid> 
        <Grid item xs = { 12 } > 
        Nonveg 
        <Switch variant = "outlined" value = { nonveg } onChange = { onChangeNonveg }/> 
        </Grid > 
        <Grid item xs = { 12 } >
        <TextField label = "Price"
        variant = "outlined"
        value = { price }
        //defaultValue= {`${localStorage.getItem('price')}`}
        onChange = { onChangePrice }
        /> 
        </Grid > 
        <Grid item xs = { 12 } >
        <Button variant = "contained" onClick = { onSubmit } >
        Make Changes Vendor 
        </Button> 
        </Grid >
        </Grid> 
        </div>
    );
};

export default FoodEdit;