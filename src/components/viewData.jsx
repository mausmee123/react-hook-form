import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {userView} from "../redux/actions/action";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    root: {
        padding: '20px',
        width: '400px',
        margin: '20px auto',
    },
});

const ViewData = () => {

    const classes = useStyles();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { id } = useParams();

    const users = useSelector((state) => state.user);
    console.log("users",users.user)

    const {user} = users

    useEffect(() => {
        dispatch(userView(id));
    }, [ id ]);


    return(
        <div className={classes.root}>

            <Card sx={{ minWidth: 275 }} key={user.id}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        name: {user.name}
                    </Typography>
                    <Typography variant="h5" component="div">
                        email: {user.email}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        gender: {user.gender}
                    </Typography>
                    <Typography variant="body2">
                        age: {user.age}
                    </Typography>
                    <Typography sx={{ my: 1.5 }} variant="body2">
                        city: {user.city}
                    </Typography>
                    <Typography variant="body2">
                        slider: {user.slider}
                    </Typography>
                </CardContent>
            </Card>
            <Button variant="contained" sx={{ my: 1.5 }} onClick={() => navigate("/")}>Back</Button>
        </div>
    );
};

export default ViewData;