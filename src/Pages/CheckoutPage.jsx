import { Box, Center, Heading, Image, Text, InputGroup, InputLeftElement, InputRightElement, Input, Icon, Button } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_URL } from '../helper'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai'
import { deleteCartAction, updateQtyCartAction } from '../redux/actions'

const CheckoutPage = () => {
    let dispatch = useDispatch()
    const { carts } = useSelector((state) => {
        return {
            carts: state.transactionReducer.carts
        }
    })

    const btIncrement = (index, idcart) => {
        let temp = [...carts]
        if (temp[index].qty < temp[index].stocks[0].qty) {
            temp[index].qty += 1
        }
        dispatch(updateQtyCartAction(idcart, { qty: temp[index].qty }))
    }
    const btDecrement = (index, idcart) => {
        let temp = [...carts]
        if (temp[index].qty > 1) {
            temp[index].qty -= 1
        } else {
            dispatch(deleteCartAction(idcart))
        }
        dispatch(updateQtyCartAction(idcart, { qty: temp[index].qty }))
    }
    const btDeleteCart = (idcart) => {
        dispatch(deleteCartAction(idcart))
    }
    const printSubtotal = () => {
        let total = 0
        if (carts.length > 0) {
            carts.forEach((item, index) => {
                total += (item.qty * item.products[0].harga)
            })
        }
        return total
    }
    const printProductCart = () => {
        if (carts.length > 0) {
            return carts.map((item, index) => {
                return (
                    <>
                        <Box mt='20px' p='4' borderBottom='6px solid #F3F4F5'>
                            <Box display='flex' justifyContent='space-between'>
                                <Box>
                                    <Image src={`${API_URL}/${item.images[0].url}`} boxSize='100px' boxShadow='md' borderRadius='10px' />
                                </Box>
                                <Center>
                                    <Box display='flex'>
                                        <Center>
                                            <Box mx='15px' width={'170px'}>
                                                <Text fontWeight='bold'>{item.products[0].nama}</Text>
                                                <Text mt='10px'>{item.qty} x Rp.{(item.products[0].harga.toLocaleString())}</Text>
                                            </Box>
                                            <Box mr='30px'>
                                                <InputGroup w='95px'>
                                                    <InputLeftElement children={<Icon as={AiOutlineMinus} />} cursor='pointer' onClick={() => btDecrement(index, item.idcart)} />
                                                    <Input value={item.qty} />
                                                    <InputRightElement children={<Icon as={AiOutlinePlus} />} cursor='pointer' onClick={() => btIncrement(index, item.idcart)} />
                                                </InputGroup>
                                            </Box>
                                            <Box>
                                                <Heading as='h6' color='#6B3C3B' size='md'>Rp.{(item.qty * item.products[0].harga).toLocaleString()}</Heading>
                                            </Box>
                                            <Box>
                                                <Icon ml='15px' as={AiOutlineDelete} boxSize='7' cursor='pointer' onClick={() => btDeleteCart(item.idcart)} />
                                            </Box>
                                        </Center>
                                    </Box>
                                </Center>
                            </Box>
                        </Box>
                    </>
                )
            })
        } else {
            return (
                <>
                    <Box mx='10vw' my='60vh'>
                        <Heading as='h2' size='lg'>
                            Belum Ada Barang
                        </Heading>
                    </Box>
                </>
            )
        }
    }

    return (
        <>
            {console.log('isi cart', carts)}
            <Box marginX={'8vw'} marginY={'5vh'}>
                <Box display='flex' justifyContent='space-between'>
                    <Box >
                        <Heading as='h3' size='lg' mb='40px'>
                            Keranjang
                        </Heading>
                        {printProductCart()}
                    </Box>
                    <Box>
                        <Box w='30vw' borderRadius='15px' boxShadow='md' p='5'>
                            <Box borderBottom='2px solid #F3F4F5'>
                                <Text fontWeight='bold' mb='10px'>Alamat Pengiriman</Text>
                            </Box>
                            <Box mt='20px' borderBottom='2px solid #F3F4F5'>
                                <Text fontWeight='semibold' mb='5px'>Alif Junjunan</Text>
                                <Text my='5px'>628882220001</Text>
                                <Text mb='10px' fontSize='13px'>Jl. Ki Buyut Roda Gang Pelita 1 No.25 RT.02 RW.03
                                    Ciledug, Kab. Cirebon, 45188</Text>
                            </Box>
                            <Box mt='20px' borderBottom='5px solid #F3F4F5'>
                                <Button colorScheme='gray' mb='15px'>Pilih Alamat Lain</Button>
                            </Box>
                            <Box mt='30px' borderBottom='2px solid #F3F4F5'>
                                <Text fontWeight='bold' mb='10px'>Alamat Toko</Text>
                            </Box>
                            <Box mt='20px' borderBottom='2px solid #F3F4F5'>
                                <Text fontWeight='semibold' mb='5px'>Warehouse Cirebon</Text>
                                <Text my='5px'>628882220001</Text>
                                <Text mb='10px' fontSize='13px'>Jl. Ki Buyut Roda Gang Pelita 1 No.25 RT.02 RW.03
                                    Ciledug, Kab. Cirebon, 45188</Text>
                            </Box>
                            <Box mt='20px' borderBottom='5px solid #F3F4F5'>
                                <Button colorScheme='gray' mb='15px'>Pilih Toko Lain</Button>
                            </Box>
                            <Box mt='20px' borderBottom='5px solid #F3F4F5'>
                                <Button colorScheme='gray' mb='15px'>Pilih Pengiriman</Button>
                            </Box>
                            <Box mt='25px' borderBottom='2px solid #F3F4F5'>
                                <Text fontWeight='bold' mb='10px'>Ringkasan Belanja</Text>
                            </Box>
                            <Box mt='20px' borderBottom='2px solid #F3F4F5'>
                                <Box display='flex' justifyContent='space-between'>
                                    <Text fontWeight='semibold' mb='10px'>Sub Total</Text>
                                    <Text fontWeight='semibold' mb='10px'>Rp.{printSubtotal().toLocaleString()}</Text>
                                </Box>
                                <Box display='flex' justifyContent='space-between'>
                                    <Text fontWeight='semibold' mb='10px'>Total Ongkos Kirim</Text>
                                    <Text fontWeight='semibold' mb='10px'>Rp.500.000</Text>
                                </Box>
                            </Box>
                            <Box mt='15px'>
                                <Box display='flex' justifyContent='space-between'>
                                    <Text fontWeight='bold' mb='10px'>Total Tagihan</Text>
                                    <Text fontWeight='semibold' mb='10px'>Rp.100.500.000</Text>
                                </Box>
                            </Box>
                            <Box mt='15px'>
                                <Center>
                                    <Button colorScheme='blackAlpha' bgColor='#6B3C3B' w='100%'>Checkout</Button>
                                </Center>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default CheckoutPage