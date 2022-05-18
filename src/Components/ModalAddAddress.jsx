import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Input, InputGroup, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import Swal from 'sweetalert2';
import { API_URL } from '../helper';
import { getAddress } from '../redux/actions/userAction';

class ModalAddAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            provinsi: [],
            kota: [],
            nama_penerima: '',
            alamat: '',
            no_telpon: null,
            idprovinsi: null,
            idkota: null,
            kecamatan: '',
            kode_pos: null,
            latitude: null,
            longitude: null

        }
    }

    btSimpan = async () => {
        const { nama_penerima, alamat, no_telpon, idprovinsi, idkota, kecamatan, kode_pos, latitude, longitude } = this.state
        let data = {
            idprovinsi,
            idkota,
            nama_penerima,
            alamat,
            no_telpon,
            kecamatan,
            kode_pos,
            latitude: this.props.latitude ? this.props.latitude : latitude,
            longitude: this.props.longitude ? this.props.longitude : longitude
        }
        console.log('isi data alamat', data)
        if (data.nama_penerima === '' || data.alamat === '' || data.no_telpon === null || data.idprovinsi === null || data.idkota === null || data.kecamatan === '' || data.kode_pos === null || data.latitude === null || data.longitude === null) {
            Swal.fire(
                'Warning!',
                'Semua data harus di isi',
                'warning'
            )
        } else {
            let token = localStorage.getItem('data')
            let res = await axios.post(`${API_URL}/users/addaddress`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.data.success) {
                Swal.fire(
                    'Success!',
                    'Alamat berhasil ditambahkan',
                    'success'
                )
                this.props.btClose();
                this.props.getAddress();
                this.setState({
                    nama_penerima: '',
                    alamat: '',
                    no_telpon: null,
                    idprovinsi: null,
                    idkota: null,
                    kecamatan: '',
                    kode_pos: null,
                    latitude: null,
                    longitude: null
                })
            }
        }

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
    btCloseModal = () => {
        this.props.btClose()
        this.setState({
            nama_penerima: '',
            alamat: '',
            no_telpon: null,
            idprovinsi: null,
            idkota: null,
            kecamatan: '',
            kode_pos: null,
            latitude: null,
            longitude: null
        })
    }
    render() {
        // console.log("cek provinsi", this.state.provinsi)
        return (
            <div>
                <Modal
                    style={{ marginTop: "15%" }}
                    isOpen={this.props.openModalAddAddress}
                    toggle={this.props.btClose}
                    size='lg'
                >
                    <ModalHeader style={{ margin: "auto" }}>
                        Tambah Alamat
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label>Nama Penerima</Label>
                            <Input placeholder='nama penerima' onChange={(event) => this.handleInput(event, 'nama_penerima')} value={this.state.nama_penerima} />
                        </FormGroup>
                        <InputGroup className='d-flex justify-content-between '>
                            <FormGroup style={{ width: '400px' }}>
                                <Label>Provinsi</Label>
                                <Input type='select' placeholder='Provinsi' onChange={(event) => this.handleKota(event)} DefaultValue={this.state.provinsi}>
                                    <option value='Provinsi' selected>Pilih Provinsi</option>
                                    {this.printProvinsi()}
                                </Input>
                            </FormGroup>
                            <FormGroup style={{ width: '300px' }}>
                                <Label>Kota</Label>
                                <Input type='select' placeholder='Kota' onChange={(event) => this.handleInput(event, 'idkota')} DefaultValue={this.state.kota}>
                                    <option value='Kota' selected>Pilih Kota</option>
                                    {this.printKota()}
                                </Input>
                            </FormGroup>
                        </InputGroup>
                        <InputGroup className='d-flex justify-content-between'>
                            <FormGroup>
                                <Label>Kecamatan</Label>
                                <Input type='text' placeholder='kecamatan' onChange={(event) => this.handleInput(event, 'kecamatan')} value={this.state.kecamatan} />
                            </FormGroup>
                            <FormGroup >
                                <Label>Kode Pos</Label>
                                <Input type='number' placeholder='kode pos' onChange={(event) => this.handleInput(event, 'kode_pos')} value={this.state.kode_pos} />
                            </FormGroup>
                            <FormGroup>
                                <Label>No Telepon</Label>
                                <Input type='number' placeholder='no telepon' onChange={(event) => this.handleInput(event, 'no_telpon')} value={this.state.no_telpon} />
                            </FormGroup>
                        </InputGroup>
                        <FormGroup>
                            <Label>Alamat Lengkap</Label>
                            <Input type='textarea' placeholder='alamat lengkap' onChange={(event) => this.handleInput(event, 'alamat')} value={this.state.alamat} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Koordinat Alamat</Label>
                            <div className="d-flex justify-content-between">
                                <Input placeholder='Koordinat Latitude' style={{ marginRight: '20px' }} defaultValue={this.props.latitude} onChange={(event) => this.handleInput(event, 'latitude')} />
                                <Input placeholder='Koordinat Longitude' defaultValue={this.props.longitude} onChange={(event) => this.handleInput(event, 'longitude')} />
                            </div>
                        </FormGroup>
                        <div style={{ float: "right", marginTop: 20 }}>
                            <Button onClick={this.btSimpan} style={{ borderRadius: 10, marginRight: '10px' }} className='btn btn-success'>
                                Simpan
                            </Button>
                            <Button onClick={this.btCloseModal} style={{ borderRadius: 10 }} className='btn btn-danger'>
                                Batal
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
        addressList: state.userReducer.addressList,
    }
}

export default connect(mapToProps, { getAddress })(ModalAddAddress);