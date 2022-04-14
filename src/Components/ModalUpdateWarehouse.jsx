import { Box, Button } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Input, InputGroup, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import Swal from 'sweetalert2';
import { API_URL } from '../helper';
import { getWarehouse } from '../redux/actions/userAction';

class ModalUpdateWarehouse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            provinsi: [],
            kota: [],
            nama: '',
            alamat: '',
            idprovinsi: null,
            idkota: null,
            kecamatan: '',
            kode_pos: '',
            latitude: '',
            longitude: ''
        }
    }
    // nama_penerima, alamat, no_telpon, provinsi, kota, kecamatan, kode_pos
    btSimpan = async (idwarehouse) => {
        const { nama, alamat, kecamatan, kode_pos, idprovinsi, idkota, latitude, longitude } = this.state
        let data = {
            idprovinsi,
            idkota,
            nama,
            alamat,
            kecamatan,
            kode_pos,
            latitude,
            longitude           
        }
        let token = localStorage.getItem('data')
        let res = await axios.patch(`${API_URL}/admin/updatewarehouse/${this.props.dataEdit.idwarehouse}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log("cek res.data", res.data)
                return Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Berhasil Update Warehouse',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).then(result => {
                this.props.btClose()
                this.props.getWarehouse()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    getData = async () => {
        try {
            let res = await axios.get(`${API_URL}/alamat/provinsi`)
            if (res.data.success) {
                this.setState({
                    provinsi: res.data.dataProvinsi
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    printProvinsi = () => {
        if (this.state.provinsi.length > 0) {
            return this.state.provinsi.map((item, index) => {
                return (
                    <option value={item.province_id}>{item.province}</option>
                )
            })
        }
    }
    handleKota = async (event) => {
        let res = await axios.get(`${API_URL}/alamat/kota/${event.target.value}`)
        if (res.data.success) {
            this.setState({
                kota: res.data.dataKota
            })
        }
        this.setState({
            idprovinsi: event.target.value
        })
    }
    printKota = () => {
        if (this.state.kota.length > 0) {
            return this.state.kota.map((item, index) => {
                return (
                    <option value={item.city_id}>{item.city_name}</option>
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
        this.getData()
    }


    render() {
        // console.log("cek provinsi", this.state.provinsi)
        console.log("cek dataEdit", this.props.dataEdit)
        return (
            <div>
                <Modal
                    centered
                    style={{}}
                    isOpen={this.props.ModalUpdateWarehouse}
                    toggle={this.props.btClose}
                    size='lg'
                >
                    <ModalHeader style={{ margin: "auto" }}>
                        Add Warehouse
                    </ModalHeader>
                    <ModalBody>
                        {/* <Input type='textarea' innerRef={(element) => this.inNama_Penerima = element} /> */}
                        <FormGroup>
                            <Label>Nama</Label>
                            <Input defaultValue={this.props.dataEdit.nama} onChange={(event) => this.handleInput(event, 'nama')} />
                        </FormGroup>
                        <InputGroup className='d-flex justify-content-between '>
                            <FormGroup style={{ width: '400px' }}>
                                <Label>Provinsi</Label>
                                <Input type='select' placeholder='Provinsi' onChange={(event) => this.handleKota(event)}>
                                    <option value='Provinsi' selected>Pilih Provinsi</option>
                                    {this.printProvinsi()}
                                </Input>
                            </FormGroup>
                            <FormGroup style={{ width: '300px' }}>
                                <Label>Kota</Label>
                                <Input type='select' placeholder='Kota' onChange={(event) => this.handleInput(event, 'idkota')}>
                                    <option value='Kota' selected>Pilih Kota</option>
                                    {this.printKota()}
                                </Input>
                            </FormGroup>
                        </InputGroup>
                        <InputGroup className='d-flex justify-content-between' style={{ justifyContent: "space-between" }}>
                            <Box className='col-3'>
                                <FormGroup style={{width:"90%"}}>
                                    <Label>Kecamatan</Label>
                                    <Input type='text' defaultValue={this.props.dataEdit.kecamatan} onChange={(event) => this.handleInput(event, 'kecamatan')} />
                                </FormGroup>
                            </Box>
                            <Box className='col-3'>
                                <FormGroup style={{width:"90%"}}>
                                    <Label>Kode Pos</Label>
                                    <Input type='number' defaultValue={this.props.dataEdit.kode_pos} onChange={(event) => this.handleInput(event, 'kode_pos')} />
                                </FormGroup>
                            </Box>
                            <Box className='col-3'>
                                <FormGroup style={{width:"90%"}}>
                                    <Label>Latitude</Label>
                                    <Input type='text' defaultValue={this.props.dataEdit.latitude} onChange={(event) => this.handleInput(event, 'latitude')} />
                                </FormGroup>
                            </Box>
                            <Box className='col-3'>
                                <FormGroup style={{width:"90%"}}>
                                    <Label>Longitude</Label>
                                    <Input type='text' defaultValue={this.props.dataEdit.longitude} onChange={(event) => this.handleInput(event, 'longitude')} />
                                </FormGroup>
                            </Box>
                        </InputGroup>
                        <FormGroup>
                            <Label>Alamat Lengkap</Label>
                            <Input type='textarea' defaultValue={this.props.dataEdit.alamat} onChange={(event) => this.handleInput(event, 'alamat')} />
                        </FormGroup>
                        <div style={{ float: "right", marginTop: 20 }}>
                            <Button 
                            colorScheme={'teal'}                            
                            style={{ borderRadius: 10 }} 
                            onClick={this.btSimpan} 
                            >
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
        warehouseList: state.userReducer.warehouseList,
        idwarehouse: state.userReducer.idwarehouse
    }
}
// nama_penerima, alamat, no_telpon, provinsi, kota, kecamatan, kode_pos

export default connect(mapToProps, { getWarehouse })(ModalUpdateWarehouse);