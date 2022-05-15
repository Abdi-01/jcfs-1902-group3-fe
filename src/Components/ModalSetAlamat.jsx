import { Box, Heading, Text, Badge, Icon, Modal, Button, ModalCloseButton, ModalContent, ModalOverlay, ModalBody, ModalHeader } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsCheckCircle } from 'react-icons/bs';
import axios from 'axios';
import { API_URL } from '../helper';
import { getAddress } from '../redux/actions';
import { Link } from 'react-router-dom';

const ModalSetAlamat = (props) => {
    const [alamat, setAlamat] = useState([])
    let dispatch = useDispatch()
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        try {
            let res = await dispatch(getAddress())
            if (res.success) {
                setAlamat(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const btPilihAlamat = async (idaddress) => {
        try {
            let token = localStorage.getItem('data')
            if (token) {
                let res = await axios.patch(`${API_URL}/users/chooseaddress/${idaddress}`, { idstatus: 4 }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    props.closeModal()
                    getData()
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    const printAlamat = () => {
        if (alamat.length > 0) {
            return alamat.map((item, index) => {
                return (
                    <>
                        {
                            item.idstatus == 4 ?
                                <Box my='10px' borderRadius='10px' boxShadow='md' p='3' border='2px solid #6b3c3b' >
                                    <Box display='flex'>
                                        <Heading as='h4' size='sm' mr='10px'>{item.nama_penerima}</Heading>
                                        <Badge variant='subtle' color='#6b3c3b'>utama</Badge>
                                    </Box>
                                    <Box my='5px'>
                                        <Text fontWeight='semibold' >{item.no_telpon}</Text>
                                    </Box>
                                    <Box>
                                        <Box display='flex' justifyContent='space-between'>
                                            <Text>{item.alamat}</Text>
                                            <Icon as={BsCheckCircle} boxSize='7' color='#6b3c3b' />
                                        </Box>
                                    </Box>
                                </Box>
                                :
                                <Box my='10px' borderRadius='10px' boxShadow='md' p='3'>
                                    <Box>
                                        <Heading as='h4' size='sm'>{item.nama_penerima}</Heading>
                                    </Box>
                                    <Box my='5px'>
                                        <Text fontWeight='semibold' >{item.no_telpon}</Text>
                                    </Box>
                                    <Box>
                                        <Box display='flex' justifyContent='space-between'>
                                            <Text>{item.alamat}</Text>
                                            <Button size='sm' colorScheme='blackAlpha' bgColor='#6b3c3b' onClick={() => btPilihAlamat(item.idaddress)}>Pilih</Button>
                                        </Box>
                                    </Box>
                                </Box>
                        }
                    </>
                )
            })
        } else {
            return (
                <>
                    <Box display='flex' justifyContent='center' my='15vh'>
                        <Heading as='h3' size='md'>Anda belum memiliki alamat pengiriman</Heading>
                    </Box>
                    <Box display='flex' justifyContent='end' mb='3vh'>
                        <Link to='/profile'> 
                            <Button colorScheme='whatsapp'>Tambah alamat</Button>
                        </Link>
                    </Box>
                </>
            )
        }
    }
    return (
        <>
            {/* {console.log('isi alamat', alamat)} */}
            <Modal isOpen={props.openModal} onClose={props.closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader mx='auto'>Pilih Alamat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {printAlamat()}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalSetAlamat