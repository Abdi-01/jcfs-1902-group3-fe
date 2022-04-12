import axios from "axios"
import { API_URL } from "../../helper"

export const getWarehouseAction = () => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${API_URL}/warehouse`)
            if(res.data.success){
                dispatch({
                    type: 'GET DATA WAREHOUSE',
                    payload: res.data.dataWarehouse
                })
                return {success: res.data.success}
            }
        } catch (error) {
            console.log(error)
        }
    }
}