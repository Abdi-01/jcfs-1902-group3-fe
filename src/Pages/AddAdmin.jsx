import { Box, Button, Container } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { ButtonGroup, Card, CardBody, CardSubtitle, CardText, CardTitle, Input } from 'reactstrap';
import Swal from 'sweetalert2';
import ModalAddAdmin from '../Components/ModalAddAdmin';
import ModalUpdateAdmin from '../Components/ModalUpdateAdmin';
import { API_URL } from '../helper';
import { getAdmin } from '../redux/actions';

class AddAdminPage extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        ModalAddAdmin: false,
        page: 1,
        limit: 4,
        selectedIndex:null,
        dataEdit:{} 
    }

    componentDidMount() {
        this.props.getAdmin()
    }

    deleteAdmin = (iduser) => {
        let token = localStorage.getItem('data')
        // axios.delete(`${API_URL}/admin/deleteadmin/${iduser}`,{
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // })
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete!'
        }).then(async (result) => {
            axios.delete(`${API_URL}/admin/deleteadmin/${iduser}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (result.isConfirmed) {
                Swal.fire(
                    'Berhasil!',
                    'Admin Berhasil di Delete',
                    'success',
                    )
                    this.props.getAdmin() 
                    this.setState({
                        page:1
                    })               
            }
        })
            .catch((err) => {
                console.log(err)
            })
    }

    printBtPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.props.adminList.length / 9); i++) {
            btn.push(<Button
                colorScheme={'blackAlpha'}
                color="#6c3b3c"
                variant={'outline'}
                disabled={this.state.page == i + 1 ? true : false}
                onClick={() => this.setState({ page: i + 1 })}
            >
                {i + 1}
            </Button>)
        }
        return btn;
    }

    printPagination = () => {
        return (
            <Box className='my-5 d-flex justify-content-center'>
                <ButtonGroup>
                    {
                        this.printBtPagination()
                    }
                </ButtonGroup>
            </Box>
        )
    }

    printAdminList = () => {
        let { page } = this.state
        return this.props.adminList.slice(page > 1 ? (page - 1) * 9 : page - 1, page * 9).map((value, index) => {
            return (
                <Box className='col-4' style={{ paddingTop: "1%", paddingBottom: "1%" }}>
                    <Card
                        style={{ borderColor: "#6b3c3b", borderRadius: "9px" }}
                    >
                        <CardBody>
                            <Box>
                                <CardTitle>
                                    <Box style={{ fontWeight: 600 }}>
                                        {value.username}
                                    </Box>
                                </CardTitle>
                            </Box>
                            <Box>
                                <CardSubtitle
                                    className="mb-2 text-muted"
                                >
                                    <p>No Handphone : {value.no_telpon}</p>
                                    <p>Email : {value.email}</p>
                                    <p>{value.nama}</p>
                                </CardSubtitle>
                            </Box>
                            <Box className='row' style={{ width: "50%", paddingTop: "3%" }}>
                                <Box className='col-6'>
                                    <Button
                                        colorScheme={'blackAlpha'}
                                        color='#6b3c3b'
                                        variant='outline'
                                        onClick={() => this.setState({ ModalUpdateAdmin: !this.state.ModalUpdateAdmin, selectedIndex:index,dataEdit:value })}
                                    >
                                        Edit Admin
                                    </Button>
                                </Box>
                                <Box className='col-6' style={{ paddingLeft: "40%" }}>
                                    <Button
                                        colorScheme={'teal'}
                                        onClick={() => this.deleteAdmin(value.iduser)}
                                    >
                                        Delete Admin
                                    </Button>
                                </Box>
                            </Box>
                        </CardBody>
                    </Card>
                </Box>
            )
        })
    }

    render() {
        console.log("cetak adminList", this.props.adminList)
        return (
            <Box className='container'>
                <ModalAddAdmin
                    ModalAddAdmin={this.state.ModalAddAdmin}
                    btClose={() => this.setState({ ModalAddAdmin: !this.state.ModalAddAdmin })}
                />

                <ModalUpdateAdmin
                    ModalUpdateAdmin={this.state.ModalUpdateAdmin}
                    btClose={() => this.setState({ ModalUpdateAdmin: !this.state.ModalUpdateAdmin })}
                    selectedIndex = {this.state.selectedIndex}
                    dataEdit = {this.state.dataEdit}
                />                

                <Box style={{ padding: '3%' }}>
                    <Box style={{ textAlign: "right" }}>
                        <Button
                            colorScheme={'blackAlpha'}
                            color='#6b3c3b'
                            variant={'outline'}
                            onClick={() => this.setState({ ModalAddAdmin: !this.state.ModalAddAdmin })}
                        >
                            Add Admin
                        </Button>
                    </Box>
                    <Box className='row'>
                        {this.printAdminList()}
                    </Box>
                    <Box className='my-5 d-flex justify-content-center'>
                        <ButtonGroup>
                            {
                                this.printBtPagination()
                            }
                        </ButtonGroup>
                    </Box>
                </Box>
            </Box>
        );
    }
}

const mapToProps = (state) => {
    return {
        adminList: state.userReducer.adminList,
    }
}

export default connect(mapToProps, { getAdmin })(AddAdminPage);