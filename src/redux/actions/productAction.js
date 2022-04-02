import axios from "axios";
import { API_URL } from "../../helper";

export const getProductAction = (kategori = null, material = null, jenisProduct = null, namaProduct = null) => {

    return async (dispatch) => {
        try {
            let res
            if (kategori) {
                if (material && jenisProduct && namaProduct) {
                    res = await axios.get(`${API_URL}/products?kategori=${kategori}&material=${material}&jenis_product=${jenisProduct}&nama=${namaProduct}`)
                } else if (material && jenisProduct) {
                    res = await axios.get(`${API_URL}/products?kategori=${kategori}&material=${material}&jenis_product=${jenisProduct}`)
                } else if (material && namaProduct) {
                    res = await axios.get(`${API_URL}/products?kategori=${kategori}&material=${material}&nama=${namaProduct}`)
                } else if (namaProduct) {
                    res = await axios.get(`${API_URL}/products?kategori=${kategori}&nama=${namaProduct}`)
                } else if (jenisProduct) {
                    res = await axios.get(`${API_URL}/products?kategori=${kategori}&jenis_product=${jenisProduct}`)
                } else if (material) {
                    res = await axios.get(`${API_URL}/products?kategori=${kategori}&material=${material}`)
                } else {
                    res = await axios.get(`${API_URL}/products?kategori=${kategori}`)
                }
            } else {
                res = await axios.get(`${API_URL}/products`)
            }

            if (res.data.success) {
                dispatch({
                    type: 'GET DATA PRODUCT',
                    payload: res.data.dataProduct
                })
                return { success: res.data.success, data: res.data.dataProduct }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const addProductAction = (data) => {
    return async (dispatch) => {
        try {
            let res = await axios.post(`${API_URL}/products`, data)

            if (res.data.success) {
                dispatch(getProductAction())
                return { success: res.data.success }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateProductAction = (idproduct, data) => {
    return async (dispatch) => {
        try {
            let res = await axios.patch(`${API_URL}/products/${idproduct}`, data)

            if (res.data.success) {
                dispatch(getProductAction())
                return { success: res.data.success }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateImgProductAction = (idimage, data) => {
    return async (dispatch) => {
        try {
            let res = await axios.patch(`${API_URL}/products/image/${idimage}`, data)
            if (res.data.success) {
                return { success: res.data.success }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteProductAction = (idproduct) => {
    return async (dispatch) => {
        try {
            let res = await axios.delete(`${API_URL}/products/${idproduct}`)
            if (res.data.success) {
                dispatch(getProductAction())
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const sortingProductAction = (sort = null, order = null) => {
    return async (dispatch) => {
        try {
            let res
            if (sort && order) {
                res = await axios.get(`${API_URL}/products?sort=${sort}&order=${order}`)
            } else {
                res = await axios.get(`${API_URL}/products`)
            }
            if (res.data.success) {
                dispatch({
                    type: 'GET DATA PRODUCT',
                    payload: res.data.dataProduct
                })
                return { success: res.data.success, data: res.data.dataProduct }
            }
        } catch (error) {
            console.log(error)
        }
    }
}