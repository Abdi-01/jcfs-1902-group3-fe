import { combineReducers } from "redux";
import {kategoriReducer} from './kategoriReducer'
import {materialReducer} from './materialReducer'
import {jenisProductReducer} from './jenisProductReducer'
import {productReducer} from './productReducer'
import { userReducer } from "./userReducer";


export const rootReducers = combineReducers({
    userReducer,
    kategoriReducer,
    materialReducer,
    jenisProductReducer,
    productReducer
})