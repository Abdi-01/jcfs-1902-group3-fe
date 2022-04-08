import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { API_URL } from '../helper';
import { getAddress } from '../redux/actions/userAction';

class ModalAddAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    // nama_penerima, alamat, no_telpon, provinsi, kota, kecamatan, kode_pos
    btSimpan = () => {
        let data = {            
            address: this.inNama_Penerima.value
        }
        console.log("dataNewAddress", data)
        axios.post(`${API_URL}/users/addaddress`, data)
            .then((res) => {
                alert("Berhasil Tambah Alamat")
                this.props.btClose();
                this.props.getAddress();
            }).catch((error) => {
                console.log("error btnSimpan ModalAddAddress", error)
            })
    }

    render() {        
        return (
            <div>                
                <Modal
                    style={{ marginTop: "15%" }}
                    isOpen={this.props.openModalAddAddress}
                    toggle={this.props.btClose}                    
                >
                    <ModalHeader style={{ margin: "auto" }}>                        
                        Tambah Alamat
                    </ModalHeader>
                    <ModalBody>
                        <Input type='textarea' innerRef={(element) => this.inNama_Penerima = element} />
                        <div style={{ float: "right", marginTop: 20 }}>
                            <Button onClick={this.btSimpan} style={{ borderRadius: 10 }} className='bt-orange'>
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
        addressList: state.userReducer.addressList
    }
}
// nama_penerima, alamat, no_telpon, provinsi, kota, kecamatan, kode_pos

export default connect(mapToProps, {getAddress})(ModalAddAddress);