import axios from "axios";
import { API_URL } from "../../helper";

export const getJenisProductAction = (idkategori = null) => {
    return async (dispatch) => {
        try {
            let res
            if (idkategori) {
                 res = await axios.get(`${API_URL}/jenis/products?kategori=${idkategori}`)
                
            } else {
                 res = await axios.get(`${API_URL}/jenis/products`)

            }
            dispatch({
                type: 'GET DATA JENIS PRODUCT',
                payload: res.data.dataJenisProduct
            })

            return {success: res.data.success}
        } catch (error) {
            console.log(error)
        }
    }
}