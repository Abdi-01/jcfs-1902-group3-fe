import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Flex, Heading, HStack, Icon, Image, InputGroup, Spacer, Text, Checkbox, Select } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getJenisProductAction, getProductAction, getProductAdminAction, getWarehouse, sortingProductAction } from '../redux/actions'
import { Link, useLocation } from 'react-router-dom'
import semuaProduct from '../assets/semua produk.png'
import { transform } from 'framer-motion'
import { Pagination } from '@mantine/core'
import { API_URL } from '../helper'
import { FormGroup, Label, Input } from 'reactstrap'

const AdminRequest = () => {

    const dispatch = useDispatch()
    const { state } = useLocation()
    const [inIdwarehouse, setInIdwarehouse] = useState('')
    const [page, setPage] = useState(1)
    const [limitData, setLimitData] = useState(6)
    const { productAdminList, warehouseList } = useSelector((state) => {
        return {
            productAdminList: state.transactionAdminReducer.productAdminList,
            warehouseList: state.userReducer.warehouseList
        }
    })
    useEffect(() => {
        dispatch(getProductAdminAction())
        dispatch(getWarehouse())
    }, [state])

    const printWarehouse = () => {
        if (warehouseList.length > 0) {
            return warehouseList.map((item, index) => {
                return (
                    <option key={item.idwarehouse} value={item.idwarehouse}>{item.nama}</option>
                )
            })
        }
    }

    const printProduct = () => {
        { console.log('productAdminList: ', productAdminList) }
        { console.log('warehouseList: ', warehouseList) }
        if (productAdminList.length > 0) {
            return productAdminList.slice(page > 1 ? (page - 1) * limitData : page - 1, page * limitData).map((item, index) => {
                return (
                    <>
                        <Link to={`/detail/productreq?idwarehouse=${item.idwarehouse}&idproduct=${item.idproduct}`} state={item}  >
                            <Box maxW={'275px'} mt='80px' cursor='pointer' color='#6B3C3B' >
                                <Box display='flex'>
                                    <Box position='absolute'>
                                        <Image src={`${API_URL}/${item.material[0].url}`} zIndex='1' boxSize='45px' position='relative' top='-5px' left='30px' />
                                    </Box>
                                    <Box ml='85px'>
                                        <Text fontSize='15px' fontWeight='medium' top='-5px' position='relative'>{item.material[0].material}</Text>
                                    </Box>
                                </Box>
                                <Box maxW={'250px'} overflow='hidden' borderRadius='15px' boxShadow='lg' className='item-product'>
                                    <Image src={`${API_URL}/${item.images[0].url}`} width='100%' transition='transform 1.2s ease-in-out' _hover={{ transform: "scale(1.1)" }} />
                                    <Box position='absolute' display='none' >
                                        <Button position='relative' colorScheme='facebook' top='-35px' ml='75px' size='sm'  >Lihat product</Button>
                                    </Box>
                                </Box>
                                <Box p='3px'>
                                    <Center>
                                        <Box mt='2vh'>
                                            <Text fontWeight={'bold'} fontSize='18px' color={'grey'}>{item.nama_product.split(' ')[0]}</Text>
                                        </Box>
                                    </Center>
                                    <Center>
                                        <Text fontSize='15px' fontWeight='semibold'>{item.nama_product}</Text>
                                    </Center>
                                    <Center>
                                        <Text fontSize='20px' mt='2vh' fontWeight={'bold'}>Stocks : {item.qty}</Text>
                                    </Center>
                                </Box>
                            </Box>
                        </Link>
                    </>
                )
            })
        }
    }
    const btFilter = () => {
        if (inIdwarehouse == 'Pilih Warehouse') {
            dispatch(getProductAdminAction())
            setPage(1)
        } else {
            dispatch(getProductAdminAction({
                idwarehouse: inIdwarehouse
            }))
            setPage(1)
        }
    }

    const handleLImitData = (event) => {
        setLimitData(event.target.value)
        setPage(1)
    }

    return (
        <>
            <Box marginX={'20vw'} marginY={'5vh'} display='flex' >
                <Box className='col-12'>
                    <InputGroup>
                        <Input type='select' value={inIdwarehouse} placeholder='Warehouse' onChange={(e) => setInIdwarehouse(e.target.value)}>
                            <option value={null} selected>Pilih Warehouse</option>
                            {printWarehouse()}
                        </Input>
                    </InputGroup>
                    <Box style={{ textAlign: 'right', paddingTop: '2%' }}>
                        <Button size='sm' colorScheme='blackAlpha' bgColor='#6b3c3b' onClick={() => btFilter()}>Terapkan Filter</Button>
                    </Box>
                </Box>
            </Box>
            <hr></hr>
            <Box marginX={'15vw'} marginY={'5vh'} >
                <Box display={'flex'} justifyContent='space-between' flexWrap={'wrap'} >
                    {printProduct()}
                </Box>
                <Box mt='80px' mb='40px'>
                    <Center>
                        <InputGroup>
                            <Select w='20' mr='5' onChange={(event) => handleLImitData(event)}>
                                <option selected value="6">6</option>
                                <option value="9">9</option>
                                <option value="12">12</option>
                                <option value="15">15</option>
                                <option value="18">18</option>
                            </Select>
                            <Pagination total={Math.ceil(productAdminList.length / limitData)} page={page} onChange={(event) => setPage(event)} size='lg' radius='xl' color='dark' />
                        </InputGroup>
                    </Center>
                </Box>
            </Box>
        </>
    )
}

export default AdminRequest