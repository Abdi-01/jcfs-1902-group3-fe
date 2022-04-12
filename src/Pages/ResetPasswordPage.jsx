import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {  Form, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import { newPassword } from '../redux/actions/userAction';

class ResetPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passType: "password",
            passText: "Show",
            redirect: false
        }
    }

    showHidePassword = () => {
        if (this.state.passType === "password") {
            this.setState({
                passType: "text",
                passText: "Hide"
            })
        } else if (this.state.passType === "text") {
            this.setState({
                passType: "password",
                passText: "Show"
            })
        }
    }

    newPasswordFunc = async () => {
        try {
            if (this.newPassword.value === this.confNewPassword.value) {

                await this.props.newPassword(this.newPassword.value)
                this.setState({ redirect: true })
            } else {
                alert("Password tidak sama")
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/" />
        }
        return (
            <Box style={{ backgroundColor: "rgb(239, 236, 234)" }}>
                <Box className='container' style={{ padding: 100, margin:"auto" }}>                    
                    <Box className='col-8' boxShadow={'dark-lg'} style={{ background: "white", border: "none", borderRadius: "9px", margin:"auto", padding:70 }}>
                    <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: "18px", fontWeight: 800, color: "#6b3c3b" }}>Masukan Password Baru Anda</p>
                    </div>
                    <Form className='mt-5' >
                        <div className='row'>
                            <FormGroup className='col-6'>
                                <Label style={{fontSize:"16px", fontWeight:600,color:"gray"}}>Password Baru</Label>
                                <InputGroup>
                                    <Input type={this.state.passType} style={{ borderRadius: 5 }} innerRef={(element) => this.newPassword = element} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup className='col-6'>
                                <Label style={{fontSize:"16px", fontWeight:600,color:"gray"}}>Konfirmasi Password</Label>
                                <InputGroup>
                                    <Input type={this.state.passType} style={{ borderRadius: 5}} innerRef={(element) => this.confNewPassword = element} />
                                </InputGroup>
                            </FormGroup>
                        </div>
                        <div className='mt-5'>
                            <Button colorScheme='teal' variant='solid' style={{ width: "100%", borderRadius: 20, fontSize: "20px" }} onClick={this.newPasswordFunc}>Submit</Button>
                        </div>
                    </Form>
                    </Box>                    
                </Box>
            </Box>
        );
    }
}


export default connect(null, { newPassword })(ResetPasswordPage);