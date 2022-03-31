import axios from "axios";
import { API_URL } from "../../helper";


export const getKategoriAction = () => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${API_URL}/kategori`)
            dispatch({
                type: 'GET DATA KATEGORI',
                payload: res.data.dataKategori
            })

        } catch (error) {
            console.log(error)
        }
    }
}