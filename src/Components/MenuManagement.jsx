import React, { useState, useEffect } from 'react'
import { Badge, Box, Center, Collapse, Icon, Image, Menu, Text } from '@chakra-ui/react'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'
import { CgProfile, CgFileDocument } from 'react-icons/cg'
import axios from 'axios'
import { API_URL } from '../helper'

const MenuManagement = (props) => {
    const [openPembelian, setOpenPembelian] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)
    const [openManagement, setOpenManagement] = useState(false)
    const [menungguBayar, setMenungguBayar] = useState([])
    const { idrole } = useSelector((state) => {
        return {
            idrole: state.userReducer.idrole,
        }
    })
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        try {
            let token = localStorage.getItem('data')
            let res = await axios.get(`${API_URL}/transactions?idstatus=6`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (res.data.success) {
                setMenungguBayar(res.data.dataTransaksi)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Box w='20vw' h='40vw' borderRadius='15px' boxShadow='lg'>
                <Box display='flex' p='5'>
                    <Image boxSize='80px' borderRadius='full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlYdOdFhSlfKukj6FKFx_SvqfRy9h6ld8Ki2C87CxBdDsFgZ5BAEy2iF8aO1mGpVesGHg&usqp=CAU' />
                    <Center>
                        <Box>
                            <Text ml='10px'>John Doe</Text>
                            {
                                idrole == 2 ?
                                    <Text ml='10px'>Admin</Text>
                                    :
                                    idrole == 3 ?
                                        <Text ml='10px'>User</Text>
                                        :
                                        <Text ml='10px'>Super Admin</Text>

                            }
                        </Box>
                    </Center>
                </Box>
                <hr />
                <Box p='4'>
                    {
                        idrole == 2 ?
                            <>
                                <Box display='flex' justifyContent='space-between' borderBottom='1.5px solid gray'>
                                    <Icon as={CgProfile} boxSize='7' />
                                    <Center mb='10px'>
                                        <Box>
                                            <Text fontWeight='semibold' cursor='pointer' fontSize='15px' onClick={() => setOpenProfile(!openProfile)}>Profile Saya<Icon as={openProfile ? FaChevronUp : FaChevronDown} ml='70px' /></Text>
                                            <Collapse in={openProfile} animateOpacity>
                                                <Box my='15px' cursor='pointer'>
                                                    <Link to='/profile'>
                                                        <Text fontSize='12px'>Pengaturan</Text>
                                                    </Link>
                                                </Box>
                                            </Collapse>
                                        </Box>
                                    </Center>
                                </Box>
                                <Box my='15px' display='flex' justifyContent='space-between' borderBottom='1.5px solid gray'>
                                    <Icon as={CgFileDocument} boxSize='7' />
                                    <Center mb='10px'>
                                        <Box>
                                            <Text fontWeight='semibold' cursor='pointer' fontSize='15px' onClick={() => setOpenManagement(!openManagement)}>Management<Icon as={openManagement ? FaChevronUp : FaChevronDown} ml='60px' /></Text>
                                            <Collapse in={openManagement} animateOpacity>
                                                <Box my='15px' cursor='pointer'>
                                                    <Link to='/management/product'>
                                                        <Text fontSize='12px'>Product</Text>
                                                    </Link>
                                                </Box>
                                            </Collapse>
                                        </Box>
                                    </Center>
                                </Box>
                                <Box my='15px' display='flex' justifyContent='space-between' borderBottom='1.5px solid gray'>
                                    <Icon as={MdProductionQuantityLimits} boxSize='7' />
                                    <Center mb='10px'>
                                        <Box>
                                            <Text fontWeight='semibold' cursor='pointer' fontSize='15px' onClick={() => setOpenPembelian(!openPembelian)}>Pembelian<Icon as={openPembelian ? FaChevronUp : FaChevronDown} ml='80px' /></Text>
                                            <Collapse in={openPembelian} animateOpacity>
                                                <Box my='15px' cursor='pointer'>
                                                    <Link to='/transaction/admin/list'>
                                                        <Text fontSize='12px'>Daftar Transaksi</Text>
                                                    </Link>
                                                </Box>
                                            </Collapse>
                                        </Box>
                                    </Center>
                                </Box>
                            </>
                            :
                            idrole == 3 ?
                                <>
                                    <Box display='flex' justifyContent='space-between' borderBottom='1.5px solid gray'>
                                        <Icon as={CgProfile} boxSize='7' />
                                        <Center mb='10px'>
                                            <Box>
                                                <Text fontWeight='semibold' cursor='pointer' fontSize='15px' onClick={() => setOpenProfile(!openProfile)}>Profile Saya<Icon as={openProfile ? FaChevronUp : FaChevronDown} ml='80px' /></Text>
                                                <Collapse in={openProfile} animateOpacity>
                                                    <Box my='15px' cursor='pointer'>
                                                        <Link to='/profile'>
                                                            <Text fontSize='12px'>Pengaturan</Text>
                                                        </Link>
                                                    </Box>
                                                </Collapse>
                                            </Box>
                                        </Center>
                                    </Box>
                                    <Box my='15px' display='flex' justifyContent='space-between' borderBottom='1.5px solid gray'>
                                        <Icon as={MdProductionQuantityLimits} boxSize='7' />
                                        <Center mb='10px'>
                                            <Box>
                                                <Text fontWeight='semibold' cursor='pointer' fontSize='15px' onClick={() => setOpenPembelian(!openPembelian)}>Pembelian <Icon as={openPembelian ? FaChevronUp : FaChevronDown} ml='80px' /></Text>
                                                <Collapse in={openPembelian} animateOpacity>
                                                    <Box my='15px' cursor='pointer' display='flex' justifyContent='space-between'>
                                                        <Link to='/payment'>
                                                            <Text fontSize='12px'>Menunggu Pembayaran</Text>
                                                        </Link>
                                                        {
                                                            menungguBayar.length > 0 &&
                                                            <Badge borderRadius='full' color='white' w='19px' h='19px' bgColor='red' ><Center>{menungguBayar.length}</Center></Badge>
                                                        }
                                                    </Box>
                                                    <Box my='15px' cursor='pointer'>
                                                        <Link to='/transaction/list'>
                                                            <Text fontSize='12px'>Daftar Transaksi</Text>
                                                        </Link>
                                                    </Box>
                                                </Collapse>
                                            </Box>
                                        </Center>
                                    </Box>
                                </>
                                :
                                <>
                                    <Box display='flex' justifyContent='space-between' borderBottom='1.5px solid gray'>
                                        <Icon as={CgProfile} boxSize='7' />
                                        <Center mb='10px'>
                                            <Box>
                                                <Text fontWeight='semibold' cursor='pointer' fontSize='15px' onClick={() => setOpenProfile(!openProfile)}>Profile Saya<Icon as={openProfile ? FaChevronUp : FaChevronDown} ml='70px' /></Text>
                                                <Collapse in={openProfile} animateOpacity>
                                                    <Box my='15px' cursor='pointer'>
                                                        <Link to='/profile'>
                                                            <Text fontSize='12px'>Pengaturan</Text>
                                                        </Link>
                                                    </Box>
                                                </Collapse>
                                            </Box>
                                        </Center>
                                    </Box>
                                    <Box my='15px' display='flex' justifyContent='space-between' borderBottom='1.5px solid gray'>
                                    <Icon as={MdProductionQuantityLimits} boxSize='7' />
                                    <Center mb='10px'>
                                        <Box>
                                            <Text fontWeight='semibold' cursor='pointer' fontSize='15px' onClick={() => setOpenPembelian(!openPembelian)}>Pembelian<Icon as={openPembelian ? FaChevronUp : FaChevronDown} ml='80px' /></Text>
                                            <Collapse in={openPembelian} animateOpacity>
                                                <Box my='15px' cursor='pointer'>
                                                    <Link to='/transaction/admin/list'>
                                                        <Text fontSize='12px'>Daftar Transaksi</Text>
                                                    </Link>
                                                </Box>
                                            </Collapse>
                                        </Box>
                                    </Center>
                                </Box>
                                </>
                    }
                </Box>
            </Box>
        </>
    )
}

export default MenuManagement