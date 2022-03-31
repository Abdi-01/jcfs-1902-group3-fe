import axios from "axios";
import { API_URL } from "../../helper";

export const getProductAction = () => {

    return async (dispatch) => {
        try {
            let res = await axios.get(`${API_URL}/products`)

            dispatch({
                type: 'GET DATA PRODUCT',
                payload: res.data.dataProduct
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const addProductAction = (data) => {
    return async (dispatch) => {
        try {
            let res = await axios.post(`${API_URL}/products`, data)
            
            if (res.data.success) {
                dispatch(getProductAction())
                return {success: res.data.success}
            }
        } catch (error) {
            console.log(error)
        }
    }
}