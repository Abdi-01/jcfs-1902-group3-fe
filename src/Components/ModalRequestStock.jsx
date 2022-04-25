import { Box, Button } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Input, InputGroup, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import Swal from 'sweetalert2';
import { API_URL } from '../helper';
import { getAdmin, getWarehouse } from '../redux/actions/userAction';

class ModalRequestStock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            email: "",
            username: "",
            idwarehouse: "",
            no_telpon: "",
            nama: ""
        }
    }

    btSimpan = async () => {
        const { password, email, username, idwarehouse, no_telpon } = this.state
        let data = {
            password,
            email,
            username,
            idwarehouse,
            no_telpon
        }
        let token = localStorage.getItem('data')
        let res = await axios.post(`${API_URL}/admin/addadmin`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log("cek res.data", res.data)
                return Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Berhasil Tambah Admin',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).then(result => {
                this.props.btClose()
                this.props.getAdmin()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    onBtRequest = async () => {
        const { idwarehouse, idproduct, invoice, total_harga, ongkir, catatan, added_date, updated_date } = this.state
        let data = {
            idwarehouse, idproduct, invoice, total_harga, ongkir, catatan, added_date, updated_date
        }
        let token = localStorage.getItem('data')
        let res = await axios.post(`${API_URL}/transactionwarehouse/requeststock`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log("cek res.data", res.data)
                return Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Berhasil Request Stock',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).then(result => {
                this.props.btClose()
                this.props.getAdmin()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    printWarehouse = () => {
        if (this.props.warehouseList.length > 0) {
            return this.props.warehouseList.map((item, index) => {
                return (
                    <option value={item.idwarehouse}>{item.nama}</option>
                )
            })
        }
    }

    handleInput = (event, nameProp) => {
        this.setState({
            [nameProp]: event.target.value
        })
    }

    componentDidMount() {
        // this.getData()
        this.props.getWarehouse()
        console.log("cek warehouselist cdm", this.props.warehouseList)
    }


    render() {
        console.log("cek warehouselist", this.props.warehouseList)
        return (
            <div>
                <Modal
                    centered
                    style={{}}
                    isOpen={this.props.ModalRequestStock}
                    toggle={this.props.btClose}
                    size='md'
                >
                    <ModalHeader style={{ margin: "auto" }}>
                        Add Admin
                    </ModalHeader>
                    <ModalBody>
                        <InputGroup className='d-flex row' style={{ justifyContent: "space-between" }}>
                            <Box className='col-6'>
                                <FormGroup style={{ width: "90%" }}>
                                    <Label>Username</Label>
                                    <Input type='text' placeholder='Username' onChange={(event) => this.handleInput(event, 'username')} />
                                </FormGroup>
                            </Box>
                            <Box className='col-6'>
                                <FormGroup className='col-6' style={{ width: "90%" }}>
                                    <Label>No Handphone</Label>
                                    <Input type='text' placeholder='No Handphone' onChange={(event) => this.handleInput(event, 'no_telpon')} />
                                </FormGroup>
                            </Box>
                        </InputGroup>
                        <InputGroup className='d-flex row' style={{ justifyContent: "space-between" }}>
                            <Box className='col-6'>
                                <FormGroup style={{ width: "90%" }}>
                                    <Label>Email</Label>
                                    <Input type='text' placeholder='Email' onChange={(event) => this.handleInput(event, 'email')} />
                                </FormGroup>
                            </Box>
                            <Box className='col-6'>
                                <FormGroup className='col-6' style={{ width: "90%" }}>
                                    <Label>Password</Label>
                                    <Input type='password' placeholder='Password' onChange={(event) => this.handleInput(event, 'password')} />
                                </FormGroup>
                            </Box>
                        </InputGroup>
                        <InputGroup className='d-flex '>
                            <FormGroup style={{ width: '90%' }}>
                                <Label>Warehouse</Label>
                                <Input type='select' placeholder='Warehouse' onChange={(event) => this.handleInput(event, 'idwarehouse')}>
                                    <option value={null} selected>Pilih Warehouse</option>
                                    {this.printWarehouse()}
                                </Input>
                            </FormGroup>
                        </InputGroup>
                        <div style={{ float: "right", marginTop: 20 }}>
                            <Button colorScheme={'teal'} onClick={this.btSimpan} style={{ borderRadius: 10 }}>
                                Simpan
                            </Button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        iduser: state.userReducer.iduser,
        adminList: state.userReducer.adminList,
        idwarehouse: state.userReducer.idwarehouse,
        warehouseList: state.userReducer.warehouseList
    }
}

export default connect(mapToProps, { getAdmin, getWarehouse })(ModalRequestStock);