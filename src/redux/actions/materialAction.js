import axios from "axios";
import { API_URL } from "../../helper";

export const getMaterialAction = () => {

    return async (dispatch) => {
        try {
            let res = await axios.get(`${API_URL}/material`)
            dispatch({
                type: 'GET DATA MATERIAL',
                payload: res.data.dataMaterial
            })
        } catch (error) {
            console.log(error)
        }
    }
}