import { Box, Image, Text, Heading, Center, Tabs, TabList, Tab, TabPanels, TabPanel, InputGroup, InputLeftElement, InputRightElement, Icon, Input, Button } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { API_URL } from '../helper'
import { getProductAction, getStock } from '../redux/actions'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { FiEdit2 } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import { addCartAction } from '../redux/actions/transactionAction'
import DrawerCart from '../Components/DrawerCart'

const DetailProduct = () => {

    const [detailProduct, setDetailProduct] = useState({})
    const [thumbnailIdx, setThumbnailIdx] = useState(0)
    const [jumlah, setJumlah] = useState(1)
    const [btDisplay, setBtDisplay] = useState('none')
    const [inputCatatan, setInputCatatan] = useState('Tambah Catatan')
    const [catatan, setCatatan] = useState('')
    let getTotalStock = useLocation()
    let { idproduct ,nama, harga, material, stock, deskripsi, kategori, images } = detailProduct
    const [totalStock, setTotalStock] = useState({})
    const [openCart,setOpenCart] = useState(false)
    let dispatch = useDispatch()

    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        try {
            let res = await dispatch(getStock(getTotalStock.state.nama))
            let respon = await axios.get(`${API_URL}/products${getTotalStock.search}`)
            if (res.success) {
                setTotalStock(res.data)
                setDetailProduct(respon.data.dataProduct[0])
            }
        } catch (error) {
            console.log(error)
        }
    }

    const printImages = () => {
        if (images) {
            return images.map((item, index) => {
                return (
                    <Image src={`http://localhost:2000/${images && item.url}`} tabIndex='0' _focus={{ border: '2px solid #6B3C3B' }} onClick={() => setThumbnailIdx(index)} ml='10px' w='75px' borderRadius='10px' boxShadow='md' _hover={{ border: '2px solid #6B3C3B' }} cursor='pointer' />
                )
            })
        }
    }
    const btCatatan = () => {
        if (btDisplay == 'none') {
            setInputCatatan('Batalkan Catatan')
            setBtDisplay('block')
        } else {
            setInputCatatan('Tambah Catatan')
            setBtDisplay('none')
        }
    }
    const btIncrement = () => {
        if (jumlah < totalStock[0].stok) {
            setJumlah(jumlah + 1)
        }
    }
    const btDecrement = () => {
        if (jumlah > 1) {
            setJumlah(jumlah - 1)
        }
    }
    const btKeranjang = async () => {
        try {
            let temp = {
               idproduct,
               idstock: stock[0].idstock,
               qty: Number(jumlah),
               catatan
            }

            console.log('isi cart', temp)

            let res = await dispatch(addCartAction(temp))
            if(res.success){
                setOpenCart(!openCart)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        {/* {console.log(getTotalStock)} */}
            <Box marginX={'8vw'} marginY={'10vh'}>
                {
                    detailProduct && material && images && totalStock[0] &&
                    <>
                        <Box mt='20px' display='flex'>
                            <Box>
                                <Box w='348px' overflow='hidden' h='348px' borderRadius='15px' boxShadow='lg' display='block'  >
                                    <Image src={`http://localhost:2000/${images[thumbnailIdx].url}`} w='100%' />
                                </Box>
                                <Box display='flex' mt='20px'>
                                    {printImages()}
                                </Box>
                            </Box>
                            <Box ml='30px'>
                                <Heading as='h3' size='lg'>
                                    {nama}
                                </Heading>
                                <Box mt='15px' display='flex'>
                                    <Image src={`http://localhost:2000/${material && material[0].url}`} boxSize='10' />
                                    <Center>
                                        <Heading ml='10px' as='h5' size='sm'>{material && material[0].material}</Heading>
                                    </Center>
                                </Box>
                                <Box mt='25px'>
                                    <Heading as='h3' size='lg'>
                                        Rp.{harga.toLocaleString()}
                                    </Heading>
                                </Box>
                                <Box mt='15px' w='400px'>
                                    <Tabs colorScheme='dark'>
                                        <TabList>
                                            <Tab>Detail</Tab>
                                            <Tab>Info Penting</Tab>
                                        </TabList>
                                        <TabPanels>
                                            <TabPanel fontWeight='semibold'>
                                                <Text>Kondisi : Baru</Text>
                                                <Text>Kategori : {kategori}</Text>
                                                <Text>Material : {material[0].material}</Text>
                                                <Text mt='20px' textAlign='justify'>{deskripsi}</Text>
                                            </TabPanel>
                                            <TabPanel fontWeight='semibold'>
                                                <Text>Proses Pemesanan 30 hari</Text>
                                            </TabPanel>
                                        </TabPanels>
                                    </Tabs>
                                </Box>
                            </Box>
                            <Box border='2px solid #F3F4F5' w='250px' h='300px' ml='30px' p='10px' borderRadius='10px' boxShadow='sm'>
                                <Heading as='h4' size='sm'>
                                    Atur jumlah dan Catatan
                                </Heading>
                                <Box mt='20px'>
                                    <Box display='flex'>
                                        <InputGroup w='100px'>
                                            <InputLeftElement children={<Icon as={AiOutlineMinus} />} cursor='pointer' onClick={btDecrement} />
                                            <Input value={jumlah} />
                                            <InputRightElement children={<Icon as={AiOutlinePlus} />} cursor='pointer' onClick={btIncrement} />
                                        </InputGroup>
                                        <Center><Text ml='10px'>Stock : {totalStock[0].stok}</Text></Center>
                                    </Box>
                                </Box>
                                <Box mt='15px'>
                                    <Input placeholder='tulis catatan' display={btDisplay} onChange={(event) => setCatatan(event.target.value)} />
                                    <Heading as='h5' mt='10px' size='sm' onClick={btCatatan} cursor='pointer' color='#6B3C3B'>
                                        <Icon as={FiEdit2} /> {inputCatatan}
                                    </Heading>
                                </Box>
                                <Box mt='15px' display='flex' justifyContent='space-between'>
                                    <Heading as='h6' size='xs'>SubTotal</Heading>
                                    <Text fontWeight='semibold'>Rp.{(jumlah * harga).toLocaleString()}</Text>
                                </Box>
                                <Box mt='20px'>
                                    <Button colorScheme='blackAlpha' w='100%' bgColor='#6B3C3B' onClick={btKeranjang} ><Icon as={AiOutlinePlus} mr='10px'  /> Keranjang</Button>
                                    <DrawerCart openCart={openCart} closeCart={() => setOpenCart(!openCart)}/>
                                </Box>
                            </Box>
                        </Box>
                    </>
                }
            </Box>
        </>
    )
}

export default DetailProduct