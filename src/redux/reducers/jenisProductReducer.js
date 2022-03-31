const INITIAL_STATE = {
    listJenisProduct: []
}

export const jenisProductReducer = (state=INITIAL_STATE,action) => {
    switch (action.type) {
        case 'GET DATA JENIS PRODUCT':
            return {
                ...state,
                listJenisProduct: action.payload
            }
    
        default:
            return state
    }
}