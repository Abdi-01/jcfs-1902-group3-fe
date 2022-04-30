import axios from "axios"
import { API_URL } from "../../helper"

export const addCartAdminAction = (data) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('data')
            if (token) {
                let res = await axios.post(`${API_URL}/transactionwarehouse/addcartadmin`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    return { success: res.data.success }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const checkoutAdmin = (data) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('data')
            if (token) {
                let res = await axios.post(`${API_URL}/transactionwarehouse/checkoutadmin`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    return { success: res.data.success }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const getWarehouseAdmin = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('data')
            if (token) {
                let res = await axios.get(`${API_URL}/transactionwarehouse/getwarehouseadmin`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                dispatch({
                    type: 'GET_WAREHOUSE_ADMIN',
                    payload: res.data.warehouseAdmin
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}