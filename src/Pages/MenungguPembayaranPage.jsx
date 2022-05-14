import { Box, Button, Center, Heading, Image, InputGroup, Select, Text } from '@chakra-ui/react'
import { Pagination } from '@mantine/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BtnOnTop from '../Components/BtnOnTop'
import GoOnTop from '../Components/GoOnTop'
import MenuManagement from '../Components/MenuManagement'
import ModalDetailMenungguBayar from '../Components/ModalDetailMenungguBayar'
import ModalUploadReceipt from '../Components/ModalUploadReceipt'
import { API_URL } from '../helper'
import { getTransactionAction } from '../redux/actions'
import LoadingPage from './LoadingPage'
import moment from 'moment'

const MenungguPembayaranPage = () => {
    const [openModal, setOpenModal] = useState(false)
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [detail, setDetail] = useState({})
    const [page, setPage] = useState(1)
    const [limitData, setLimitData] = useState(5)
    const [transaksiUser, setTransaksiUser] = useState([])
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        try {
            setLoading(true)
            let token = localStorage.getItem('data')
            let res = await axios.get(`${API_URL}/transactions?idstatus=6`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (res.data.success) {
                setTransaksiUser(res.data.dataTransaksi)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleModal = (open, item) => {
        setOpenModal(open)
        setDetail(item)
    }
    const handleModalDetail = (open, item) => {
        setOpenModalDetail(open)
        setDetail(item)
    }
    const printTransaksi = () => {
        if (transaksiUser.length > 0) {
            return transaksiUser.slice(page > 1 ? (page - 1) * limitData : page - 1, page * limitData).map((item, index) => {
                return (
                    <>
                        <Box borderRadius='10px' my='20px' w='100%' p='3' boxShadow='md'>
                            <Box display='flex' w='100%' justifyContent='space-between'>
                                <Box>
                                    <Text fontWeight='semibold'>Belanja {moment(item.added_date).locale('id').format('LL')}</Text>
                                </Box>
                            </Box>
                            <Box my='15px' display='flex' justifyContent='space-between'>
                                <Box>
                                    <Text fontWeight='semibold'>Invoice</Text>
                                    <Text mr='10px'>{item.invoice}</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight='semibold'>Total Pembayaran</Text>
                                    <Text mr='10px'>Rp.{(item.total_tagihan).toLocaleString()}</Text>
                                </Box>
                                <Box>
                                    <Button size='sm' colorScheme='telegram' mt='15px' mr='5px' onClick={() => handleModalDetail(true, item)}>Detail</Button>
                                    <ModalDetailMenungguBayar onOpen={openModalDetail} onClose={() => setOpenModalDetail(!openModalDetail)} detailTransaksi={detail}/>
                                    <Button size='sm' mt='15px' colorScheme='facebook' onClick={() => handleModal(true, item)}>Cara Pembayaran</Button>
                                </Box>
                            </Box>
                        </Box>
                    </>
                )
            })
        } else {
            return (
                <>
                    <Center>
                        <Box my='40vh'>
                            <Heading as='h3' size='lg'>Belum ada Transaksi</Heading>
                        </Box>
                    </Center>
                </>
            )
        }
    }
    const handleLImitData = (event) => {
        setLimitData(event.target.value)
        setPage(1)
    }
    const btPagination = (event) => {
        setPage(event)
        window.scrollTo(0, 0)
    }
    return (
        <>
            {console.log('isi transaksi', transaksiUser)}
            {
                loading === true ?
                    <LoadingPage />
                    :
                    <Box mx='60px' my='20px'>
                        <Box display='flex'>
                            <MenuManagement />
                            <Box ml='20px'>
                                <Heading as='h3' size='lg'>
                                    Menunggu Pembayaran
                                </Heading>
                                <Box w='68vw' my='4vh' p='6' borderRadius='15px' border={'2px solid #F3F4F5'}>
                                    {printTransaksi()}
                                    <ModalUploadReceipt open={openModal} onClose={() => setOpenModal(!openModal)} detailTrans={detail}/>
                                    <Box mt='40px' mb='10px' display='flex' justifyContent='center'>
                                        <Box display='flex'>
                                            <Select w='20' mr='5' onChange={(event) => handleLImitData(event)}>
                                                <option selected value="5">5</option>
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option value="20">20</option>
                                                <option value="25">25</option>
                                            </Select>
                                            <Pagination total={Math.ceil(transaksiUser.length / limitData)} page={page} onChange={(event) => btPagination(event)} size='lg' radius='xl' color='dark' />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <BtnOnTop />
                    </Box>
            }
            <GoOnTop />
        </>
    )
}

export default MenungguPembayaranPage