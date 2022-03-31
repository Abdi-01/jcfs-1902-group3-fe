const INITIAL_STATE = {
    listKategori: []
}

export const kategoriReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET DATA KATEGORI':
            // console.log("data dari action payload ==>", action.payload)
            return{
                ...state,
                listKategori: action.payload
            }
    
        default:
            return state
    }

}