import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import {kategoriReducer} from './kategoriReducer'
import {materialReducer} from './materialReducer'
import {jenisProductReducer} from './jenisProductReducer'
import {productReducer} from './productReducer'
import {transactionReducer} from './transactionReducer'

export const rootReducers = combineReducers({
    userReducer,
    kategoriReducer,
    materialReducer,
    jenisProductReducer,
    productReducer,
    transactionReducer
})