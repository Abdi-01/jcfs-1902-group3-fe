import React from 'react';
import axios from "axios";
import { FormGroup, Label, Input, Button, InputGroup, InputGroupText } from "reactstrap";
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { API_URL } from '../helper';
import { onLogin } from '../redux/actions';
import logo from '../assets/woodavenue.jpeg'
import ModalForgotPassword from '../Components/ModalForgotPassword';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passShow: <AiOutlineEyeInvisible />,
            passType: "password",
            dataUser: [],
            modalOpenPassword: false
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

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(`${API_URL}/users/`)
            .then((response) => {
                console.log("GET DATA LOGIN", response.data)
                this.setState({ dataUser: response.data })
            }).catch((error) => {
                console.log(error)
            })
    }

    btLogin = () => {
        if (this.emailLogin.value == "" || this.passwordLogin.value == "") {
            alert(`Input your Username & Password❗`)
        } else {
            this.props.onLogin(this.emailLogin.value, this.passwordLogin.value)
        }
    }



    render() {
        if (this.props.email) {
            alert(`Welcome ${this.props.email} 👌`)


            return <Navigate to="/" />
        }
        return (
            <div>
                <ModalForgotPassword
                    modalOpenForgot={this.state.modalOpenForgot}
                    btClose={() => this.setState({ modalOpenForgot: !this.state.modalOpenForgot })}
                />
                <div className="shadow container" style={{ width: "70vw", height: "65vh" }}>
                    <div className="row">
                        <div className="col-5 row-3 mt-10" >
                            <img src={logo} style={{ width: 470, marginTop: 120, marginLeft: 100 }} />
                        </div>
                        <div className="col-6 pl-5" style={{ paddingTop: 80, paddingLeft: 170 }}>
                            <p style={{ fontWeight: "bold", color: "#5A5A5A", fontSize: 30, marginLeft: 100 }}>LOGIN</p>
                            <FormGroup >
                                <Label for="textEmail">Email</Label>
                                <Input type="text" id="textEmail" placeholder="Input Email"
                                    innerRef={(element) => this.emailLogin = element}
                                    style={{ width: 300 }} />
                            </FormGroup>
                            <FormGroup >
                                <Label for="textPassword">Password</Label>
                                <InputGroup style={{ width: 300 }}>
                                    <Input id="textEmail" placeholder="Input Password"
                                        innerRef={(element) => this.passwordLogin = element} type={this.state.passType} />
                                    <InputGroupText style={{ cursor: "pointer" }} onClick={this.showPass}>
                                        {this.state.passShow}
                                    </InputGroupText>
                                </InputGroup>
                            </FormGroup>
                            <Button color="" style={{ color: "white", width: 300, borderRadius: 50, marginTop: 15, backgroundColor: "#5A5A5A" }} onClick={this.btLogin}>Login</Button>
                            <p style={{textAlign:"center", padding:10}}>{this.props.nama} <a onClick={() => this.setState({ modalOpenForgot: !this.state.modalOpenForgot })} style={{ color: "#6b3c3b", cursor: "pointer" }}>Forgot Password</a></p>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        iduser: state.userReducer.iduser,
        email: state.userReducer.email,
        username: state.userReducer.username
    }
}

export default connect(mapToProps, { onLogin })(LoginPage);

// import React from 'react';
// import { connect } from 'react-redux';
// import { onLogin } from '../redux/actions/userAction';
// import { Alert, Button, Card, Form, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
// import axios from 'axios';
// import { Link, Navigate } from 'react-router-dom';
// import { API_URL } from '../helper';

// // const MyComponent = () => {
// //     const someArray = [1,2,3]
// //     const mapList = () =>(
// //         someArray.map((element)=><p>{element}</p>)
// //     )
// //     return(
// //         <div>
// //             {mapList()}
// //         </div>
// //     )
// // }


// class LoginPage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             passType: "password",
//             passText: "Show",
//             dataUser: [],
//             isLoggedIn: false
//         }
//     }

//     // componentDidMount() {
//     //     this.getData()
//     // }

//     // getData = () => {
//     //     axios.get(`${API_URL}/users`)
//     //         .then((res) => {
//     //             console.log("GET DATA LOGIN", res.data)
//     //             this.setState({ users: res.data })
//     //         }).catch((error) => {
//     //             console.log(error)
//     //         })
//     // }

//     btLogin = async () => {
//         try {
//             let res = await this.props.onLogin(this.emailLogin.value, this.passwordLogin.value)
//             if (this.emailLogin.value === "" || this.passwordLogin.value === "") {
//                 this.setState({ alertEmptyIsOpen: true }, () => {
//                     window.setTimeout(() => {
//                         this.setState({ alertEmptyIsOpen: false })
//                     }, 1000)
//                 })
//             } else {
//                 if (res) {
//                     this.setState({ loginAlertIsOpen: true }, () => {
//                         window.setTimeout(() => {
//                             this.setState({ loginAlertIsOpen: false })
//                             window.location = '/';
//                         }, 1000)
//                     })
//                 } else {
//                     this.setState({ alertNotFoundIsOpen: true }, () => {
//                         window.setTimeout(() => {
//                             this.setState({ alertNotFoundIsOpen: false })
//                         }, 1000)
//                     })
//                 }
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }

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
//         if (this.props.iduser) {
//             alert("login success")
//             return <Navigate to="/" />
//         }

//         return (
//             <div style={{ backgroundColor: "#2B2B36", borderColor: "#2B2B36" }}>
//                 <div style={{ textAlign: "center", paddingTop: "40px" }}> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABMCAYAAAAoefhQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDExNi4xNjQ3NjYsIDIwMjEvMDIvMTktMjM6MTA6MDcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVDOTVDNUY5QkI2RDExRUJCMjdGRTg1Q0ZFQjA5OUU2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVDOTVDNUZBQkI2RDExRUJCMjdGRTg1Q0ZFQjA5OUU2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUM5NUM1RjdCQjZEMTFFQkIyN0ZFODVDRkVCMDk5RTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUM5NUM1RjhCQjZEMTFFQkIyN0ZFODVDRkVCMDk5RTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5IrKoYAAAI9UlEQVR42uxdaYwURRSu5Vh2F1iRy+VSViRCRIRIVDwxCokcghGVeBtUPGIkAolRjKigeIPE+8IriJE/ilfURBBBjuh6BIMYWFjOhV3AXWAP2PE9+k12ZGe6qnu6p7tnvi/5stmpnpqu1/VV1Xt1dF4sFlMAACRHK5gAACAQAHCFNtV9+i+lvycRm2COY2hNXEB8D6YA2hDHwAwtMBAmAOJDrO0wQwvshwkA+CAAAIEAAAQCABAIAEAgAACBAAAEAgAQCABku0B6wQwAkBy81GSZstZiZSsKiH3xqAG3AhmR5WUcQvwVjxqAD5IcR/CYgXR6kGxHUcTvvx3xZGIJsRuxMzGP2EjcTawlVhP3yd+6LB0mnyKuANvgRLFBA7GSWJNQfmY9BJLd6Em8kjiROFgqhUlPyZVkF3ELcQ1xE3EzsZy4I4374UBOJ2KxVNY8qYQHiHtEqF6D/cYriNcQBzmwQbWNDXZCINHv0Z8gTpWK6PS73YRnEsceV3F4E9gDBvlcSBxKPI1YKgLtrayNZMnArXgZcRXxK+I3adognzibOM2FC8A26C7k+x53nA3mEWc4zfBkuako7yiM72s5HOEycKVeQuzvk/CGaFrrF+Wavi4q9DnC+4kriQ8pKzrqFMOIi4mn+mSDs9x86WdijyxofUcSv4vovZfKcKDAx9/YapPGvc4Ej37nfOIP0gvOd/A9Hkat9dnOW920vO2zZHjSOqL3zS3wTz6LQ2kcVz98iHniP5g64d9nwNZ1bgRSkyUCiWo4950M9eB2AqlRHkZ+EvCJsqJuOiwUvyFIG8BJDyH6EW9wcD1HZLYpK1LDDUJMWl8eBRQSO8j/HHEqOm50YDdS+FdZEbASH8o4XXySVBhAvM5Bfv+Iv8k2OCo2KJTyxm1QmGCDIkMbQCAhxEzD654kvqWscKXpkIUrCc8XcGi2j7IP8x5NUhdYgFUiHA5+HJTK2JHYRfI0wWSNQB4xzGeW9DRbHNqgc4INtkEg0QHPJVxlcN0FyooMOR1r10nlZpQZfOdxcdb/VtZ8wXoRSEOKex9OvJt4oybf7hKESCbutsqa71Ea8bINVqdpA1fLjSCQ4DCaeILmmikuxOEWCxxcG5P7WimV8HaDoWQygYyTIZGuB1od1EPCfpDgcJEmvYL4RgTKMcXA+S1N8fl5Bj5XoCdcQiDBYYAm/f2IlKNJhmN26JLi8zPCbgMIJDiUatJ/i1BZqjTpB5N8lm/Qg5RBILkJtntPzRh/XYTKU6hJTxZ54qhSZ41zvhYC8Q6pnD03y939nrTi9W9dbdJ3K/OQbhhwuguBdNV8hyNpO4IumJsoFjtOXysr1BcG5InQN9jc73xplU0bjS8CHl5VRUgcIzSVnedTNib5vJMm3+owFM6NQH4k3huhB8gL1KaG7J504d3aCNn3KU06r+o95KDHjyMUS6DcDLE6KCBd6BYm1kekHFcbONrzXQ59Q2EDNz1IHup32mirSW80zGe8sma0YwbP7C/l7ZwCL2N518D3+DxFWr7mu0cN74N3XQ4ztMGfxA/9FgiQPtp5lA/PMo8zvHa9xwJZrqx1WXaYZJOmq9CmPQhPVF5ueO0vTgWCMG8w0LWOpgEFJ4vvvIyKca8wSHPNm8rajOd2JGJaNysc3Hd5JoZYduClzYNVtI/a4eHPIuKXPv5GQ4QbLl5VPFZzzR/EO9NsBPLDUFivBXKXshamRR2VPguk0UCkYcRzMqyzA59ycolBXrrdfaHYIep1S1WusgN7fM5fVzlMfZRMBkx4T8c0zTV8DBAf3rDPIL9DmvSCMNgAPkgw0E2Cme5865ZBcczRXMObqoY7aCRrPbKBr6seEMUKBhvFUW+dZsV/PmEoyL3OC8r7wx+mG4iDt8COUlYo2RS6XqaLYT48UbnELxtAIMGA11rxWqPeNq1if5V8iUYiVgkTK4uXAuFzrp7VXMNzC5cS9zrMe5cmvYfYRxepWyH0xQYYYgUH3UK8sx3m19Hj53mfso7uscNyuc+9Lsu/WVM3zw3YBhBIgNikSR8S4L3dQ3xJcw0P7Tha1eDyNzjMu0ZzzdCgHxIEEhx0u/BuCei+eP7iZc01PCM/xoPf2qBJvxkCyV3oDnnmM6oezvA98flUr2uu4bmQWz36vW816bypagYEkpvg4YVumcRsBz0JLw9vSlMcH9ukc9RpvMcVdoXSv5LgGaU/WsgrG7SA11GsQtR7R3hF6fdTLFTWwdJ8jCeHUbdLReDJRp4ryBfnlHsctzPwF2vEweBJQD51/WnlbBkIT+TxHMkslXwB4qvKOpPLDh/IkO4zGZruUM3HpRZ5ZIOMCASvO3MGDqE+ZlDhJqjm09frpXLwTHSxfDfdt2gNM7imr7JekeAWc1MIZK6IRzeamaSaVwdz41DrsQ0yIpCbVPheecaLJxeHVCA8WThZWkhTtFPeLZePY7/P5bQb+vC6tDuIbzvIr0B5M9fBE7Wj5Tnw6Id3n/Iyo3JJH+i1QLaGsBKG/aU6vD9hlDQuuQo+4Z5ftzYxoN/nYMhH4mfxxGv8TON1ueCkR+Ed8BzOXJrjw01+l0imX4DEPQfvbVkm/uBy6e14Bp8PldiEKFZ4wDsD5/iYfy+NI+0nTOvZSAkC+IVUZ5Hx0p4+Mhx/jXgb8VruVSCQcGGmPKRFSr8c3BScD5/YbjfvUuxzudo7EMmDyppB/9TD4TE79DwpmWrepUp6k1bSixWKn7fKjQ8StZd9Ri2yxrvxrpdWjR1IXnLST3qAYqlsbcS5TTzin1+CU6maX8vM8wsVkp9ueT0P7w74WKYGh4IvkyFXidiAGw1evNkjhQ0Oiw1qpOx7xBY7xS/+XROIeFRZEbZKqS/x18G1ciOQ+ohVuGoVTfDDWpjk87YSfTniofg3Kv3K4SCwSxx4v21Ql6IxbXIjkKi9TbZYZRcalfmxQNmKjNnAjUC4678M7gKQC4CTDgAQCABAIAAAgQAABAIAEAgAQCAAAIEAAAQCADkqkBKYoQU6wgQAg5earIFI/gfeG1EBMwDHKkMsFoMVAAA+CABAIADgKf4TYAAg/rBgqA19rgAAAABJRU5ErkJggg=="
//                     alt="logo-brand"
//                     width="180px"
//                 />
//                 </div>

//                 <div style={{ backgroundColor: "#2B2B36", borderColor: "#2B2B36" }}>
//                     <div className="row">
//                         <div className="col-3">

//                         </div>
//                         <div className="col-6 p-5">
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
//                                     <Label style={{ fontWeight: "bold", color: "black" }}></Label>
//                                     <Input placeholder='E-Mail' innerRef={(element) => this.emailLogin = element} />
//                                 </FormGroup>
//                                 <FormGroup style={{ textAlign: "center", width: "400px" }}>
//                                     <Label style={{ fontWeight: "bold", color: "black" }}></Label>
//                                     <InputGroup style={{ textAlign: "center" }}>
//                                         <Input placeholder='Password' type={this.state.passType} innerRef={(element) => this.passwordLogin = element} />
//                                         <InputGroupText style={{ cursor: "pointer", width: "70px" }} onClick={this.showHidePassword}>
//                                             {this.state.passText}
//                                         </InputGroupText>
//                                     </InputGroup>
//                                 </FormGroup>
//                                 <div style={{ width: "400px", display: "flex" }}>
//                                     <div style={{ textAlign: "left" }}>
//                                         <Form style={{ marginLeft: "auto" }}>
//                                             <FormGroup
//                                                 check
//                                                 inline
//                                             >
//                                                 <Input type="checkbox" />
//                                                 <Label check style={{ color: "black", fontSize: "14px" }}>
//                                                     Ingat Saya
//                                                 </Label>
//                                             </FormGroup>
//                                             <FormGroup
//                                                 check
//                                                 inline
//                                             ></FormGroup>
//                                         </Form>
//                                     </div>
//                                     <div style={{ marginLeft: "auto", marginTop:"10px" }}>
//                                         <a style={{ cursor: "pointer", color: "#6EC8C7", fontSize:"14px" }}>Masalah untuk login?</a>
//                                     </div>
//                                 </div>
//                                 <FormGroup style={{ textAlign: "center" }}>
//                                     <Button onClick={this.btLogin} style={{ width: "200px", backgroundColor: "#6EC8C7", borderRadius: 20, marginTop:"20px" }}>LOGIN</Button>
//                                 </FormGroup>
//                                 <div style={{ width: "400px", fontSize: "14px", marginTop: "50px", textAlign: "center" }}><p style={{ color: "black" }}>Belum Bergabung?
//                                     <Link to="/Register"> <a style={{ cursor: "pointer", color: "#6EC8C7" }}>Daftar Disini</a></Link></p>
//                                 </div>
//                             </Card>
//                         </div>
//                         <div className="col-3">

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// const mapToProps = (state) => {
//     return {
//         iduser: state.userReducer.id,
//         email: state.userReducer.email
//     }
// }

// export default connect(mapToProps, { onLogin })(LoginPage);

// import React from 'react';
// import { connect } from 'react-redux';
// import { Button, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
// import ModalForgotPassword from '../Components/ModalForgotPassword';
// import { Link, Navigate } from 'react-router-dom';


// class LoginPage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             openModalForgotPassword: false,
//             passType: "password",
//             passText: "Show",
//             redirect: false
//         }
//     }

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

//     btLogin = async () => {
//         try {
//             let res = await this.props.loginAction(this.emailLogin.value, this.passwordLogin.value)
//             if (this.emailLogin.value === "" || this.passwordLogin.value === "") {
//                 alert("Email atau Password Tidak Boleh Kosong");
//             } else {
//                 if (res) {
//                     alert("Berhasil Masuk")
//                     await this.setState({ redirect: true })
//                 } else {
//                     alert("Akun Tidak Ditemukan")
//                 }
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }



//     render() {
//         if (this.state.redirect) {
//             return <Navigate to="/" />
//         }
//         return (
//             <div className='container clr-blue'>
//                 <ModalForgotPassword
//                     openModalForgotPassword={this.state.openModalForgotPassword}
//                     toggleModalForgotPassword={() => this.setState({ openModalForgotPassword: !this.state.openModalForgotPassword })}
//                 />
//                 <div style={{ textAlign: "center", marginTop: "10%" }}>
//                     <h1 style={{ fontWeight: "bolder" }}>Login Account</h1>
//                     <h4>test</h4>
//                 </div>
//                 <Form className="mt-5">
//                     <div className='row'>
//                         <FormGroup className='col-6'>
//                             <h4>Email</h4>
//                             <Input style={{ borderRadius: 10 }} innerRef={(element) => this.emailLogin = element} />
//                         </FormGroup>
//                         <FormGroup className='col-6'>
//                             <h4>Password</h4>
//                             <InputGroup>
//                                 <Input type={this.state.passType} style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} innerRef={(element) => this.passwordLogin = element} />                                
//                             </InputGroup>
//                             <div className="mt-5" style={{ float: "right" }}>
//                                 <h5 onClick={() => this.setState({ openModalForgotPassword: !this.state.openModalForgotPassword })}>Lupa Kata Sandi?</h5>
//                             </div>
//                         </FormGroup>
//                     </div>
//                     <div className="mt-5">
//                         <Button className='bt-orange py-2' style={{ width: "100%", borderRadius: 20, fontSize: "20px" }} onClick={this.btLogin}>
//                             Masuk
//                         </Button>
//                     </div>
//                     <div className="mt-3" style={{ textAlign: "center" }}>
//                         <h4>Atau</h4>
//                     </div>
//                     <div className="mt-3">
//                         <Link to="/register">
//                             <Button id="btregis" outline style={{ width: "100%", borderRadius: 20, borderColor: "#2B2273", borderWidth: "3px", fontSize: "20px" }}>
//                                 Register
//                             </Button>
//                         </Link>
//                     </div>
//                 </Form>
//             </div>
//         );
//     }
// }

// export default LoginPage;