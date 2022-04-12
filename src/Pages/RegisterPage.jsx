import { connect } from 'react-redux';
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
                        // console.log("respon data", response.data)
                        // if(response.data.success == false){                            
                        //     alert(response.data.message)
                        // }else{
                        //     console.log(response.data)                           
                        //         alert("register success ✔")                                                               
                        // }
                    }).catch((error) => {
                        console.log(error)                        
                        // alert("error")
                        // console.log("Nyobain ERRORRR error",error)
                    })
                } else {
                    alert("email didnt contain @")
                }
        }
    }
    

    render() { 
        console.log("cek props email",this.props.email)
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

const mapToProps = ({ userReducer }) => {
    return {
        username: userReducer.username,
        email: userReducer.email
    }
}
 
export default connect(mapToProps)(RegisterPage);