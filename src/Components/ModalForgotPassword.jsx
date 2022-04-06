import axios from 'axios';
import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Label, Input, InputGroup, InputGroupText, Form, FormGroup } from 'reactstrap';
import { API_URL } from '../helper';
import { MdEmail } from "react-icons/md";
import { connect } from 'react-redux';

class ModalChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    sendForgotPassword = () => {
        console.log(this.emailConfirmation.value)
        axios.post(`${API_URL}/users/forgotpassword`, { email: this.emailConfirmation.value })
            .then(res => {
                console.log("res.data", res.data)
                alert("Kami sudah mengirimkan link melalui email, silahkan periksa email anda")
            }).catch(err => {
                console.log(err)
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
                        cobain
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
                        <div>
                            <Button className='' style={{ borderRadius: 10, marginTop: 30, width: "100%" }} onClick={this.sendForgotPassword}>Send</Button>
                        </div>
                        <div style={{ marginTop: 30 }}>
                            <p onClick={this.props.btClose} style={{ margin: "auto", color: "#6b3c3b" }}>Cancel</p>
                        </div>
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