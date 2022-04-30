import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Button, Heading, Stack, Text, Icon, Badge } from '@chakra-ui/react'
import { Card, CardBody, CardImg, CardLink, CardSubtitle, CardText, CardTitle, FormGroup, FormText, Input, Label, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { BiUser } from 'react-icons/bi';
import ModalChangeNama from '../Components/ModalChangeNama';
import ModalChangeUmur from '../Components/ModalChangeUmur';
import ModalChangeGender from '../Components/ModalChangeGender';
import { API_URL } from '../helper';
import axios from 'axios';
import ModalChangePassword from '../Components/ModalChangePassword';
import ModalChangePhone from '../Components/ModalChangePhone';
import { getAddress, onLogin } from '../redux/actions';
import Swal from 'sweetalert2';
import ModalAddAddress from '../Components/ModalAddAddress';
import { BsCheckCircle } from 'react-icons/bs';
import MenuManagement from '../Components/MenuManagement';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        modalOpenNama: false,
        modalOpenUmur: false,
        modalOpenGender: false,
        modalOpenPassword: false,
        modalOpenPhone: false,
        openModalAddAddress: false,
        photo: [""],
        latitude: '',
        longitude: '',
        statusGetCoords: null
    }

    componentDidMount() {
        this.props.getAddress()
    }

    handlePhoto = (e) => {
        let temp = [...this.state.photo]
        temp[0] = { name: e.target.files[0].name, file: e.target.files[0] }
        this.setState({
            photo: temp
        })
    }

    onBtSimpan = () => {
        let token = localStorage.getItem("data");
        let data = new FormData()
        data.append('photo', this.state.photo[0].file)
        console.log("cek data photo", data)
        axios.patch(`${API_URL}/users/updatephoto`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log("cek res.data", res.data)
                return Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Update Photo Berhasil',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).then(result => {
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    onBtUbah = () => {
        let data = {
            password: this.inPassword.value
        }
        axios.patch(API_URL + `/users/changepassword`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('data')}`
            }
        })
            .then(res => {
                console.log("cek res.data", res.data)
                alert("change password success")
                this.props.btClose()
                window.location.reload()
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtPilih = (idaddress) => {
        let token = localStorage.getItem('data')
        axios.patch(`${API_URL}/users/chooseaddress/${idaddress}`, { idstatus: 4 }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            Swal.fire(
                'Success!',
                'Alamat utama dipilih',
                'success'
            )
            this.props.getAddress();
            this.printAddressList();
        }).catch((err) => {
            console.log(err)
        })

    }

    onBtRemove = (idaddress) => {
        let token = localStorage.getItem("data");
        axios.delete(`${API_URL}/users/deleteaddress/${idaddress}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            alert("Berhasil Hapus Alamat")
            this.props.getAddress();
        }).catch((err) => {
            console.log(err)
        })
    }


    printAddressList = () => {
        return this.props.addressList.map((value, index) => {
            return (
                <Box>
                    {
                        value.idstatus === 4
                            ?
                            <Box my='10px' borderRadius='10px' boxShadow='md' p='3' border='2px solid #6b3c3b' >
                                <Box display='flex'>
                                    <Heading as='h4' size='sm' mr='10px'>{value.nama_penerima}</Heading>
                                    <Badge variant='subtle' color='#6b3c3b'>utama</Badge>
                                </Box>
                                <Box my='5px'>
                                    <Text fontWeight='semibold' >{value.no_telpon}</Text>
                                </Box>
                                <Box>
                                    <Box display='flex' justifyContent='space-between'>
                                        <Text>{value.alamat}</Text>
                                        <Icon as={BsCheckCircle} boxSize='7' color='#6b3c3b' />
                                    </Box>
                                </Box>
                            </Box>
                            :
                            <Box my='10px' borderRadius='10px' boxShadow='md' p='3'>
                                <Box>
                                    <Heading as='h4' size='sm'>{value.nama_penerima}</Heading>
                                </Box>
                                <Box my='5px'>
                                    <Text fontWeight='semibold' >{value.no_telpon}</Text>
                                </Box>
                                <Box>
                                    <Box display='flex' justifyContent='space-between'>
                                        <Text>{value.alamat}</Text>
                                        <Button size='sm' colorScheme='blackAlpha' bgColor='#6b3c3b' onClick={() => this.onBtPilih(value.idaddress)}>Pilih</Button>
                                    </Box>
                                </Box>
                            </Box>
                    }
                </Box>
            )
        })
    }

    getLocation = () => {
        if (!navigator.geolocation) {
            this.setState({
                statusGetCoords: `Geolocation is not supported by your browser`,
                openModalAddAddress: !this.state.openModalAddAddress
            })
        } else {
            this.setState({
                statusGetCoords: `Locating...`,
                openModalAddAddress: !this.state.openModalAddAddress
            })
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    statusGetCoords: null,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            }, () => {
                this.setState({
                    statusGetCoords: `Unable to retrieve your locationUnable to retrieve your location`
                })
            })
        }
    }
    render() {
        return (
            <Box mx='60px' my='20px'>
                <ModalChangeNama
                    modalOpenNama={this.state.modalOpenNama}
                    btClose={() => this.setState({ modalOpenNama: !this.state.modalOpenNama })}
                />
                <ModalChangeUmur
                    modalOpenUmur={this.state.modalOpenUmur}
                    btClose={() => this.setState({ modalOpenUmur: !this.state.modalOpenUmur })}
                />
                <ModalChangeGender
                    modalOpenGender={this.state.modalOpenGender}
                    btClose={() => this.setState({ modalOpenGender: !this.state.modalOpenGender })}
                />
                <ModalChangePassword
                    modalOpenPassword={this.state.modalOpenPassword}
                    btClose={() => this.setState({ modalOpenPassword: !this.state.modalOpenPassword })}
                />
                <ModalChangePhone
                    modalOpenPhone={this.state.modalOpenPhone}
                    btClose={() => this.setState({ modalOpenPhone: !this.state.modalOpenPhone })}
                />
                <ModalAddAddress
                    openModalAddAddress={this.state.openModalAddAddress}
                    btClose={() => this.setState({ openModalAddAddress: !this.state.openModalAddAddress })}
                    latitude={this.state.latitude}
                    longitude={this.state.longitude}
                    
                />
                <Box display='flex'>
                    <MenuManagement />
                    <Box ml='30px'>
                        <Heading as='h3' size='lg'>Profile saya</Heading>
                        <Box className='d-flex' my='10px'>
                            <BiUser style={{ marginTop: 5, marginRight: 10 }} /><p style={{ fontSize: "16px", fontWeight: 600, color: "gray" }}>{this.props.username}</p>
                        </Box>
                        <Box boxShadow={"sm"} style={{ background: "white", border: "none", borderRadius: "9px" }}>
                            <Tabs>
                                <TabList>
                                    <Tab style={{ fontSize: "14px", fontWeight: 800, color: "#6b3c3b" }}>Biodata Diri</Tab>
                                    <Tab style={{ fontSize: "14px", fontWeight: 800, color: "#6b3c3b" }}>Daftar Alamat</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <Box display='flex'>
                                            <Box>
                                                <Box boxShadow={'md'} style={{ background: "white", border: "none", borderRadius: "9px", width: "20vw" }}>
                                                    <Box>
                                                        <Card style={{ border: "none", marginTop: "13px" }}>
                                                            <CardImg
                                                                alt="Profile Image"
                                                                src={API_URL + this.props.photo}
                                                                style={{ margin: "auto", paddingLeft: 13, paddingRight: 13, borderRadius: "20px" }}
                                                            />
                                                            <CardBody>
                                                                <FormGroup>
                                                                    <Input
                                                                        id="exampleFile"
                                                                        name="file"
                                                                        type="file"
                                                                        onChange={(e) => this.handlePhoto(e)} className='input-radius'
                                                                    />
                                                                    {
                                                                        this.state.photo[0] ?
                                                                            <img src={URL.createObjectURL(this.state.photo[0].file)} alt='...' style={{ marginTop: '15px', marginBottom: '15px' }} />
                                                                            :
                                                                            <img src={API_URL + this.state.photo[0]} alt='...' />
                                                                    }
                                                                    <Box className='col-12' style={{ textAlign: "center" }}>
                                                                        <Button
                                                                            colorScheme={'blackAlpha'}
                                                                            variant='outline'
                                                                            style={{ width: "75%", color: "#6b3c3b" }}
                                                                            onClick={this.onBtSimpan}
                                                                        >
                                                                            Simpan
                                                                        </Button>
                                                                    </Box>
                                                                    <FormText className='text-muted' style={{ width: "90%", margin: "auto", fontSize: "12px" }}>
                                                                        Besar file: maksimum 10.000.000 bytes (10 Megabytes). Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG
                                                                    </FormText>
                                                                </FormGroup>
                                                            </CardBody>
                                                            <Button onClick={() => this.setState({ modalOpenPassword: !this.state.modalOpenPassword })} boxShadow={'sm'} colorScheme='gray' variant='outline' style={{ fontSize: "12px" }}>
                                                                Ubah Kata Sandi
                                                            </Button>
                                                        </Card>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box ml='20px' width='30vw'>
                                                <Box style={{ background: "white", border: "none", borderRadius: "9px" }}>
                                                    <p style={{ paddingTop: "10px", fontSize: "14px", fontWeight: 700 }}>Ubah Biodata Diri</p>
                                                    <Box style={{ paddingTop: "10px" }}>
                                                        <Box display='flex' justifyContent='space-between'>
                                                            <Text className='text-muted' >Nama</Text>
                                                            <Text className='text-muted' >{this.props.nama} <a onClick={() => this.setState({ modalOpenNama: !this.state.modalOpenNama })} style={{ color: "#6b3c3b", cursor: "pointer" }}>Ubah</a></Text>
                                                        </Box>
                                                        <Box display='flex' style={{ paddingTop: "10px" }} justifyContent='space-between'>
                                                            <Text className='text-muted'>Tanggal Lahir</Text>
                                                            <Text className='text-muted'>{this.props.umur} <a onClick={() => this.setState({ modalOpenUmur: !this.state.modalOpenUmur })} style={{ color: "#6b3c3b", cursor: "pointer" }}>Ubah</a></Text>
                                                        </Box>
                                                        <Box display='flex' style={{ paddingTop: "10px" }} justifyContent='space-between'>
                                                            <Text className='text-muted'>Jenis Kelamin</Text>
                                                            <Text className='text-muted'>{this.props.gender} <a onClick={() => this.setState({ modalOpenGender: !this.state.modalOpenGender })} style={{ color: "#6b3c3b", cursor: "pointer" }}>Ubah</a></Text>
                                                        </Box>
                                                    </Box>
                                                    <p style={{ paddingTop: "10px", fontSize: "14px", fontWeight: 700 }}>Ubah Kontak</p>
                                                    <Box style={{ paddingTop: "10px" }}>
                                                        <Box display='flex' justifyContent='space-between'>
                                                            <Text className='text-muted'>Email</Text>
                                                            <Text className='text-muted'>{this.props.email} <a style={{ color: "#6b3c3b" }}>Ubah</a></Text>
                                                        </Box>
                                                        <Box display='flex' style={{ paddingTop: "10px" }} justifyContent='space-between'>
                                                            <Text className='text-muted'>Nomor HP</Text>
                                                            <Text className='text-muted'>{this.props.no_telpon} <a onClick={() => this.setState({ modalOpenPhone: !this.state.modalOpenPhone })} style={{ color: "#6b3c3b", cursor: "pointer" }}>Ubah</a></Text>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel>
                                        <Box>
                                            <div style={{ textAlign: "end", marginTop: "5%" }}>
                                                <Button onClick={this.getLocation} colorScheme='green' size='sm' style={{ borderRadius: 10, fontSize: "15px" }}>Tambah Alamat</Button>
                                            </div>
                                            <Box mt='20px' w='45vw'>
                                                {this.printAddressList()}
                                            </Box>
                                        </Box>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }
}

const mapToProps = (state) => {
    return {
        photo: state.userReducer.photo,
        nama: state.userReducer.nama,
        idaddress: state.userReducer.idaddress,
        umur: state.userReducer.umur,
        email: state.userReducer.email,
        no_telpon: state.userReducer.no_telpon,
        gender: state.userReducer.gender,
        iduser: state.userReducer.iduser,
        addressList: state.userReducer.addressList,
        username: state.userReducer.username
    }
}

export default connect(mapToProps, { getAddress, onLogin })(ProfilePage);