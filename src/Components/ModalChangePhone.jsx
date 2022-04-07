import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Input } from 'reactstrap';
import { API_URL } from '../helper';


class ModalChangePhone extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {}

    onBtCancel = () => {
        this.props.btClose()
    }
    onBtSave = () => {
        let data = {
            no_telpon: this.inPhone.value
        }

        axios.patch(API_URL + `/users/updatephone`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('data')}`
            }
        })
            .then(res => {
                console.log("cek res.data", res.data)
                alert("update success")
                this.props.btClose()
                window.location.reload()
            }).catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <div>
                    <Modal
                        centered
                        isOpen={this.props.modalOpenPhone}
                        toggle={this.props.btClose}
                    >
                        <ModalHeader toggle={this.props.btClose}>
                            Modal title
                        </ModalHeader>
                        <ModalBody>
                            <div>
                                <Input
                                    innerRef={element => this.inPhone = element}
                                    defaultValue={this.props.no_telpon}
                                    style={{ fontWeight: 900 }}
                                />
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <p onClick={this.props.modalTogglePhone}>Kembali ke halaman Login</p>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                onClick={this.onBtSave}
                            >
                                Do Something
                            </Button>
                            {' '}
                            <Button onClick={this.onBtCancel}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}
const mapToProps = ({ userReducer }) => {
    return {
        no_telpon: userReducer.no_telpon
    }
}

export default connect(mapToProps)(ModalChangePhone);