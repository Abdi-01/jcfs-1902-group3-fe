import { combineReducers } from "redux";
import { kategoriReducer } from "./kategoriReducer";
import { userReducer } from "./userReducer";
import {materialReducer} from './materialReducer'
import {jenisProductReducer} from './jenisProductReducer'
import {productReducer} from './productReducer'
import {transactionReducer} from './transactionReducer'
import {transactionAdminReducer} from './transactionAdminReducer'
import {warehouseReducer} from './warehouseReducer'

export const rootReducers = combineReducers({
    userReducer,
    kategoriReducer,
    materialReducer,
    jenisProductReducer,
    productReducer,
    transactionReducer,
    transactionAdminReducer,
    warehouseReducer
})