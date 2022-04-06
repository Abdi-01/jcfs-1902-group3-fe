import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Input } from 'reactstrap';
import { API_URL } from '../helper';


class ModalChangeNama extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {}

    onBtCancel = () => {
        this.props.btClose()
    }
    onBtSave = () => {
        let data = {
            nama: this.inNama.value
        }

        axios.patch(API_URL + `/users/updatenama`, data, {
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
                        isOpen={this.props.modalOpenNama}
                        toggle={this.props.btClose}
                    >
                        <ModalHeader toggle={this.props.btClose}>
                            Modal title
                        </ModalHeader>
                        <ModalBody>
                            <div>
                                <Input
                                    innerRef={element => this.inNama = element}
                                    defaultValue={this.props.nama}
                                    style={{ fontWeight: 900 }}
                                />
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <p onClick={this.props.modalToggleNama}>Kembali ke halaman Login</p>
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
        nama: userReducer.nama
    }
}

export default connect(mapToProps)(ModalChangeNama);