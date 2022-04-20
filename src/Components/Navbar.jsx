import React, { useEffect, useState } from 'react'
import { Badge, Box, Button, Center, Flex, Heading, HStack, Icon, Image, Input, InputGroup, Spacer, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsCart3, BsPerson } from 'react-icons/bs'
import logoWeb from '../assets/web-icon.png'
import DrawerCart from './DrawerCart'
import DrawerUser from './DrawerUser'
import DrawerAdmin from './DrawerAdmin'

const Navbar = () => {

    const [openCart, setOpenCart] = useState(false)
    const [openUser, setOpenUser] = useState(false)
    const [openAdmin, setOpenAdmin] = useState(false)
    const { dataKategori, carts, username, idrole } = useSelector((state) => {

        return {
            dataKategori: state.kategoriReducer.listKategori,
            carts: state.transactionReducer.carts,
            username: state.userReducer.username,
            idrole: state.userReducer.idrole
        }
    })

    const printKategori = () => {
        if (dataKategori.length > 0) {
            return dataKategori.map((item, index) => {
                return (
                    <Link to={`/product?kategori=${item.idkategori}`} state={dataKategori[index]}>
                        <Text fontSize={'lg'} fontWeight='bold' color={'#6b3c3b'}>
                            {item.kategori}
                        </Text>
                    </Link>
                )
            })
        }
    }
    const setTotalCart = () => {
        let total = 0
        if (carts.length > 0) {
            carts.forEach((item, index) => {
                total = total + item.qty
            })
        }
        return total
    }
    return (
        <>
            <Box bg={'white'} height='10vh' boxShadow='md' position='sticky'>
                <Box mx='90px' display='flex'>
                    <Center>
                        <Box position='absolute'>
                            <Link to='/'>
                                <Image src={logoWeb} w='200px' position='relative' left='55px' />
                            </Link>
                        </Box>
                    </Center>
                    <Center ml='45vh'>
                        <HStack spacing={'80px'} margin='2vw' height='2vh' color={'white'}>
                            {printKategori()}
                        </HStack>
                    </Center>
                    {username &&
                        <Center ml='25vh'>
                            <Box display='flex'>
                                <Box mr='20px'>
                                    <Icon as={BsCart3} boxSize='22px' position='relative' left='8px' cursor='pointer' onClick={() => setOpenCart(!openCart)} />
                                    {
                                        carts.length > 0 && <Badge position='absolute' borderRadius='full' color='white' w='19px' h='19px' bgColor='#6B3C3B'><Center>{setTotalCart()}</Center></Badge>

                                    }
                                    <DrawerCart openCart={openCart} closeCart={() => setOpenCart(!openCart)} />
                                </Box>
                                <Box>
                                    <Link to='/profile'>
                                        <Icon as={BsPerson} boxSize='20px' cursor='pointer' />
                                    </Link>
                                </Box>
                            </Box>
                        </Center>
                    }
                </Box>
            </Box>
        </>
    )
}

export default Navbar
