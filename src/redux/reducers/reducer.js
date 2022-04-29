import {ADD_DATA , SHOW_DATA, UPDATE_USER, GET_SINGLE_EDIT , DELETE_USER , VIEW_USER} from "../constans";


const initialState = {
    userData: [],
    user: {},
};

function userReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_DATA:
            return{
                ...state,
            };
        case SHOW_DATA:
            return {
                ...state,
                userData: action.payload
            };
        case UPDATE_USER:
            return {
                ...state,
            };
        case GET_SINGLE_EDIT:
            return {
                ...state,
                user: action.payload
            };
        case DELETE_USER:
            return {
                ...state,
            };
        case VIEW_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}

export default userReducer;