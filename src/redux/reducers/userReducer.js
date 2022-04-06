const INITIAL_STATE = {
    iduser: null,
    username: "",
    email: "",
    idrole: "",
    status: "",
    password: "",
    warehouse: "",
    gender: "",
    umur: "",
    no_telpon: "",
    photo: "",
    nama:""
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
                username: action.payload.username,
                email: action.payload.email,
                idrole: action.payload.idrole,
                status: action.payload.status,
                password: action.payload.password,
                warehouse: action.payload.warehouse,
                gender: action.payload.gender,
                umur: action.payload.umur,
                no_telpon: action.payload.no_telpon,
                photo: action.payload.photo,
                nama: action.payload.nama
            }
            case "UPDATE_CART_USER":
                return{...state,cart:action.payload}
        case "LOGOUT":
            return INITIAL_STATE
        default:
            return state
    }
}