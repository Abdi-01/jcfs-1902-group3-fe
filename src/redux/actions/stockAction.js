import axios from "axios"
import { API_URL } from "../../helper"

export const getStock = (nama) => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${API_URL}/stock/sum?nama=${nama}`)
            console.log('isi stock', res.data)
            if(res.data.success) {
                return {success: res.data.success, data: res.data.dataTotalStock}
            }
        } catch (error) {
            console.log(error)
        }
    }
}