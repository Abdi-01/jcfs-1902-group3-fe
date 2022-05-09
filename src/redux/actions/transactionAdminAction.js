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

export const getProductAdminAction = (search) => {

    return async (dispatch) => {
        try {
            let token = localStorage.getItem('data')
            let res;
            if (token) {
                if (search) {
                    if (search.idwarehouse) {
                        res = await axios.get(`${API_URL}/transactionwarehouse?idwarehouse=${search.idwarehouse}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                    }
                } else {
                    res = await axios.get(`${API_URL}/transactionwarehouse`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                }
                dispatch({
                    type: 'GET_DATA_PRODUCT_ADMIN',
                    payload: res.data.dataProduct
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getRequest = (search = null) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('data')
            let res
            if (token) {
                if (search) {
                    if (search.idstatus) {
                        res = await axios.get(`${API_URL}/transactionwarehouse/getrequest?idstatus=${search.idstatus}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                    } else if (search.fromDate && search.toDate) {
                        res = await axios.get(`${API_URL}/transactionwarehouse/getrequest?fromDate=${search.fromDate}&toDate=${search.toDate}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                    } else {
                        res = await axios.get(`${API_URL}/transactionwarehouse/getrequest`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                    }
                } else {
                    res = await axios.get(`${API_URL}/transactionwarehouse/getrequest`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                }
                dispatch({
                    type: 'GET_DATA_REQUEST',
                    payload: res.data.dataRequest
                })
                return { success: res.data.success, data: res.data.dataRequest }
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const outgoingRequest = (search = null) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('data')
            let res
            if (token) {
                if (search) {
                    if (search.idstatus) {
                        res = await axios.get(`${API_URL}/transactionwarehouse/outgoingrequest?idstatus=${search.idstatus}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                    } else if (search.fromDate && search.toDate) {
                        res = await axios.get(`${API_URL}/transactionwarehouse/outgoingrequest?fromDate=${search.fromDate}&toDate=${search.toDate}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                    } else {
                        res = await axios.get(`${API_URL}/transactionwarehouse/outgoingrequest`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                    }
                } else {
                    res = await axios.get(`${API_URL}/transactionwarehouse/outgoingrequest`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                }
                dispatch({
                    type: 'GET_OUTGOING_REQUEST',
                    payload: res.data.dataRequest
                })
                return { success: res.data.success, data: res.data.dataRequest }
            }

        } catch (error) {
            console.log(error)
        }
    }
}
// export const getRequest = () => {
//     return async (dispatch) => {
//         try {
//             let token = localStorage.getItem('data')
//             if (token) {
//                 let res = await axios.get(`${API_URL}/transactionwarehouse/getrequest`, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 })
//                 dispatch({
//                     type: 'GET_DATA_REQUEST',
//                     payload: res.data.dataRequest
//                 })
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }