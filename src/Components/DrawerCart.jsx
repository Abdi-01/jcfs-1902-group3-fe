import { Box, Button, Center, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { API_URL } from '../helper'
import { getCartAction } from '../redux/actions'

const DrawerCart = (props) => {
    const [carts, setCarts] = useState([])
    let dispatch = useDispatch()

    useEffect(() => {
        getData()
    }, [props.openCart])

    const getData = async () => {
        try {
            let res = await dispatch(getCartAction())
            if (res.success) {
                setCarts(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const printListProduct = () => {
        if (carts.length > 0) {
            return carts.map((item, index) => {
                let namaProduct = item.products[0].nama.substr(0, 25)
                return (
                    <>
                        <Box mt='25px' display='flex'>
                            <Box mr='10px'>
                                <Image src={`${API_URL}/${item.images[0].url}`} borderRadius='10px' boxShadow='md' boxSize='90px' />
                            </Box>
                            <Center>
                                <Box>
                                    <Box>
                                        <Text fontWeight='semibold'>{namaProduct.length > 18 ? `${namaProduct}. . .` : namaProduct}</Text>
                                    </Box>
                                    <Box mt='10px'>
                                        <Box display='flex'>
                                            <Text mr='25px' >{item.qty} x Rp.{(item.products[0].harga).toLocaleString()}</Text>
                                            <Text color='#6B3C3B' fontWeight='bold'>Rp.{(item.qty * item.products[0].harga).toLocaleString()}</Text>
                                        </Box>
                                    </Box>
                                </Box>
                            </Center>
                        </Box>
                    </>
                )
            })
        } else {
            return (
                <>
                    <Box mt='30px'>
                        <Center>
                            <Heading as='h3' size='md'>Belum ada produk dikeranjang</Heading>
                        </Center>
                    </Box>
                </>
            )
        }
    }

    return (
        <>
            <Drawer isOpen={props.openCart} onClose={props.closeCart} size='sm'>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <Center>Keranjang Belanja</Center>
                    </DrawerHeader>
                    <hr></hr>
                    <DrawerBody>
                        {printListProduct()}
                    </DrawerBody>
                    <DrawerFooter>
                        {
                            carts.length > 0 &&
                            <Link to='/product/checkout'>
                                <Button colorScheme='blackAlpha' bgColor='#6B3C3B' onClick={() => props.closeCart()}>Proses Pesanan</Button>
                            </Link>
                        }
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default DrawerCart