const INITIAL_STATE = {
    listWarehouse: []
}

export const warehouseReducer = (state =INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET DATA WAREHOUSE':
            return {
                ...state,
                listWarehouse: action.payload
            }
    
        default:
            return state;
    }
}