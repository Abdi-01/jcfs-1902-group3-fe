import { Box, Button } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Input, InputGroup, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import Swal from 'sweetalert2';
import { API_URL } from '../helper';
import { getAdmin, getWarehouse } from '../redux/actions/userAction';

class ModalAddAdmin extends React.Component {
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
    // nama_penerima, alamat, no_telpon, provinsi, kota, kecamatan, kode_pos
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

    getData = async () => {
        try {
            let res = await axios.get(`${API_URL}/admin/getadmin`)
            if (res.data.success) {
                this.setState({
                    nama: res.data.getAdmin
                })
            }
        } catch (error) {
            console.log(error)
        }
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
    // handleKota = async (event) => {
    //     let res = await axios.get(`${API_URL}/alamat/kota/${event.target.value}`)
    //     if (res.data.success) {
    //         this.setState({
    //             kota: res.data.dataKota
    //         })
    //     }
    //     this.setState({
    //         idprovinsi: event.target.value
    //     })
    // }
    // printKota = () => {
    //     if (this.state.kota.length > 0) {
    //         return this.state.kota.map((item, index) => {
    //             return (
    //                 <option value={item.city_id}>{item.city_name}</option>
    //             )
    //         })
    //     }
    // }
    handleInput = (event, nameProp) => {
        this.setState({
            [nameProp]: event.target.value
        })
    }
    componentDidMount() {
        this.getData()
        console.log("cek warehouselist cdm", this.props.warehouseList)
    }
    
    
    render() {
        console.log("cek warehouselist", this.props.warehouseList)
        return (
            <div>
                <Modal
                    centered
                    style={{}}
                    isOpen={this.props.ModalAddAdmin}
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
                                    <Input type='text' placeholder='No Handphone' onChange={(event) => this.handleInput(event, 'password')} />
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
                                    <option value='idwarehouse' selected>Pilih Warehouse</option>
                                    {this.printWarehouse()}
                                </Input>
                            </FormGroup>
                        </InputGroup>
                        <div style={{ float: "right", marginTop: 20 }}>
                            <Button colorScheme={'teal'} onClick={this.btSimpan} style={{ borderRadius: 10 }} className='bt-orange'>
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
// nama_penerima, alamat, no_telpon, provinsi, kota, kecamatan, kode_pos

export default connect(mapToProps, { getAdmin, getWarehouse })(ModalAddAdmin);