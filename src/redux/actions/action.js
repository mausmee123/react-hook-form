import {ADD_DATA, SHOW_DATA, UPDATE_USER, GET_SINGLE_EDIT, DELETE_USER , VIEW_USER} from "../constans";
import axios from "axios";

const addedData = () => {
    return{
        type: ADD_DATA,
    }
};

const showData = (data1) => {
    return{
        type: SHOW_DATA,
        payload: data1
    }
};

const dataUpdated = () => {
    return {
        type: UPDATE_USER,
    }
};

const getUpdated = (user) => {
    return {
        type: GET_SINGLE_EDIT,
        payload: user,
    }
};

const userDeleted = () => {
    return {
        type: DELETE_USER,
    }
};

const viewUser = (user1) => {
    return {
        type: VIEW_USER,
        payload: user1,
    }
};





export const loadUsers = () => {
    // console.log("loadUser")
    return function (dispatch) {
        axios.get("http://localhost:3000/duser")
            .then((resp) => {
                console.log("resp", resp);
                dispatch(showData(resp.data))
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const addData = (user) => {
    return function (dispatch) {
        axios
            .post("http://localhost:3000/duser",user)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(addedData());
                dispatch(loadUsers());
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const dataUpdate = (user,id) => {
    return function (dispatch) {
        axios
            .put(`http://localhost:3000/duser/${id}`,user)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(dataUpdated());
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const getSingleEdit = (id) => {
    return function (dispatch) {
        axios
            .get(`http://localhost:3000/duser/${id}`)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(getUpdated(resp.data));

            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const deleteUser = (id) => {
    return function (dispatch) {
        axios
            .delete(`http://localhost:3000/duser/${id}`)
            .then(() => {
                dispatch(userDeleted());
                dispatch(loadUsers());

            })
            .catch((error) => {
                console.log(error);
            });
    };
};



export const userView = (id) => {
    return function (dispatch) {
        axios
            .get(`http://localhost:3000/duser/${id}`)
            .then((resp) => {
                console.log("userView", resp);
                dispatch(viewUser(resp.data));


            })
            .catch((error) => {
                console.log(error);
            });
    };
};