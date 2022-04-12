import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Stack,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Input, Label } from 'reactstrap'
import { API_URL } from '../helper'
import { logOutAction } from '../redux/actions'

// Management Product, Transaksi, Report
const DrawerAdmin = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [users, setUsers] = useState()
    const dispatch = useDispatch()
    const { photo, username } = useSelector((state) => {
        return {
            photo: state.userReducer.photo,
            username: state.userReducer.username
        }
    })

    return (
        <>
            <Drawer
                isOpen={props.openAdmin}
                placement='right'
                onClose={props.closeAdmin}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader style={{ padding: 40, textAlign: "center" }}>
                        <img style={{ borderRadius: "50%" }} src={API_URL + photo}></img>
                        <h5 style={{ paddingTop: "20px" }}>{username}</h5>
                    </DrawerHeader>

                    <DrawerBody style={{ margin:"auto" }}>
                        <Stack spacing={8}>
                            <Link to='/management/product'>
                                <Button colorScheme={'blackAlpha'} variant='outline' style={{ width: "200px" }} color='#6b3c3b' fontWeight={'600'} fontSize={'18px'}>Management Product</Button>
                            </Link>
                            {/* <Link> */}
                            <Button colorScheme={'blackAlpha'} variant='outline' style={{ width: "200px" }} color='#6b3c3b' fontWeight={'600'} fontSize={'18px'}>Transaction</Button>
                            {/* </Link> */}
                            {/* <Link> */}
                            <Button colorScheme={'blackAlpha'} variant='outline' style={{ width: "200px" }} color='#6b3c3b' fontWeight={'600'} fontSize={'18px'}>Report</Button>
                            {/* </Link> */}
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter style={{margin:'auto'}}>
                        <Link to='/'>
                            <Button
                                variant='solid'
                                colorScheme={'teal'}
                                mr={3}
                                onClick={() => {
                                    localStorage.removeItem("data");
                                    dispatch(logOutAction());
                                }}
                            >
                                Logout
                            </Button>
                        </Link>                        
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default DrawerAdmin