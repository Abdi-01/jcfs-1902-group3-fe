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
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Input, Label } from 'reactstrap'
import { API_URL } from '../helper'
import { logOutAction } from '../redux/actions'


function DrawerUser(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [users, setUsers] = useState()
    const dispatch = useDispatch()

    // useEffect(() => {

    // }),(props.openUser)

    return (
        <>
            {/* <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                Open
            </Button> */}
            <Drawer
                isOpen={props.openUser}
                placement='right'
                onClose={props.closeUser}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <Label>
                            <p>dispatch(props.username())</p>
                            </Label>
                    </DrawerHeader>

                    <DrawerBody>
                        <Input placeholder='Type here...' />
                    </DrawerBody>

                    <DrawerFooter>
                        <Link to='/'>
                            <Button
                                variant='outline'
                                mr={3}
                                onClick={() => {
                                    localStorage.removeItem("data");
                                    window.location.reload()
                                    dispatch(logOutAction());
                                }}
                            >
                                Logout
                            </Button>
                        </Link>
                        <Button colorScheme='blue'>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default DrawerUser