import { Box, Button } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader, Input } from 'reactstrap';
import Swal from 'sweetalert2';
import { API_URL } from '../helper';
import { keepLoginAction } from '../redux/actions';

class ModalChangeGender extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {}

    onBtCancel = () => {
        this.props.btClose()
    }

    onBtSave = async () => {
        let data = {
            gender: this.inGender.value
        }
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Ubah Jenis Kelamin!'
        }).then(async (result) => {
            axios.patch(API_URL + `/users/updategender`, data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('data')}`
                }
            })
            this.props.keepLoginAction()
            this.props.btClose()
            if (result.isConfirmed) {
                Swal.fire(
                    'Berhasil!',
                    'Gender Berhasil Diubah',
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
                        isOpen={this.props.modalOpenGender}
                        toggle={this.props.btClose}
                        style={{ paddingBottom: "200px" }}
                    >
                        <ModalHeader toggle={this.props.btClose}>
                            <Box style={{ fontSize: "24px", fontWeight: 400 }}>
                                <Box>Ubah Gender</Box>
                            </Box>
                        </ModalHeader>
                        <ModalBody>
                            <div>
                                <Input
                                    innerRef={element => this.inGender = element}
                                    defaultValue={this.props.gender}
                                    style={{ fontWeight: 600 }}
                                    type='select'
                                >
                                    <option>
                                        -
                                    </option>
                                    <option>
                                        Pria
                                    </option>
                                    <option>
                                        Wanita
                                    </option>
                                </Input>
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
        gender: userReducer.gender
    }
}

export default connect(mapToProps,{keepLoginAction})(ModalChangeGender);