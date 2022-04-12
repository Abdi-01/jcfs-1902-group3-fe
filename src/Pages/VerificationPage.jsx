import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Navigate } from "react-router"
import { Button } from "reactstrap"
import { API_URL } from "../helper"
import { verifyAction } from "../redux/actions"

import React from 'react';

class VerificationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    verify = async () => {
        try {
            // let res = await dispatch(verifyAction())
            console.log("tes res asdsdasdasdasdwqesad")
            // if(res){
            //     setRedirect(true)
            // }
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        return (
            <div>

                <Button type='button' onClick={this.verify}>Verifikasi Akun</Button>

            </div>
        );
    }
}

export default VerificationPage;

// const VerificationPage = (props) => {
//     const [redirect, setRedirect] = useState(false);
//     const dispatch = useDispatch()
    // const verify = async () => {
    //     try {
    //         // let res = await dispatch(verifyAction())
    //         console.log("tes res asdsdasdasdasdwqesad")
    //         // if(res){
    //         //     setRedirect(true)
    //         // }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
//     // if (redirect) {
//     //    return <Navigate to='/' />
//     // }
//     return (
//         <div>
//             <Button type='button' onClick={verify}>Verifikasi Akun</Button>
//         </div>
//     )
// }
// export default VerificationPage