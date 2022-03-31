import { combineReducers } from "redux";
import {kategoriReducer} from './kategoriReducer'
import {materialReducer} from './materialReducer'
import {jenisProductReducer} from './jenisProductReducer'


export const rootReducers = combineReducers({
    kategoriReducer,
    materialReducer,
    jenisProductReducer
})