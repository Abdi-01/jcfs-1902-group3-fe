import axios from "axios"
import { API_URL } from "../../helper"
import { getTransactionAction } from "./transactionAction"
import { getWarehouseAdmin } from "./transactionAdminAction"

export const onLogin = (email, password) => {
    return async (dispatch) => {
        try {

            let response = await axios.post(`${API_URL}/users/login`, {
                email, password
            })
            if (response.data.success) {
                localStorage.setItem("data", response.data.dataLogin.token)
                // dispatch : meneruskan data kereducer
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data.dataLogin
                })
                dispatch(getTransactionAction(6))
                dispatch(getWarehouseAdmin())
                return { success: response.data.success }
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const verifyAction = () => {
    return async (dispatch) => {
        try {
            let token = window.location.pathname.split('/')[2]
            console.log("token", token)
            if (token) {
                let res = await axios.get(`${API_URL}/users/verify`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                console.log("asdasdsad",res.data)
                if (res.data.success) {
                    localStorage.setItem("data", res.data.dataVerify.token)
                    // dispatch : meneruskan data ke reducer
                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: res.data.dataVerify
                    })
                    return { success: res.data.success }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const keepLoginAction = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem(`data`);
            if (token) {
                let res = await axios.get(`${API_URL}/users/keeplogin`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    localStorage.setItem("data", res.data.dataLogin.token)
                    // dispatch : meneruskan data kereducer
                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: res.data.dataLogin
                    })
                    dispatch(getTransactionAction(6))
                    dispatch(getWarehouseAdmin())
                    return { success: res.data.success }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const logOutAction = () => {
    return {
        type: "LOGOUT"
    }
}

export const onRegis = (nama, username, email, password) => {
    return async (dispatch) => {
        try {
            let res = await axios.post(`${API_URL}/users`, {
                nama,
                username,
                email,
                password,
                status: "Active",
            })
            dispatch({
                type: "REGIS_SUCCESS",
                payload: res.data,
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const newPassword = (password) => {
    return async (dispatch) => {
        try {
            let token = window.location.pathname.split('/')[2]
            console.log("token", token)
            let res = await axios.post(`${API_URL}/users/newpassword`, { password }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.data.success) {
                console.log("res.data ", res.data)
                localStorage.setItem("data", res.data.dataReset.token)
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data.dataReset
                })
                return { success: res.data.success }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getAddress = (idstatus = null) => {
    return async (dispatch) => {
        try {
            let res
            let token = localStorage.getItem('data')
            if (idstatus) {
                res = await axios.get(`${API_URL}/users/getaddress?idstatus=${idstatus}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            } else {
                res = await axios.get(`${API_URL}/users/getaddress`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            }
            if(res.data.success){
                dispatch({
                    type: "GET_ADDRESS",
                    payload: res.data.address
                })

                return {success: res.data.success, data: res.data.address}
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const getWarehouse = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('data')
            let res = await axios.get(`${API_URL}/admin/getwarehouse`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(`dispatch getwarehouse`,res.data.warehouse)
            dispatch({
                type: "GET_WAREHOUSE",
                payload: res.data.warehouse
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export const getAdmin = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('data')
            let res = await axios.get(`${API_URL}/admin/getadmin`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: "GET_ADMIN",
                payload: res.data.getAdmin
            })
        } catch (error) {
            console.log(error)
        }
    }
}