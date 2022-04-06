import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Button } from '@chakra-ui/react'
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

    render() {
        return (
            <Box style={{ backgroundColor: "rgb(239, 236, 234)", height: "90vh" }}>
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
                <Box className='container' style={{ padding: 50 }}>
                    <Box className='row' paddingTop={5} paddingBottom={5}>
                        <Box className='col-2'>
                            <Box style={{}}>

                            </Box>
                        </Box>
                        <Box className='col-8'>
                            <Box className='d-flex' paddingBottom={2}>
                                <BiUser style={{ marginTop: 5, marginRight: 10 }} /><p style={{ fontSize: "16px", fontWeight: 600, color: "gray" }}>{this.props.nama}</p>
                            </Box>
                            <Box boxShadow={"sm"} style={{ height: '67vh', background: "white", border: "none", borderRadius: "9px" }}>
                                <Tabs>
                                    <TabList>
                                        <Tab style={{ fontSize: "14px", fontWeight: 800, color: "#6b3c3b" }}>Biodata Diri</Tab>
                                        <Tab>Two</Tab>
                                        <Tab>Three</Tab>
                                    </TabList>

                                    <TabPanels>
                                        <TabPanel>
                                            <Box className='row'>
                                                {/* <Box className='col-1'>
                                                <Box style={{}}>

                                                </Box>
                                            </Box> */}
                                                <Box className='col-5'>
                                                    <Box boxShadow={'md'} style={{ height: '43vh', background: "white", border: "none", borderRadius: "9px", width: "15vw" }}>
                                                        <Box>
                                                            <Card style={{ border: "none", marginTop: "13px" }}>
                                                                <CardImg
                                                                    alt="Profile Image"
                                                                    src={this.props.photo}
                                                                    style={{ margin: "auto", paddingLeft: 13, paddingRight: 13, borderRadius: "20px" }}
                                                                />
                                                                <CardBody>
                                                                    <FormGroup>
                                                                        {/* <Uploader action="//jsonplaceholder.typicode.com/posts/" />                                                                                                                                     */}
                                                                        <Input
                                                                            id="exampleFile"
                                                                            name="file"
                                                                            type="file"
                                                                        />
                                                                        <FormText className='text-muted' style={{ width: "90%", margin: "auto", fontSize: "12px" }}>
                                                                            Besar file: maksimum 10.000.000 bytes (10 Megabytes). Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG
                                                                        </FormText>
                                                                    </FormGroup>
                                                                    {/* <CardText className='text-muted' style={{ width: "90%", margin: "auto", fontSize: "12px" }}>
                                                                    Besar file: maksimum 10.000.000 bytes (10 Megabytes). Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG
                                                                </CardText> */}
                                                                </CardBody>
                                                                <Button onClick={() => this.setState({ modalOpenPassword: !this.state.modalOpenPassword })} boxShadow={'sm'} colorScheme='gray' variant='outline' style={{ fontSize: "12px" }}>
                                                                    Ubah Kata Sandi
                                                                </Button>
                                                            </Card>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                {/* <Box className='col-3'>
                                                <Box style={{}}>

                                                </Box>
                                            </Box> */}
                                                <Box className='col-7'>
                                                    <Box style={{ height: '45vh', background: "white", border: "none", borderRadius: "9px" }}>
                                                        <p style={{ paddingTop: "10px", fontSize: "14px", fontWeight: 700 }}>Ubah Biodata Diri</p>
                                                        <Row style={{ paddingTop: "10px" }}>
                                                            <Box className='row'>
                                                                <span className='text-muted col-4' style={{ paddingRight: "50px", fontSize: "13px" }}>Nama</span>
                                                                <span className='text-muted col-8' style={{ paddingRight: "20px", fontSize: "13px" }}>{this.props.nama} <a onClick={() => this.setState({ modalOpenNama: !this.state.modalOpenNama })} style={{ color: "#6b3c3b", cursor: "pointer" }}>Ubah</a></span>
                                                            </Box>
                                                            <Box className='row' style={{ paddingTop: "10px" }}>
                                                                <span className='text-muted col-4' style={{ paddingRight: "50px", fontSize: "13px" }}>Tanggal Lahir</span>
                                                                <span className='text-muted col-8' style={{ paddingRight: "20px", fontSize: "13px" }}>{this.props.umur} <a onClick={() => this.setState({ modalOpenUmur: !this.state.modalOpenUmur })} style={{ color: "#6b3c3b", cursor: "pointer" }}>Ubah</a></span>
                                                            </Box>
                                                            <Box className='row' style={{ paddingTop: "10px" }}>
                                                                <span className='text-muted col-4' style={{ paddingRight: "50px", fontSize: "13px" }}>Jenis Kelamin</span>
                                                                <span className='text-muted col-8' style={{ paddingRight: "20px", fontSize: "13px" }}>{this.props.gender} <a onClick={() => this.setState({ modalOpenGender: !this.state.modalOpenGender })} style={{ color: "#6b3c3b", cursor: "pointer" }}>Ubah</a></span>
                                                            </Box>
                                                        </Row>
                                                        <p style={{ paddingTop: "10px", fontSize: "14px", fontWeight: 700 }}>Ubah Kontak</p>
                                                        <Row style={{ paddingTop: "10px" }}>
                                                            <Box className='row'>
                                                                <span className='text-muted col-4' style={{ paddingRight: "50px", fontSize: "13px" }}>Email</span>
                                                                <span className='text-muted col-8' style={{ paddingRight: "20px", fontSize: "13px" }}>{this.props.email} <a style={{ color: "#6b3c3b" }}>Ubah</a></span>
                                                            </Box>
                                                            <Box className='row' style={{ paddingTop: "10px" }}>
                                                                <span className='text-muted col-4' style={{ paddingRight: "50px", fontSize: "13px" }}>Nomor HP</span>
                                                                <span className='text-muted col-8' style={{ paddingRight: "20px", fontSize: "13px" }}>{this.props.no_telpon} <a onClick={() => this.setState({ modalOpenPhone: !this.state.modalOpenPhone })} style={{ color: "#6b3c3b", cursor: "pointer" }}>Ubah</a></span>
                                                            </Box>
                                                        </Row>
                                                    </Box>
                                                </Box>
                                                {/* <Box className='col-1'>
                                                <Box style={{}}>

                                                </Box>
                                            </Box> */}
                                            </Box>
                                        </TabPanel>
                                        <TabPanel>
                                            <p>two!</p>
                                        </TabPanel>
                                        <TabPanel>
                                            <p>three!</p>
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </Box>
                        </Box>
                    </Box>
                    <Box className='col-2'>
                        <Box style={{}}>

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
        umur: state.userReducer.umur,
        email: state.userReducer.email,
        no_telpon: state.userReducer.no_telpon,
        gender: state.userReducer.gender
    }
}

export default connect(mapToProps)(ProfilePage);