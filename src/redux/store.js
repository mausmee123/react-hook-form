import {createStore, combineReducers , applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import userReducer from "./reducers/reducer"


const combineReducer = combineReducers({
    user: userReducer
});

const store = createStore(
    combineReducer,
    {},
    applyMiddleware(thunkMiddleware)
);

export default store;

