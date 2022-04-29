import React, {useEffect} from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import {makeStyles} from "@mui/styles";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, loadUsers} from "../redux/actions/action";
import Button from "@mui/material/Button";

const useStyles = makeStyles({
    root: {
        border: "2px solid #e4e4e4",
        borderRadius: 3,
        padding: '20px',
        width: '50%',
        margin: '20px auto',
        textAlign: 'center',
    },
});

const FormData = (props) => {
    const classes = useStyles(props);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(loadUsers());
    }, []);

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    };

    return (
        <div className={classes.root}>
        <TableContainer component={Paper} >
            <h2>React Hook Form</h2>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Gender</TableCell>
                        <TableCell align="center">Age</TableCell>
                        <TableCell align="center">City</TableCell>
                        <TableCell align="center">Slider</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                    users.userData.map((user) => (
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={user.id}>
                            <TableCell component="th" scope="row" align="center">
                                {user.name}
                            </TableCell>
                            <TableCell align="center">{user.email}</TableCell>
                            <TableCell align="center">{user.gender}</TableCell>
                            <TableCell align="center">{user.age}</TableCell>
                            <TableCell align="center">{user.city}</TableCell>
                            <TableCell align="center">{user.slider}</TableCell>
                            <TableCell>

                                <Button variant="contained" onClick={() => navigate(`/formValid/${user.id}`)}>Edit</Button>
                                <Button variant="contained" sx={{ mx: 1 }} onClick={() => handleDelete(user.id)}>delete</Button>
                                <Button variant="contained" onClick={() => navigate(`/viewData/${user.id}`)}>View</Button>
                            </TableCell>
                        </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
            <Button variant="contained" sx={{ my: 1.5 }} onClick={() => navigate("/")}>Add user</Button>
    </div>
    );
};

export default FormData;