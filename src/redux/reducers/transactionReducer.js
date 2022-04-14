const INITIAL_STATE = {
    carts: [],
    transaksi: []
}

export const transactionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET DATA CART':
            console.log("data dari action payload ==>", action.payload)
            return {
                ...state,
                carts: action.payload
            }
        case 'GET DATA TRANSAKSI':
            return {
                ...state,
                transaksi: action.payload
            }
        default:
            return state;
    }
}