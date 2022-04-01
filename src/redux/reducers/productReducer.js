const INITIAL_STATE = {
    listProduct: []
}

export const productReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET DATA PRODUCT':
            console.log("data dari action payload ==>", action.payload)
            return{
                ...state,
                listProduct: action.payload
            }
    
        default:
            return state;
    }
}