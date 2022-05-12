import { Box, Button, Center, Heading, Icon, Input, InputGroup, InputRightElement, NumberInput, NumberInputField, NumberInputStepper, Select, Table, TableContainer, Tbody, Text, Th, Thead, Tr, Td } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import MenuManagement from '../Components/MenuManagement'
import { AiOutlinePlusSquare, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import ModalAddProduct from '../Components/ModalAddProduct'
import { useSelector, useDispatch } from 'react-redux'
import ModalEditProduct from '../Components/ModalEditProduct'
import { deleteProductAction, getProductWarehouseAction, sortingProductWarehouseAction } from '../redux/actions'
import { Pagination } from '@mantine/core'
import axios from 'axios'
import { API_URL } from '../helper'
import LoadingPage from './LoadingPage'
import GoOnTop from '../Components/GoOnTop'
import BtnOnTop from '../Components/BtnOnTop'
import Swal from 'sweetalert2'

const ManagementProduct = (props) => {

    const [modalOpen, setModalOpen] = useState(false)
    const [modalEditOpen, setModalEditOpen] = useState(false)
    const [detailProduct, setDetailProduct] = useState({})
    const [page, setPage] = useState(1)
    const [limitData, setLimitData] = useState(5)
    const [dataProduct, setDataProduct] = useState([])
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [cariProduk, setCariProduk] = useState({ namaProduk: null, kategori: null })

    const { dataKategori, dataProductAdmin } = useSelector((state) => {
        return {
            dataKategori: state.kategoriReducer.listKategori,
            dataProductAdmin: state.productReducer.listProductWarehouse
        }
    })
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        try {
            setLoading(true)
            setInterval(() => {
                setLoading(false)
            }, 500);
        } catch (error) {
            console.log(error)
        }
    }
    const printProduct = () => {
        if (dataProductAdmin.length > 0) {
            return dataProductAdmin.slice(page > 1 ? (page - 1) * limitData : page - 1, page * limitData).map((item, index) => {
                return (
                    <>
                        <Tr>
                            <Td textAlign='center' fontWeight='semibold'>{page > 1 ? (page - 1) * limitData + index + 1 : index + 1}</Td>
                            <Td textAlign='center' fontWeight='semibold'>{item.nama}</Td>
                            <Td textAlign='center' fontWeight='semibold'>{item.kategori}</Td>
                            <Td textAlign='center' fontWeight='semibold'>Rp.{item.harga.toLocaleString()}</Td>
                            <Td textAlign='center'>
                                <Button colorScheme='yellow' mx='3' size='xs' onClick={() => handleBtEdit(item, true)}><Icon as={AiOutlineEdit} boxSize='20px' color='white' /></Button>
                                <Button colorScheme='red' size='xs' onClick={() => btDelete(item.idproduct)}><Icon as={AiOutlineDelete} boxSize='20px' /></Button>
                            </Td>
                        </Tr>
                    </>
                )
            })
        } else {
            return (
                <>
                    <Tr>
                        <Td colSpan='5' textAlign='center' fontWeight='semibold'>Produk tidak ada</Td>
                    </Tr>
                </>
            )
        }
    }
    const btDelete = async (idproduct) => {
        try {
            Swal.fire({
                title: 'Hapus produk ini ?',
                text: 'Anda tidak dapat mengembalikannya kembali!',
                showDenyButton: true,
                confirmButtonColor: 'green',
                confirmButtonText: 'Konfirmasi',
                denyButtonText: 'Cancel',
            }).then((res) => {
                if (res.isConfirmed) {
                     dispatch(deleteProductAction(idproduct))
                    Swal.fire(
                        'Berhasil!',
                        'Produk terhapus',
                        'success'
                    )
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    const handleBtEdit = (item, open) => {
        setDetailProduct(item)
        setModalEditOpen(open)
    }
    const handleLImitData = (event) => {
        setLimitData(event.target.value)
        setPage(1)
    }
    const btPagination = (event) => {
        setPage(event)
        window.scrollTo(0, 0)
    }
    const printKategori = () => {
        return dataKategori.map((item, index) => {
            return (
                <>
                    <option value={item.kategori}>{item.kategori}</option>
                </>
            )
        })
    }
    const btFilter = async () => {
        let data = {
            ...cariProduk
        }
        try {
            dispatch(getProductWarehouseAction(data))
        } catch (error) {
            console.log(error)
        }
    }
    const btReset = async () => {
        try {
            dispatch(getProductWarehouseAction())
            setCariProduk({ namaProduk: '', kategori: '' })
        } catch (error) {
            console.log(error)
        }
    }
    const btSorting = async (value) => {
        let temp = value.split('-')
        try {
            await dispatch(sortingProductWarehouseAction(temp[0],temp[1]))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {/* {console.log('isi detail', dataProductAdmin)} */}
            {
                loading === true ?
                    <LoadingPage />
                    :
                    <Box mx='60px' my='20px'>
                        <Box display='flex'>
                            <MenuManagement />
                            <Box ml='20px'>
                                <Heading as='h3' size='lg'>
                                    Management Product
                                </Heading>
                                <Box w='68vw' my='4vh' p='6' borderRadius='15px' border={'2px solid #F3F4F5'}  >
                                    <Box display='flex' justifyContent='space-between'>
                                        <Box display='flex'>
                                            <Input placeholder='cari Produk' w='15vw' onChange={(event) => setCariProduk({ ...cariProduk, namaProduk: event.target.value })} value={cariProduk.namaProduk} />
                                            <Select placeholder='Kategori' w='14vw' mx='5px' onChange={(event) => setCariProduk({ ...cariProduk, kategori: event.target.value })} value={cariProduk.kategori}>
                                                {printKategori()}
                                            </Select>
                                            <Button colorScheme='telegram' onClick={btFilter} mr='5px'>Filter</Button>
                                            <Button colorScheme='yellow' onClick={btReset}>Reset</Button>
                                        </Box>
                                        <Box>
                                            <Select placeholder='Sorting berdasarkan' onChange={(event) => btSorting(event.target.value)}>
                                                <option value="harga-asc">Harga Asc</option>
                                                <option value="harga-desc">Harga Desc</option>
                                                <option value="nama-asc">A - Z</option>
                                                <option value="nama-desc">Z - A</option>
                                                <option value="added_date-desc">Reset</option>
                                            </Select>
                                        </Box>
                                    </Box>
                                    <Box mt='10vh' display='flex' justifyContent='end'>
                                        <Button colorScheme='green' size='xs' fontSize='13px' fontWeight='bold' onClick={() => { setModalOpen(true) }}>Product <Icon as={AiOutlinePlusSquare} boxSize='20px' ml='5px' /> </Button>
                                    </Box>
                                    <ModalAddProduct modalOpen={modalOpen} modalClose={() => { setModalOpen(false) }} />
                                    <Box>
                                        <TableContainer>
                                            <Table variant='simple'>
                                                <Thead>
                                                    <Tr>
                                                        <Th textAlign='center'>No</Th>
                                                        <Th textAlign='center'>Nama Product</Th>
                                                        <Th textAlign='center'>Kategori</Th>
                                                        <Th textAlign='center'>Harga</Th>
                                                        <Th textAlign='center'>Aksi</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {printProduct()}
                                                    <ModalEditProduct detailProduct={detailProduct} openEdit={modalEditOpen} closeEdit={() => setModalEditOpen(false)} />
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                    <Box mt='20px'>
                                        <Center>
                                            <InputGroup>
                                                <Select w='20' mx='5' onChange={(event) => handleLImitData(event)}>
                                                    <option selected value="5">5</option>
                                                    <option value="10">10</option>
                                                    <option value="15">15</option>
                                                    <option value="20">20</option>
                                                    <option value="25">25</option>
                                                </Select>
                                                <Pagination total={Math.ceil(dataProductAdmin.length / limitData)} boundaries={2} siblings={2} page={page} onChange={(event) => btPagination(event)} />
                                            </InputGroup>
                                        </Center>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <GoOnTop />
                        <BtnOnTop />
                    </Box>
            }
        </>
    )
}

export default ManagementProduct