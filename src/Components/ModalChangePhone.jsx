import { Box, Button } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader, Input } from 'reactstrap';
import Swal from 'sweetalert2';
import { API_URL } from '../helper';
import { keepLoginAction } from '../redux/actions';

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

        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Ubah No Handphone!'
        }).then(async (result) => {
            axios.patch(API_URL + `/users/updatephone`, data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('data')}`
                }
            })
            this.props.keepLoginAction()
            this.props.btClose()
            if (result.isConfirmed) {
                Swal.fire(
                    'Berhasil!',
                    'No Handphone Berhasil Diubah',
                    'success',
                )
            }
        })
            .catch((err) => {
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
                        style={{ paddingBottom: "200px" }}
                    >
                        <ModalHeader toggle={this.props.btClose}>
                            <Box style={{ fontSize: "24px", fontWeight: 400 }}>
                                <Box>Ubah No Handphone</Box>
                            </Box>
                        </ModalHeader>
                        <ModalBody>
                            <div>
                                <Input
                                    innerRef={element => this.inPhone = element}
                                    defaultValue={this.props.no_telpon}
                                    style={{ fontWeight: 600 }}
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="#6c3b3c"
                                colorScheme={'blackAlpha'}
                                variant='outline'
                                onClick={this.onBtSave}
                            >
                                Simpan
                            </Button>
                            <Button
                                colorScheme={'teal'}
                                onClick={this.onBtCancel}
                            >
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

export default connect(mapToProps,{keepLoginAction})(ModalChangePhone);