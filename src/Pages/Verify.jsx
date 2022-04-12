import axios from "axios"
import { Navigate } from "react-router"
import { API_URL } from "../helper"
import { verifyAction } from "../redux/actions"

import React from 'react';
import { connect } from "react-redux"
import { Box, Button } from "@chakra-ui/react"
class VerifyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }
    verify = async () => {
        try {
            let res = await (this.props.verifyAction())
            console.log("tes res asdsdasdasdasdwqesad")
            if (res) {
                this.setState({ redirect: true })
            }
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        if (this.state.redirect) {
            return <Navigate to='/' />
        }
        return (
            <Box>
                <Box className='bg-image-verify' style={{ height: "75vh", backgroundRepeat: "no-repeat", width: "100%", backgroundSize: "cover", backgroundPosition: "80% 40%", backgroundImage: "url('https://images.unsplash.com/photo-1495195129352-aeb325a55b65?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80')" }}>
                </Box>
                <Box className="bg-text container">
                    <Box className="text-center" style={{ margin: "auto" }}>
                        <Box style={{ fontSize: "48px", fontWeight: 600, marginBottom: "50px" }}>WE ARE CARPENTER COMPANY</Box>
                        <Box style={{ fontSize: "17px", paddingTop: "" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic earum optio maxime voluptate iure non culpa magni quidem laudantium dolor? Atque consequatur veniam illo odit magnam dolorem architecto. Pariatur, tempore.</Box>
                        <Box style={{ paddingTop: "35px" }}>
                            <Button colorScheme={'teal'} variant='solid' onClick={this.verify}>Verifikasi Akun</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }
}


export default connect(null, { verifyAction })(VerifyPage);