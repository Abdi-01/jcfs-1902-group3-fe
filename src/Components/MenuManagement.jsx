import React, { useState } from 'react'
import { Badge, Box, Center, Collapse, Icon, Image, Menu, Text } from '@chakra-ui/react'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'

const MenuManagement = (props) => {
    const [openPembelian, setOpenPembelian] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)
    const { idrole, menungguBayar } = useSelector((state) => {
        return {
            idrole: state.userReducer.idrole,
            menungguBayar: state.transactionReducer.transaksi
        }
    })
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
                                <Box display='flex'>
                                    <Icon as={MdProductionQuantityLimits} boxSize='7' />
                                    <Center>
                                        <Box ml='20px'>
                                            <Link to='/management/product'>Management Product</Link>
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
                                                        <Text fontSize='12px'>Daftar Transaksi</Text>
                                                    </Box>
                                                </Collapse>
                                            </Box>
                                        </Center>
                                    </Box>
                                </>
                                :
                                <></>
                    }
                </Box>
            </Box>
        </>
    )
}

export default MenuManagement