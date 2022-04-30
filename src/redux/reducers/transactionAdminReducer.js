const INITIAL_STATE = {
    warehouseAdminList: []
}

export const transactionAdminReducer = (state = INITIAL_STATE, action) => {
    // SWITCH...CASE : digunakan untuk menentukan data dari action.payload untuk disimpan ke bagian STATE yang dituju berdasarkan action.type
    switch (action.type) {
        case "GET_WAREHOUSE_ADMIN":
            console.log("DATA DARI ACTION PAYLOAD==>", action.payload)
            return {
                ...state, warehouseAdminList: action.payload
            }
        default:
            return state
    }
}