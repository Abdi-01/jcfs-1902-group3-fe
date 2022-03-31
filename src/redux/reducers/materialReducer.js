const INITIAL_STATE = {
    listMaterial : []
}

export const materialReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET DATA MATERIAL':
            console.log("data dari action payload ==>", action.payload)
            return{
                ...state,
                listMaterial: action.payload
            }
    
        default:
            return state
    }
}