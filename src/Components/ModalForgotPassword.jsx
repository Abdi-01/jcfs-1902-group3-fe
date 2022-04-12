import axios from 'axios';
import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader,  Label, Input, InputGroup, InputGroupText, Form, FormGroup } from 'reactstrap';
import { API_URL } from '../helper';
import { MdEmail } from "react-icons/md";
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { Button,Box } from '@chakra-ui/react';

class ModalChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    sendForgotPassword = () => {
        console.log(this.emailConfirmation.value)
        axios.post(`${API_URL}/users/forgotpassword`, { email: this.emailConfirmation.value })
        .then(res => {
            console.log("cek res.data", res.data)
            return Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Kami sudah mengirimkan link melalui email, silahkan periksa email anda',
                showConfirmButton: false,
                timer: 1500
            })
        })        
        .catch((error) => {
            if (error.response) {                        
                console.log(error.response.data.message);
                // alert(error.response.data.message);   
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: (error.response.data.message),                            
                  })                     
            }
        })
    }

    onBtCancel = () => {
        this.props.btClose()
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.modalOpenForgot}
                    toggle={this.props.btClose}
                >
                    <ModalHeader toggle={this.props.btClose}>
                        Lupa Password
                    </ModalHeader>
                    <ModalBody className='' style={{ margin: "auto", textAlign: "center" }}>
                        <Label style={{ fontWeight: "bolder", marginTop: 20 }}>Reset Password</Label>
                        <p>Masukan Email Anda dan kami akan mengirimkan link untuk reset password anda</p>
                        <InputGroup>
                            <InputGroupText style={{ marginTop: 50, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, color: "#2B2273" }}>
                                <MdEmail />
                            </InputGroupText>
                            <Input style={{ marginTop: 50, borderTopRightRadius: 10, borderBottomRightRadius: 10 }} innerRef={(element) => this.emailConfirmation = element} />
                        </InputGroup>
                        <Box style={{ borderRadius: "10px", marginTop: 30 }}>
                            <Button
                                colorScheme={'teal'}
                                style={{ width: "100%" }}
                                onClick={this.sendForgotPassword}
                            >
                                Send
                            </Button>
                        </Box>
                        <Box style={{ marginTop: 30 }}>
                            <Button
                                colorScheme={'blackAlpha'}
                                variant='link'
                                style={{ margin: "auto", color: "#6b3c3b" }}
                                onClick={this.props.btClose}
                            >
                                Back
                            </Button>
                        </Box>                        
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapToProps = ({ userReducer }) => {
    return {
        email: userReducer.email
    }
}

export default connect(mapToProps)(ModalChangePassword);