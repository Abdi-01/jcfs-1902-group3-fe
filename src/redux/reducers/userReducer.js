const INITIAL_STATE = {
    iduser: null,
    idaddress: "",
    username: "",
    email: "",
    idrole: "",
    idstatus: "",
    password: "",
    warehouse: "",
    gender: "",
    umur: "",
    no_telpon: "",
    photo: "",
    nama: "",
    addressList: []    
}

// Func userReducer : utk mereturn data dari action.payload agar dapat disimpan oleh STATE REDUCER
export const userReducer = (state = INITIAL_STATE, action) => {
    // SWITCH...CASE : digunakan untuk menentukan data dari action.payload untuk disimpan ke bagian STATE yang dituju berdasarkan action.type
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log("DATA DARI ACTION PAYLOAD==>", action.payload)
            return {
                ...state,
                iduser: action.payload.iduser,
                idaddress: action.payload.idaddress,
                username: action.payload.username,
                email: action.payload.email,
                idrole: action.payload.idrole,
                idstatus: action.payload.idstatus,
                password: action.payload.password,
                idwarehouse: action.payload.idwarehouse,
                gender: action.payload.gender,
                umur: action.payload.umur,
                no_telpon: action.payload.no_telpon,
                photo: action.payload.photo,
                nama: action.payload.nama
            }
        case "UPDATE_CART_USER":
            return { ...state, cart: action.payload }
        case "GET_ADDRESS":
            console.log("GET_ADDRESS REDUCER", action.payload)
            return {
                ...state, addressList: action.payload
            }
        case "LOGOUT":
            return INITIAL_STATE
        default:
            return state
    }
}