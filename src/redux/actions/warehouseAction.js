import axios from "axios"
import { API_URL } from "../../helper"

export const getWarehouseAction = (search = null) => {
    return async (dispatch) => {
        try {
            let res
            if(search){
                res = await axios.get(`${API_URL}/warehouse?latitude=${search.latitude}&longitude=${search.longitude}`)
            } else {
                res = await axios.get(`${API_URL}/warehouse`)
            }
            if(res.data.success){
                dispatch({
                    type: 'GET DATA WAREHOUSE',
                    payload: res.data.dataWarehouse
                })
                return {success: res.data.success, data: res.data.dataWarehouse}
            }
        } catch (error) {
            console.log(error)
        }
    }
}