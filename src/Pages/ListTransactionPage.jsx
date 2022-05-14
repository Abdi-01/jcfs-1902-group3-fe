import { Badge, Box, Button, Center, FormControl, FormLabel, Heading, Icon, Image, Input, InputGroup, InputLeftAddon, InputRightAddon, InputRightElement, Select, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import MenuManagement from '../Components/MenuManagement'
import { IoSearch } from 'react-icons/io5'
import { BsCalendar2Week } from 'react-icons/bs'
import { FaMoneyBillWave, FaChevronRight } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTransactionAction, KonfirmasiPesananAction } from '../redux/actions'
import { API_URL } from '../helper'
import { Pagination } from '@mantine/core'
import ModalDetailTransaksi from '../Components/ModalDetailTransaksi'
import Swal from 'sweetalert2'
import LoadingPage from './LoadingPage'
import GoOnTop from '../Components/GoOnTop'
import BtnOnTop from '../Components/BtnOnTop'
import moment from 'moment'

const ListTransactionPage = (props) => {
    const [status, setStatus] = useState([{ id: null, status: 'Semua' }, { id: 7, status: 'Menunggu Konfirmasi' }, { id: 8, status: 'Pesanan Diproses' }, { id: 9, status: 'Pesanan Diterima' }, { id: 10, status: 'Dibatalkan' }])
    const [activeIdx, setActiveIdx] = useState(0)
    const [transaksi, setTransaksi] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [detail, setDetail] = useState({})
    const [page, setPage] = useState(1)
    const [limitData, setLimitData] = useState(5)
    const [filter, setFilter] = useState({ idstatus: null, fromDate: '', toDate: '' })
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        try {
            setLoading(true)
            let res = await dispatch(getTransactionAction())
            if (res.success) {
                setTransaksi(res.data)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const btfilterStatus = async (index = 0, idstatus = null) => {
        setActiveIdx(index)
        try {
            let res = await dispatch(getTransactionAction({ idstatus: idstatus }))
            if (res.success) {
                setTransaksi(res.data)
                setFilter({ idstatus: null, fromDate: '', toDate: '' })
                setPage(1)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const filterTanggal = async () => {
        try {
            setLoading(true)
            console.log('isi filter', filter)
            let res = await dispatch(getTransactionAction(filter))
            if (res.success) {
                setTransaksi(res.data)
                setLoading(false)
                setActiveIdx(0)
                setPage(1)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const btResetFilter = async () => {
        try {
            let res = await dispatch(getTransactionAction())
            if (res.success) {
                setTransaksi(res.data)
                setFilter({ idstatus: null, fromDate: '', toDate: '' })
                setActiveIdx(0)
                setPage(1)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const printStatus = () => {
        return status.map((item, index) => {
            return (
                <>
                    <Box mx='5px'>
                        <Button size='xs' colorScheme='blackAlpha' bgColor={activeIdx == index ? '#6B3C3B' : ''} borderRadius='full' fontSize='13px' onClick={() => btfilterStatus(index, item.id)} >{item.status}</Button>
                    </Box>
                </>
            )
        })
    }
    const printTransaksi = () => {
        if (transaksi.length > 0) {
            return transaksi.slice(page > 1 ? (page - 1) * limitData : page - 1, page * limitData).map((item, index) => {
                let newAddedDate = moment(item.added_date).locale('id').format('LL')
                return (
                    <>
                        {
                            item.idstatus !== 6 &&
                            <Box mt='20px' p='4' border='2px solid #F3F4F5' borderRadius='10px'>
                                <Box display='flex'>
                                    {/* <Text>Belanja {item.added_date.substr(0, 10)}</Text> */}
                                    <Text>Belanja {moment(item.added_date).locale('id').format('LL')}</Text>
                                    <Text mx='10px'><Badge variant='subtle' colorScheme={item.idstatus === 7 ? 'yellow' : item.idstatus === 8 ? 'messenger' : item.idstatus === 10 ? 'red' : 'green'}>{item.status}</Badge></Text>
                                    <Text fontWeight='semibold'>{item.invoice}</Text>
                                </Box>
                                <Box mt='10px'>
                                    <Text fontWeight='semibold'>{item.warehouse}</Text>
                                </Box>
                                <Box display='flex' justifyContent='space-between'>
                                    <Box mt='10px' display='flex'>
                                        <Image src={`${API_URL}/${item.detail[0].images}`} w='80px' borderRadius='10px' />
                                        <Center>
                                            <Box mx='15px'>
                                                <Text>{item.detail[0].nama}</Text>
                                                <Text>{item.detail[0].qty} x Rp.{(item.detail[0].sub_total).toLocaleString()}</Text>
                                                {
                                                    item.detail.length > 1 && <Text mt='5px' fontSize='12px'>{`+${item.detail.length - 1} produk lainnya`}</Text>
                                                }
                                            </Box>
                                        </Center>
                                    </Box>
                                    <Box mr='50px' borderLeft='1px solid gray'>
                                        <Box ml='20px' my='20px'>
                                            <Text fontWeight='semibold'>Total Belanja</Text>
                                            <Text>Rp.{(item.total_tagihan).toLocaleString()}</Text>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box mt='15px' display='flex' justifyContent='end'>
                                    <Button size='xs' colorScheme='blackAlpha' bgColor='#6B3C3B' onClick={() => handleModal(!openModal, item)}>Detail Transaksi</Button>
                                    {item.idstatus === 8 && <Button ml='10px' size='xs' colorScheme='green' onClick={() => btTerimaBarang(item.idtransaksi, item.idwarehouse)}>Barang Diterima</Button>}
                                    <ModalDetailTransaksi onOpen={openModal} onClose={() => setOpenModal(!openModal)} detailTransaksi={detail} />
                                </Box>
                            </Box>
                        }
                    </>
                )
            })
        } else {
            return (
                <>
                    <Box display='flex' justifyContent='center' my='20vh'>
                        <Heading as='h3' size='lg'>Belum ada transaksi</Heading>
                    </Box>
                </>
            )
        }
    }
    const printMenungguBayar = () => {
        let data = transaksi.filter((item, index) => {
            return item.idstatus === 6
        })
        return data
    }
    const handleModal = (open, item) => {
        setOpenModal(open)
        setDetail(item)
    }
    const handleLImitData = (event) => {
        setLimitData(event.target.value)
        setPage(1)
    }
    const btTerimaBarang = async (idtransaksi, idwarehouse) => {
        let data = {
            date: moment().format().slice(0, 19).replace('T', ' '),
            idstatus: 9,
            idwarehouse
        }
        try {
            Swal.fire({
                title: 'Konfirmasi pesanan ini ?',
                text: 'Anda tidak dapat merubahnya kembali!',
                showDenyButton: true,
                confirmButtonColor: 'green',
                confirmButtonText: 'Konfirmasi',
                denyButtonText: 'Cancel',
            }).then((res) => {
                if (res.isConfirmed) {
                    dispatch(KonfirmasiPesananAction(idtransaksi, data))
                    Swal.fire(
                        'Berhasil!',
                        'Pesanan ini terkonfirmasi',
                        'success'
                    )
                    getData()
                    btfilterStatus()
                }
            })
        } catch (error) {
            console.log(error)
        }

    }
    const btPagination = (event) => {
        setPage(event)
        window.scrollTo(0,0)  
    }
    return (
        <>
            {/* {console.log('isi transaksi', transaksi)} */}
            {
                loading === true ?
                    <LoadingPage />
                    :
                    <Box mx='60px' my='20px'>
                        <Box display='flex'>
                            <MenuManagement />
                            <Box ml='20px'>
                                <Heading as='h3' size='lg'>
                                    Daftar Transaksi
                                </Heading>
                                <Box w='68vw' my='4vh' p='6' borderRadius='15px' border={'2px solid #F3F4F5'}>
                                    <Box display='flex' justifyContent='end'>
                                        <Box display='flex'>
                                            <FormControl>
                                                <FormLabel>Cari Tanggal Transaksi</FormLabel>
                                                <InputGroup>
                                                    <InputLeftAddon children={<Icon as={BsCalendar2Week} />} />
                                                    <Input type='date' value={filter.fromDate} onChange={(event) => setFilter({ ...filter, fromDate: event.target.value })} />
                                                    <Input type='date' value={filter.toDate} onChange={(event) => setFilter({ ...filter, toDate: event.target.value })} disabled={filter.fromDate ? false : true} />
                                                    <InputRightElement>
                                                        <Button onClick={filterTanggal} disabled={filter.toDate ? false : true} colorScheme='blackAlpha' bgColor='#6B3C3B'><Icon as={IoSearch} /></Button>
                                                    </InputRightElement>
                                                </InputGroup>
                                            </FormControl>
                                            <FormControl ml='15px' mt='31px'>
                                                <Button size='md' onClick={btResetFilter} colorScheme='blue'>Reset</Button>
                                            </FormControl>
                                        </Box>
                                    </Box>
                                    <Box mt='35px' display='flex' justifyContent=''>
                                        <Text fontWeight='semibold'>Status :</Text>
                                        {printStatus()}
                                    </Box>
                                    {
                                        printMenungguBayar().length > 0 &&
                                        <Link to='/payment'>
                                            <Box display='flex' mt='30px' p='3' border='2px solid #F3F4F5' borderRadius='10px' justifyContent='space-between'>
                                                <Box display='flex'>
                                                    <Box mr='10px'>
                                                        <Icon as={FaMoneyBillWave} boxSize='4' />
                                                    </Box>
                                                    <Box>
                                                        <Text fontWeight='semibold'>Menunggu Pembayaran</Text>
                                                    </Box>
                                                </Box>
                                                <Box display='flex'>
                                                    <Box mr='25px'>
                                                        <Badge borderRadius='full' color='white' w='19px' h='19px' bgColor='red'><Center>{printMenungguBayar().length}</Center></Badge>
                                                    </Box>
                                                    <Box>
                                                        <Icon as={FaChevronRight} />
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Link>
                                    }
                                    {printTransaksi()}
                                    <Box mt='40px' mb='10px' display='flex' justifyContent='center'>
                                        <Box display='flex'>
                                            <Select w='20' mr='5' onChange={(event) => handleLImitData(event)}>
                                                <option selected value="5">5</option>
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option value="20">20</option>
                                                <option value="25">25</option>
                                            </Select>
                                            <Pagination total={Math.ceil(transaksi.length / limitData)} page={page} onChange={(event) => btPagination(event)} size='lg' radius='xl' color='dark' />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <BtnOnTop/>
                    </Box>
            }
            <GoOnTop/>
        </>
    )
}

export default ListTransactionPage