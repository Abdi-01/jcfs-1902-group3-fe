import { Box, Button, Center, Heading, Icon, Input, InputGroup, InputRightElement, NumberInput, NumberInputField, NumberInputStepper, Select, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useState } from 'react'
import MenuManagement from '../Components/MenuManagement'
import { AiOutlinePlusSquare, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import ModalAddProduct from '../Components/ModalAddProduct'
import { useSelector, useDispatch } from 'react-redux'
import ModalEditProduct from '../Components/ModalEditProduct'
import { deleteProductAction } from '../redux/actions'
import { Pagination } from '@mantine/core'

const ManagementProduct = (props) => {

    const [modalOpen, setModalOpen] = useState(false)
    const [modalEditOpen, setModalEditOpen] = useState(false)
    const [detailProduct, setDetailProduct] = useState({})
    const [page, setPage] = useState(1)
    const [limitData, setLimitData] = useState(3)

    const { dataProduct } = useSelector((state) => {
        return {
            dataProduct: state.productReducer.listProduct
        }
    })

    const dispatch = useDispatch()

    const printProduct = () => {
        if (dataProduct.length > 0) {
            return dataProduct.slice(page > 1 ? (page - 1) * limitData : page - 1, page * limitData).map((item, index) => {
                return (
                    <>
                        <Tr>
                            <Th textAlign='center'>{page > 1 ? (page - 1) * limitData + index + 1 : index + 1}</Th>
                            <Th textAlign='center'>{item.nama}</Th>
                            <Th textAlign='center'>{item.kategori}</Th>
                            <Th textAlign='center'>Rp.{item.harga.toLocaleString()}</Th>
                            <Th textAlign='center'>
                                <Button colorScheme='yellow' mx='3' size='xs' onClick={() => handleBtEdit(item, true)}><Icon as={AiOutlineEdit} boxSize='20px' color='white' /></Button>
                                <Button colorScheme='red' size='xs' onClick={() => btDelete(item.idproduct)}><Icon as={AiOutlineDelete} boxSize='20px' /></Button>
                            </Th>
                        </Tr>
                    </>
                )
            })
        }
    }
    const btDelete = async (idproduct) => {
        try {
            let res = dispatch(deleteProductAction(idproduct))
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

    return (
        <>
            {console.log('isi detail', detailProduct)}
            <Box mx='60px' my='20px'>
                <Box display='flex'>
                    <MenuManagement />
                    <Box ml='20px'>
                        <Heading as='h3' size='lg'>
                            Management Product
                        </Heading>
                        <Box w='68vw' h='80vh' my='4vh' p='6' borderRadius='15px' border={'2px solid #F3F4F5'}  >
                            <Box display='flex' justifyContent='space-between'>
                                <Box display='flex'>
                                    <Input placeholder='cari Produk' w='15vw' />
                                    <Select placeholder='Kategori' w='10vw' mx='5px'>
                                        <option value='Ruang Keluarga'>Ruang Keluarga</option>
                                    </Select>
                                    <Button colorScheme='telegram'>Filter</Button>
                                </Box>
                                <Box>
                                    <Select placeholder='Sorting berdasarkan'>
                                        <option value="harga-asc">Harga Asc</option>
                                        <option value="harga-desc">Harga Desc</option>
                                        <option value="nama-asc">A - Z</option>
                                        <option value="nama-desc">Z - A</option>
                                        <option value="idproduct-asc">Reset</option>
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
                            <Box my='25px' position='absolute' bottom='2%' left='50%' p='5'>
                                <InputGroup>
                                    <Select w='20' mx='5' onChange={(event) => handleLImitData(event)}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option selected value="3">3</option>
                                    </Select>
                                    <Pagination total={Math.ceil(dataProduct.length / limitData)} page={page} onChange={(event) => setPage(event)} />
                                </InputGroup>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ManagementProduct