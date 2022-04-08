import axios from "axios"
import { API_URL } from "../../helper"

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
            if (token) {
                let res = await axios.get(`${API_URL}/users/verify`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
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

export const getAddress = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('data')
            let res = await axios.get(`${API_URL}/users/getaddress`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: "GET_ADDRESS",
                payload: res.data.address
            })
        } catch (error) {
            console.log(error)
        }
    }
}