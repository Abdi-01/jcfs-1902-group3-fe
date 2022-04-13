import { Box, Button, Container } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import ModalAddAdmin from '../Components/ModalAddAdmin';
import { API_URL } from '../helper';
import { getAdmin } from '../redux/actions';

class AddAdminPage extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        // getNamaWarehouse: [],
        ModalAddAdmin: false
    }

    // getNamaWarehouse = () => {
    //     axios.get(`${API_URL}/admin/getnamawarehouse/${this.props.adminList.idwarehouse}`)
    //         .then((response) => {
    //             console.log("GET NAMA WAREHOUSE", response.getNamaWarehouse)
    //             this.setState({ getNamaWarehouse: response.getNamaWarehouse })
    //         }).catch((error) => {
    //             console.log(error)
    //         })
    // }

    componentDidMount() {
        this.props.getAdmin()
    }

    printAdminList = () => {
        return this.props.adminList.map((value, index) => {
            return (
                <Box className='col-6' style={{ paddingTop: "1%", paddingBottom: "1%" }}>
                    <Card
                        style={{ borderColor: "#6b3c3b", borderRadius: "9px" }}
                    >
                        <CardBody>
                            <Box className='row'>
                                <CardTitle className='col-9'>
                                    <Box style={{ fontWeight: 600 }}>
                                        {value.username}
                                    </Box>
                                </CardTitle>
                                <CardTitle className='col-3'>
                                    <Box style={{ fontWeight: 600 }}>

                                    </Box>
                                </CardTitle>
                            </Box>
                            <Box>
                                <CardSubtitle
                                    className="mb-2 text-muted"
                                >
                                    <p>No Handphone : {value.no_telpon}</p>
                                    <p>Email : {value.email}</p>
                                    <p>Warehouse : {value.nama}</p>
                                </CardSubtitle>
                            </Box>
                            <Box className='row' style={{ width: "40%", paddingTop: "3%" }}>
                                <Box className='col-6'>
                                    <Button
                                        colorScheme={'blackAlpha'}
                                        color='#6b3c3b'
                                        variant='outline'
                                    >
                                        Edit Admin
                                    </Button>
                                </Box>
                                <Box className='col-6' style={{ paddingLeft: "30%" }}>
                                    <Button
                                        colorScheme={'teal'}
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
                <Box style={{ padding: '8%' }}>
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