import { Box, Image, Text, Heading, Center, Tabs, TabList, Tab, TabPanels, TabPanel, InputGroup, InputLeftElement, InputRightElement, Icon, Input, Button, Select } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_URL } from '../helper'
import { getProductAction, getStock, getOngkirAction, getWarehouseAdmin } from '../redux/actions'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { FiEdit2 } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import { addCartAction } from '../redux/actions/transactionAction'
import DrawerCart from '../Components/DrawerCart'
import { addCartAdminAction, } from '../redux/actions/transactionAdminAction'
import Swal from 'sweetalert2'

const DetailProductRequest = () => {

    const [detailProduct, setDetailProduct] = useState({})
    const [dataOngkir, setDataOngkir] = useState({})
    const [thumbnailIdx, setThumbnailIdx] = useState(0)
    const [jumlah, setJumlah] = useState(1)
    const [btDisplay, setBtDisplay] = useState('none')
    const [inputCatatan, setInputCatatan] = useState('Tambah Catatan')
    const [catatan, setCatatan] = useState('')
    let getTotalStock = useLocation()
    let { idwarehouse, idproduct, nama, harga, material, stock, deskripsi, kategori, images } = detailProduct
    const [openCart, setOpenCart] = useState(false)
    const [selectedWarehouse, setSelectedWarehouse] = useState(null)
    let dispatch = useDispatch()

    useEffect(() => {
        getData()
    }, [])

    const { warehouseAdminList, warehouse, password } = useSelector((state) => {
        return {
            warehouseAdminList: state.transactionAdminReducer.warehouseAdminList[0],
        }
    })

    const RequestStock = async () => {        
        let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let token = localStorage.getItem('data')
        let data = {
            iduser: warehouseAdminList.iduser,
            idwarehouse: detailProduct.idwarehouse,
            idstatus: 7,
            idproduct: detailProduct.idproduct,
            idstock: detailProduct.idstock,
            idprovinsi: warehouseAdminList.idprovinsi,
            idkota: warehouseAdminList.idkota,
            stock: jumlah,
            invoice: `INV/${new Date().getTime()}`,
            ongkir: Number(dataOngkir.costs[1].cost[0].value),
            added_date: date
        }
        try {
            if (token) {
                let res = await axios.post(`${API_URL}/transactionwarehouse/checkoutadmin`, data, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then(res => {
                        console.log("cek res.data", res.data)
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Request Stock Success',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                if (res.data.success) {
                    setDataOngkir({})
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getData = async () => {
        try {
            console.log(`${API_URL}/transactionwarehouse${getTotalStock.search}`)
            let token = localStorage.getItem("data")
            let respon = await axios.get(`${API_URL}/transactionwarehouse${getTotalStock.search}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setDetailProduct(respon.data.dataProduct[0])
        } catch (error) {
            console.log(error)
        }
    }

    const printImages = () => {
        if (images) {
            return images.map((item, index) => {
                return (
                    <Image src={`${API_URL}/${images && item.url}`} tabIndex='0' _focus={{ border: '2px solid #6B3C3B' }} onClick={() => setThumbnailIdx(index)} ml='10px' w='75px' borderRadius='10px' boxShadow='md' _hover={{ border: '2px solid #6B3C3B' }} cursor='pointer' />
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
        if (jumlah < detailProduct.qty) {
            setJumlah(jumlah + 1)
        }
    }
    const btDecrement = () => {
        if (jumlah > 1) {
            setJumlah(jumlah - 1)
        }
    }    

    const btKeranjangAdmin = async () => {
        try {
            let temp = {
                idproduct,
                idstock: stock[0].idstock,
                qty: Number(jumlah),
                catatan
            }

            console.log('isi cart', temp)

            let res = await dispatch(addCartAdminAction(temp))
            if (res.success) {
                setOpenCart(!openCart)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const selectKurirAdmin = async (event) => {
        let temp
        if (event.target.value) {
            temp = {
                asal: warehouseAdminList.idkota,
                tujuan: detailProduct.idkota,
                berat: detailProduct.berat * 1000,
                kurir: event.target.value
            }
            try {
                let res = await dispatch(getOngkirAction(temp))
                if (res.success) {
                    setDataOngkir(res.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            {/* {console.log(getTotalStock)} */}
            {console.log('getwarehouseadmin', warehouseAdminList)}
            {/* {console.log('getwarehouseaja', warehouse)} */}
            {console.log('selectedwarehouseaja', selectedWarehouse)}
            {console.log(`cekDetailProduct`, detailProduct)}
            {console.log(`cek Jumlah`, jumlah)}
            {console.log(`cek dataOngkir`, dataOngkir)}
            <Box marginX={'8vw'} marginY={'10vh'}>
                {
                    detailProduct && material && images &&
                    <>
                        <Box mt='20px' display='flex'>
                            <Box>
                                <Box w='348px' overflow='hidden' h='348px' borderRadius='15px' boxShadow='lg' display='block'  >
                                    <Image src={`${API_URL}/${images[thumbnailIdx].url}`} w='100%' />
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
                                    <Image src={`${API_URL}/${material && material[0].url}`} boxSize='10' />
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
                            <Box border='2px solid #F3F4F5' w='250px' ml='30px' p='10px' borderRadius='10px' boxShadow='sm'>
                                <Heading as='h4' size='sm'>
                                    Rincian Transaksi
                                </Heading>
                                <Box mt='30px' borderBottom='2px solid #F3F4F5'>
                                    <Text fontWeight='bold' mb='10px'>Alamat Penerima</Text>
                                </Box>
                                {
                                    warehouseAdminList &&
                                    <Box mt='20px' borderBottom='2px solid #F3F4F5'>
                                        <Text fontWeight='semibold' mb='5px'>{warehouseAdminList.username}</Text>
                                        <Text my='5px'>{warehouseAdminList.provinsi} - {warehouseAdminList.kota}</Text>
                                    </Box>
                                }
                                {/* <Text mb='10px' fontSize='13px'>{selectedWarehouse.alamat}</Text> */}
                                <Box mt='20px'>
                                    <Box>
                                        <Box mt='30px' borderBottom='2px solid #F3F4F5'>
                                            <Text fontWeight='bold' mb='10px'>Alamat Pengirim</Text>
                                        </Box>
                                        <Box mt='20px' borderBottom='2px solid #F3F4F5'>
                                            <Text fontWeight='semibold' mb='5px'>{detailProduct.nama_warehouse}</Text>
                                            <Text my='5px'>{detailProduct.provinsi} - {detailProduct.kota}</Text>
                                            {/* <Text mb='10px' fontSize='13px'>{selectedWarehouse.alamat}</Text> */}
                                        </Box>
                                        <Box mt='20px' borderBottom='2px solid #F3F4F5'>
                                            <Text fontWeight='bold' mb='10px'>Kurir Pilihan</Text>
                                        </Box>
                                        <Box mt='20px' borderBottom='5px solid #F3F4F5'>
                                            <Select mb='10px' fontWeight='semibold' placeholder='pilih pengiriman' onClick={(event) => selectKurirAdmin(event)}>
                                                <option value='jne'>JNE</option>
                                                <option value='tiki'>TIKI</option>
                                            </Select>
                                        </Box>
                                        {
                                            dataOngkir.costs &&
                                            <Box mt='10px' borderBottom='2px solid #F3F4F5'>
                                                <Text>{dataOngkir.name}</Text>
                                                <Text fontSize='13px'>{dataOngkir.costs[1].service} {dataOngkir.costs[1].description} (Rp.{(jumlah * dataOngkir.costs[1].cost[0].value).toLocaleString()})</Text>
                                                <Text mb='10px' fontSize='12px'>Estimasi {dataOngkir.costs[1].cost[0].etd} hari</Text>
                                            </Box>
                                        }
                                    </Box>
                                    <Box display='flex'>
                                        <InputGroup w='100px'>
                                            <InputLeftElement children={<Icon as={AiOutlineMinus} />} cursor='pointer' onClick={btDecrement} />
                                            <Input value={jumlah} />
                                            <InputRightElement children={<Icon as={AiOutlinePlus} />} cursor='pointer' onClick={btIncrement} />
                                        </InputGroup>
                                        <Center><Text ml='10px'>Stock : {detailProduct.qty}</Text></Center>
                                    </Box>
                                </Box>
                                <Box mt='15px'>
                                    <Input placeholder='tulis catatan' display={btDisplay} onChange={(event) => setCatatan(event.target.value)} />
                                    <Heading as='h5' mt='10px' size='sm' onClick={btCatatan} cursor='pointer' color='#6B3C3B'>
                                        <Icon as={FiEdit2} /> {inputCatatan}
                                    </Heading>
                                </Box>
                                {
                                    dataOngkir.costs &&
                                    <Box mt='15px' display='flex' justifyContent='space-between'>
                                        <Heading as='h6' size='xs'>SubTotal</Heading>
                                        <Text fontWeight='semibold'>Rp.{(jumlah * dataOngkir.costs[1].cost[0].value).toLocaleString()}</Text>
                                    </Box>
                                }
                                <Box mt='20px'>
                                    <Button colorScheme='blackAlpha' w='100%' bgColor='#6B3C3B' onClick={RequestStock} ><Icon as={AiOutlinePlus} mr='10px' /> Request</Button>
                                    {/* <DrawerCart openCart={openCart} closeCart={() => setOpenCart(!openCart)} /> */}
                                </Box>
                            </Box>
                        </Box>
                    </>
                }
            </Box>
        </>
    )
}

export default DetailProductRequest