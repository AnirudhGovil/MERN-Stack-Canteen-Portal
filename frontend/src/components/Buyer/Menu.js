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
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";
import Fuse from 'fuse.js';


const Menu = (props) => {
    var hour1 = new Date();
    const hour = hour1.getHours();
    const [users, setUsers] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [sortPrice, setSortPrice] = useState(false);
    const [sortRating, setSortRating] = useState(false);
    const [sortAvailable, setSortAvailable] = useState(false);
    const [sortNonVeg, setSortNonVeg] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [query, setQuery] = useState('');
    const [minprice, setMinprice] = useState(0);
    const [maxprice, setMaxprice] = useState(0);

    const onChangeMinprice = (event) => {
        setMinprice(event.target.value);
      };

      const onChangeMaxprice = (event) => {
        setMaxprice(event.target.value);
      };

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
                    setFiltered(response.data);
                    setSearchText("");
                })
                .catch((error) => {
                    console.log(error);
                });

        }, []);

    useEffect(
        () => {
            let filteredItems = [];
            users.forEach(user => 
                {
                    if(minprice && maxprice)
                    {
                        if(user.price>minprice && user.price<maxprice)
                            filteredItems.push(user)
                    }
                    else
                        filteredItems.push(user)
            })
            
            const options = {
                isCaseSensitive: false,
                threshold: 0.4,
                keys: ["name"]
            };   
            
            
            if (query !== "")
            {
                const fuse = new Fuse(filtered, options);
                let temp = fuse.search(query);

                let arr = []
                temp.map(search => {
                    arr.push(search.item)
                })

                filteredItems = arr
            }


            
            setFiltered(filteredItems);
        }, [query, minprice, maxprice]);

    const orderFunction = (event) => {

        if (localStorage.getItem('wallet') >= event.price) {
            const newOrder = {
                itemName: event.name,
                buyerEmail: localStorage.getItem('email'),
                shop: event.shop,
                price: event.price,
                addOns: event.addOns,
                date: Date.now(),
                quantity: quantity,
                status: "PLACED",
            };
            console.log(newOrder)

            axios
                .post("http://localhost:4000/user/registerOrder", newOrder)
                .then((response) => {
                    alert(event.name + "\tOrdered");
                    localStorage.setItem("wallet", response.data.wallet);
                    window.location = ('http://localhost:3000/Menu')
                });
        }
        else {
            alert("Insufficient Funds");
        }
    };

    const sortChangePrice = () => {
        let result=[];
        let temp = filtered;
        const flag = sortPrice;
        if(flag==true)
            result = temp.sort((a, b) => a.price - b.price);
        if(flag==false)
            result = temp.sort((a, b) => b.price - a.price);
        setFiltered(result);
        setSortPrice(!flag);
    };

    const sortChangeRating = () => {
        let result=[];
        let temp = filtered;
        const flag = sortRating;
        if(flag==true)
            result = temp.sort((a, b) => a.rating - b.rating);
        if(flag==false)
            result = temp.sort((a, b) => b.rating - a.rating);
        setFiltered(result);
        setSortRating(!flag);
    };

    const sortChangeNonVeg = () => {
        let result1=[];
        let result2=[];
        let result3 = users;
        result3.forEach(food => {
            if(food.nonveg)
                result1.push(food);
            else
                result2.push(food);
        });
        let result =[];
        const flag = sortNonVeg;
        if(flag==true)
            result = [...result1,...result2];
        if(flag==false)
            result = [...result2];
        setFiltered(result);
        setSortNonVeg(!flag);
    };

    function available(food) {
        if((vendors.map(a => a.timings1)[vendors.map(a => a.shop).indexOf(food.shop)] > vendors.map(a => a.timings2)[vendors.map(a => a.shop).indexOf(food.shop)]))
            {
                return hour<(vendors.map(a => a.timings1)[vendors.map(a => a.shop).indexOf(food.shop)] || hour>vendors.map(a => a.timings2)[vendors.map(a => a.shop).indexOf(food.shop)])
            }

        else
            {
                return hour>(vendors.map(a => a.timings1)[vendors.map(a => a.shop).indexOf(food.shop)] || hour<vendors.map(a => a.timings2)[vendors.map(a => a.shop).indexOf(food.shop)])
            }
    };

    function veg(flag) {
        if(flag)
            return "non-veg"
        else
            return "veg"
    };

    const sortChangeAvailable = () => {
        let result1=[];
        let result2=[];
        let result3 = filtered;
        result3.forEach(food => {
            if(available(food))
                result1.push(food);
            else
                result2.push(food);
        });
        let result =[];
        const flag = sortAvailable;
        if(flag==true)
            result = [...result1,...result2];
        if(flag==false)
            result = [...result2,...result1];
        setFiltered(result);
        setSortAvailable(!flag);
    };



    

    return (
        <div>
            <Grid container spacing={2} >
                <Grid item xs={12} align={"right"} >
                    Wallet Amount = {`${localStorage.getItem('wallet')}`}
                </Grid>
                <Grid item xs={12} align={"center"} >
                    Menu
                </Grid>
                <Grid item xs={12} /*md={9} lg={9}*/ >
                <Grid container spacing={1}>
                    <Grid item xs={2.2} align={"left"}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={query}
                        onChange={event => setQuery(event.target.value)}
                    />
                    </Grid>
                    <Grid item xs={0.5} align={"left"}>
                    <TextField
                      label="Min Price"
                      variant="outlined"
                      value={minprice}
                      onChange={onChangeMinprice}
                    />
                    </Grid>
                    <Grid item xs={0.5} align={"left"}>
                    <TextField
                      label="Max Price"
                      variant="outlined"
                      value={maxprice}
                      onChange={onChangeMaxprice}
                    />
                    </Grid>
                    <Grid item xs={2} align={"right"}>
                        Non-Veg
                    <Checkbox
                        checked={!sortNonVeg}
                        onChange={sortChangeNonVeg}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Paper >
                        <Table size="small" >
                            <TableHead >
                                <TableRow >
                                    <TableCell >
                                        Sr No.
                                    </TableCell>
                                    <TableCell>
                                        Item
                                    </TableCell>
                                    <TableCell> 
                                        Price
                                        <Button onClick = {sortChangePrice} > { sortPrice ? < ArrowDownwardIcon/> : < ArrowUpwardIcon/> }</Button>

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
                                    <TableCell> 
                                        Rating
                                        <Button onClick = {sortChangeRating} > { sortRating ? < ArrowDownwardIcon/> : < ArrowUpwardIcon/> }</Button>
                                    </TableCell>
                                    <TableCell>
                                        Quantity
                                    </TableCell>
                                    <TableCell>
                                        Availability
                                        <Button onClick = {sortChangeAvailable} > { sortAvailable ? < ArrowDownwardIcon/> : < ArrowUpwardIcon/> }</Button>
                                    </TableCell>
                                </TableRow >
                            </TableHead>
                            <TableBody >
                                {
                                    filtered.map((food, ind) => (
                                        <TableRow key={ind} >
                                            <TableCell > {ind} </TableCell>
                                            <TableCell > {food.name} </TableCell>
                                            <TableCell > {food.price} </TableCell>
                                            <TableCell > {food.shop} </TableCell>
                                            <TableCell > {veg(food.nonveg)} </TableCell>
                                            <TableCell > {food.tags} </TableCell>
                                            <TableCell > {food.addOns} </TableCell>
                                            <TableCell >
                                                <Rating value={(food.rating.reduce(function (a, b) { return a + b; }, 0)) / food.rating.length} readOnly precision={0.1} />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    variant="outlined"
                                                    value={quantity}
                                                    onChange={onChangeQuantity}
                                                    style={{ width: 50 }}
                                                />
                                            </TableCell>
                                            <TableCell >
                                                <Button disabled={available(food)} onClick={()=>orderFunction(food)}>
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
        </Grid>
        </div>
    );
};

export default Menu;