import { Box, Button } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Input, InputGroup, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import Swal from 'sweetalert2';
import { API_URL } from '../helper';
import { getAdmin, getWarehouse } from '../redux/actions/userAction';

class ModalUpdateAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            idwarehouse: "",
            no_telpon: '',
            nama: ''
        }
    }

    btSimpan = async ({ iduser }) => {
        const { email, username, idwarehouse, no_telpon } = this.state
        let data = {
            email:email ? email:this.props.dataEdit.email,
            username:username ? username:this.props.dataEdit.username,
            idwarehouse:idwarehouse ? idwarehouse:this.props.dataEdit.idwarehouse,
            no_telpon:no_telpon ? no_telpon:this.props.dataEdit.no_telpon
        }
        let token = localStorage.getItem('data')
        let res = await axios.patch(`${API_URL}/admin/updateadmin/${this.props.dataEdit.iduser}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log("cek res.data", res.data)
                return Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Berhasil Update Admin',
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
        this.props.getWarehouse()
        console.log("cek warehouselist cdm", this.props.warehouseList)
    }


    render() {
        console.log("cek warehouselist", this.props.warehouseList)
        console.log("cek adminList", this.props.adminList)
        console.log("cek dataEdit", this.props.dataEdit)
        let {username, no_telpon, email, idwarehouse, nama} = this.props.dataEdit
        return (
            <div>
                <Modal
                    centered
                    style={{}}
                    isOpen={this.props.ModalUpdateAdmin}
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
                                    <Input type='text' defaultValue={this.props.dataEdit.username} onChange={(event) => this.handleInput(event, 'username')} />
                                </FormGroup>
                            </Box>
                            <Box className='col-6'>
                                <FormGroup className='col-6' style={{ width: "90%" }}>
                                    <Label>No Handphone</Label>
                                    <Input type='text' defaultValue={this.props.dataEdit.no_telpon} onChange={(event) => this.handleInput(event, 'no_telpon')} />
                                </FormGroup>
                            </Box>
                        </InputGroup>
                        <InputGroup className='d-flex row' style={{ justifyContent: "space-between" }}>
                            <Box className='col-6'>
                                <FormGroup style={{ width: "90%" }}>
                                    <Label>Email</Label>
                                    <Input type='text' defaultValue={this.props.dataEdit.email} onChange={(event) => this.handleInput(event, 'email')} />
                                </FormGroup>
                            </Box>
                        </InputGroup>
                        <InputGroup className='d-flex '>
                            <FormGroup style={{ width: '90%' }}>
                                <Label>Warehouse</Label>
                                <Input type='select' defaultValue={this.props.dataEdit.idwarehouse} onChange={(event) => this.handleInput(event, 'idwarehouse')}>
                                    <option selected>Pilih Warehouse</option>
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
        warehouseList: state.userReducer.warehouseList,        
        email: state.userReducer.email,        
        username: state.userReducer.username,        
        no_telpon: state.userReducer.no_telpon,        
    }
}

export default connect(mapToProps, { getAdmin, getWarehouse })(ModalUpdateAdmin);