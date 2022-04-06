import axios from 'axios';
import React from 'react';
import { API_URL } from '../helper';
import { FormGroup, Label, Input, Button, InputGroup, InputGroupText } from "reactstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            passShow: <AiOutlineEyeInvisible />,
            passType: "password",
         }
    }

    showPass = () => {
        if (this.state.passType == "password") {
            this.setState({
                passShow: <AiOutlineEye />,
                passType: "text"
            })
        } else {
            this.setState({
                passShow: <AiOutlineEyeInvisible />,
                passType: "password"
            })
        }
    }

    btRegis = () => {
        if (this.username.value === "") {
            alert("Username empty")
        } else if (this.email.value === "") {
            alert("email empty")
        } else if (this.password.value === "") {
            alert("password empty")
        } else {
                if (this.email.value.includes("@")) {
                    axios.post(`${API_URL}/users/register`, {
                        username: this.username.value,
                        email: this.email.value,
                        password: this.password.value,                        
                    }).then((response) => {
                        alert("register success ✔")
                    }).catch((error) => {
                        console.log(error)
                    })
                } else {
                    alert("email didnt contain @")
                }
        }
    }
    // btRegis = () => {
    //     if (this.usernameRegis.value == "" || this.emailRegis.value == "" || this.passwordRegis.value == "") {
    //         alert("Fill all data first❗")
            
    //     } else {
    //         axios.post(`${API_URL}/users/register`, {
    //             idrole: 3,
    //             idwarehouse: null,
    //             nama: "user",
    //             gender: "pria",
    //             username: this.usernameRegis.value,
    //             email: this.emailRegis.value,
    //             password: this.passwordRegis.value,
    //             umur: 0,
    //             no_telpon: 0,
    //             photo: "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
    //             alamat: "bsd",
    //             status: "Active"
    //         }).then((res) => {
    //             alert(`${this.usernameRegis.value}, Registration Complete✔`)
    //             // return <Navigate to="/login-page" />

    //         }).catch((error) => {
    //             console.log(error)
    //         })
    //     }

    // }

    render() { 
        return ( 

            <div>
               
                <div className="shadow container" style={{ width: "70vw" }}>
                    <div className="row">
                        <div className="col-5 row-3 mt-10" >
                            <img src="https://i.postimg.cc/Xvk7wJyH/undraw-Mobile-payments-re-7udl.png" style={{ width: 500, marginTop: 60, marginLeft: 100 }} />
                        </div>
                        <div className="col-6 pl-5" style={{ paddingTop: 80, paddingLeft: 175, marginBottom: 50 }}>

                            <p style={{ fontWeight: "bold", color: "#5A5A5A3", fontSize: 30, marginLeft: 75 }}>REGISTER </p>
                            <FormGroup style={{ marginTop: -15 }}>
                                <Label for="textUsername">Username</Label>
                                <Input type="text" id="textEmail" placeholder="Input Username"
                                    innerRef={(element) => this.username = element}
                                    style={{ width: 300 }} />
                            </FormGroup>
                            <FormGroup style={{ marginTop: -15 }}>
                                <Label for="textEmail">Email</Label>
                                <Input type="text" id="textEmail" placeholder="Input Email"
                                    innerRef={(element) => this.email = element}
                                    style={{ width: 300 }} />
                            </FormGroup>
                            <FormGroup style={{ marginTop: -15 }}>
                                <Label for="textPassword">Password</Label>
                                <InputGroup style={{ width: 300 }}>
                                    <Input id="textEmail" placeholder="Input Password"
                                        innerRef={(element) => this.password = element} type={this.state.passType}
                                    />
                                    <InputGroupText style={{ cursor: "pointer" }} onClick={this.showPass}>
                                        {this.state.passShow}
                                    </InputGroupText>
                                </InputGroup>
                            </FormGroup>
                            <Button color="" style={{ color: "white", width: 300, borderRadius: 50, marginTop: 15, backgroundColor: "#5A5A5A" }} onClick={this.btRegis}>Create Account</Button>
                        </div>
                    </div>
                </div>

            </div>
         );
    }
}
 
export default RegisterPage;

// import axios from 'axios';
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button, Card, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
// import { API_URL } from '../helper'

// class RegisterPage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             passType: "password",
//             passText: "Show"
//         }
//     }

//     handleInput = (value, propState) => {
//         console.log(value, propState)
//         this.setState({ [propState]: value })
//     }

    // btRegis = () => {
    //     if (this.username.value === "") {
    //         alert("Username empty")
    //     } else if (this.email.value === "") {
    //         alert("email empty")
    //     } else if (this.password.value === "") {
    //         alert("password empty")
    //     } else {
    //             if (this.email.value.includes("@")) {
    //                 axios.post(`${API_URL}/users/register`, {
    //                     username: this.username.value,
    //                     email: this.email.value,
    //                     password: this.password.value,                        
    //                 }).then((response) => {
    //                     alert("register success ✔")
    //                 }).catch((error) => {
    //                     console.log(error)
    //                 })
    //             } else {
    //                 alert("email didnt contain @")
    //             }
    //     }
    // }

//     showHidePassword = () => {
//         if (this.state.passType === "password") {
//             this.setState({
//                 passType: "text",
//                 passText: "Hide"
//             })
//         } else if (this.state.passType === "text") {
//             this.setState({
//                 passType: "password",
//                 passText: "Show"
//             })
//         }
//     }

//     render() {
//         return (
//             <div style={{ backgroundColor: "#2B2B36", borderColor: "#2B2B36" }}>
//                 <div style={{ textAlign: "center", paddingTop: "40px" }}> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABMCAYAAAAoefhQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDExNi4xNjQ3NjYsIDIwMjEvMDIvMTktMjM6MTA6MDcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVDOTVDNUY5QkI2RDExRUJCMjdGRTg1Q0ZFQjA5OUU2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVDOTVDNUZBQkI2RDExRUJCMjdGRTg1Q0ZFQjA5OUU2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUM5NUM1RjdCQjZEMTFFQkIyN0ZFODVDRkVCMDk5RTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUM5NUM1RjhCQjZEMTFFQkIyN0ZFODVDRkVCMDk5RTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5IrKoYAAAI9UlEQVR42uxd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"
//                     alt="logo-brand"
//                     width="180px"
//                 />
//                 </div>
//                 <div className="row" style={{ alignSelf: "center", backgroundColor: "#2B2B36", borderColor: "#2B2B36" }}>
//                     <div className="col-3">

//                     </div>
//                     <div style={{ textAlign: "justify" }}>
//                         <div className="col-6 p-5 rounded" style={{ display: "flex", margin: "auto" }}>
//                             <Card
//                                 body
//                                 inverse
//                                 style={{
//                                     backgroundColor: 'white',
//                                     borderColor: 'white',
//                                     margin: "10px",
//                                     alignItems: "center"
//                                 }}>
//                                 <FormGroup style={{ textAlign: "center", width: "400px" }}>
//                                     <h3 style={{ color: "black", margin: "10px", marginBottom: "20px" }}>Create Account</h3>
//                                     <Label style={{ fontWeight: "bold", color: "black" }}></Label>
//                                     <Input id="textUsername" placeholder='Username' innerRef={(element) => this.username = element} />
//                                 </FormGroup>
//                                 <FormGroup style={{ textAlign: "center", width: "400px" }}>
//                                     <Label style={{ fontWeight: "bold", color: "black" }}></Label>
//                                     <Input id="textEmail" placeholder='E-Mail' innerRef={(element) => this.email = element} />
//                                 </FormGroup>
//                                 <FormGroup style={{ textAlign: "center", width: "400px" }}>
//                                     <Label style={{ fontWeight: "bold", color: "black" }}></Label>
//                                     <InputGroup style={{ textAlign: "center" }}>
//                                         <Input type={this.state.passType} placeholder='Password' id="textPassword" innerRef={(element) => this.password = element} />
//                                         <InputGroupText style={{ cursor: "pointer", width: "70px" }} onClick={this.showHidePassword}>
//                                             {this.state.passText}
//                                         </InputGroupText>
//                                     </InputGroup>
//                                     <Label style={{ fontWeight: "bold", color: "black" }}></Label>
//                                 </FormGroup>
//                                 <FormGroup style={{ textAlign: "center" }}>
//                                     <Button style={{ width: "200px", backgroundColor: "#6EC8C7", borderRadius: 20 }} onClick={this.btRegis}>REGISTER</Button>
//                                 </FormGroup>
//                                 <div style={{ width: "400px", fontSize: "12px", marginTop: "15px" }}>
//                                     <p style={{ color: "black" }}>Dengan mendaftar, kamu setuju dengan <a style={{ cursor: "pointer", color: "#6EC8C7" }}>Syarat & Layanan</a> dan <a style={{ cursor: "pointer", color: "#6EC8C7" }}>Kebijakan Privasi</a>.</p>
//                                 </div>
//                                 <div style={{ width: "400px", fontSize: "14px", marginTop: "50px", textAlign:"center" }}><p style={{ color: "black" }}>Sudah menjadi anggota?
//                                     <Link to="/Login"> <a style={{ cursor: "pointer", color: "#6EC8C7" }}>Akun login</a></Link></p>
//                                 </div>
//                             </Card>
//                         </div>
//                     </div>
//                     <div className="col-3">

//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default RegisterPage;