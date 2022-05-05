const INITIAL_STATE = {
    warehouseAdminList: [],
    productAdminList:[],
    requestList:[]
}

export const transactionAdminReducer = (state = INITIAL_STATE, action) => {
    // SWITCH...CASE : digunakan untuk menentukan data dari action.payload untuk disimpan ke bagian STATE yang dituju berdasarkan action.type
    switch (action.type) {
        case "GET_WAREHOUSE_ADMIN":
            console.log("DATA DARI ACTION PAYLOAD==>", action.payload)
            return {
                ...state, warehouseAdminList: action.payload
            }
        case "GET_DATA_PRODUCT_ADMIN":
            console.log("DATA DARI ACTION PAYLOAD==>", action.payload)
            return {
                ...state, productAdminList: action.payload
            }
        case "GET_DATA_REQUEST":
            console.log("DATA DARI ACTION PAYLOAD==>", action.payload)
            return {
                ...state, requestList: action.payload
            }
        default:
            return state
    }
}