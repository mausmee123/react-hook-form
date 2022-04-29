import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import { makeStyles } from '@mui/styles';
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {addData, dataUpdate, getSingleEdit} from "../redux/actions/action";

const useStyles = makeStyles({
    root: {
        border: 1,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        padding: '20px',
        width: '500px',
        margin: '20px auto',
        "& > *": {
            margin: '1px',
            width: "100%",
        },
    },
});

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    gender: yup.string().required(),
    city: yup.array().min(1),
    age: yup.string().required(),
    slider: yup.number().min(50).max(60),
});

function FormValid() {

    const classes = useStyles();

    const [user, setUser] = useState({
        name: "",
        email: "",
        gender: "",
        age:"",
        city: [],
        slider:""
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { id } = useParams();

    const users = useSelector((state) => state.user);
    //console.log("users",users.user)
    useEffect(()=>{
        if(id){
            dispatch(getSingleEdit(id));
        }
    },[])


    const { name, email, age, slider, city , gender } = user;

    console.log("user",user)
    const OnchangeInput = e => {
        const {name,value,checked} = e.target;
        if (name === "city"){
            if (checked) {
                user.city.push(value);
                setUser({...user});
            } else {
                let index = user.city.indexOf(value);
                user.city.splice(index,1);
                setUser({...user});
            }
        }
        else {
            setUser({...user, [e.target.name]:e.target.value })
        }
    };

    useEffect(() => {
        if(id) {
            setUser(users.user)
        }
    }, [users.user]);


    const onSubmitHandler = (e) => {

        if (id) {
            dispatch(dataUpdate(user, id));
        } else {
            dispatch(addData(user));
        }
        navigate("/formData");
        reset();
    };

    const { register, handleSubmit, formState: { errors } , reset} = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <div>

            <form onSubmit={handleSubmit(e => onSubmitHandler(e))} className={classes.root}>
                <h2>React Hook Form</h2>
                <br/>

                <TextField
                    type="text"
                    label="Name"
                    variant="standard"
                    value={name}
                    {...register('name', {onChange: (e) => OnchangeInput(e)})}
                />

                <p>{errors.name?.message}</p>
                <br/><br/>

                <TextField
                    type="email"
                    label="Email"
                    variant="standard"
                    name="email"
                    value={email}
                    {...register('email', {onChange: (e) => OnchangeInput(e)})}
                />
                <p>{errors.email?.message}</p>
                <br/><br/>

                <FormControl>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="gender"
                        value={gender}
                    >
                        <FormControlLabel value="female" {...register('gender', {onChange: (e) => OnchangeInput(e)})} control={<Radio />} label="Female" />
                        <FormControlLabel value="male" {...register('gender', {onChange: (e) => OnchangeInput(e)})} control={<Radio />} label="Male" />
                        <FormControlLabel value="other" {...register('gender', {onChange: (e) => OnchangeInput(e)})} control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                <p>{errors.gender && 'At least one redio must be selected'}</p>
                <br/><br/>

                <FormControl>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        name="age"
                        value={age}
                        {...register('age', {onChange: (e) => OnchangeInput(e)})}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <p>{errors.age?.message}</p>
                <br/><br/>

                <FormGroup value={city}>
                    <FormLabel id="demo-row-radio-buttons-group-label">City</FormLabel>
                    <FormControlLabel {...register('city', {onChange: (e) => OnchangeInput(e)})} control={<Checkbox  name="city" checked={city && city.includes("Label1")} value="Label1" />}  label="Label1" />
                    <FormControlLabel {...register('city', {onChange: (e) => OnchangeInput(e)})} control={<Checkbox  name="city" checked={city && city.includes("Label2")} value="Label2" />}  label="Label2" />
                </FormGroup>
                <p>{errors.city && 'At least one checkobox must be selected'}</p>
                <br/>


                <Slider
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    name="slider"
                    value={slider}
                    {...register('slider', {onChange: (e) => OnchangeInput(e)})}
                />
                <p>{errors.slider?.message}</p>
                <br/>

                <Button type="submit" variant="contained">Submit</Button>
                <Button sx={{ my: 1.5 }} variant="contained" onClick={() => navigate("/FormData")}>Table</Button>
            </form>
        </div>
    );
}

export default FormValid;
