import { combineReducers } from "redux";
import { kategoriReducer } from "./kategoriReducer";
import { userReducer } from "./userReducer";

export const rootReducers = combineReducers({
    userReducer,
    kategoriReducer
})