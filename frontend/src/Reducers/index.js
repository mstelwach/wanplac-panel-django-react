import {combineReducers} from "redux";
import reservations from "./reservation";
import errors from "./errors";
import messages from "./messages";


export default combineReducers({
    reservations,
    errors,
    messages
})