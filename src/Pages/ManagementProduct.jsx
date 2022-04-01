import { Box, Button, Heading, Icon, Input, InputGroup, InputRightElement, NumberInput, NumberInputField, NumberInputStepper, Select, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useState } from 'react'
import MenuManagement from '../Components/MenuManagement'
import { MdSearch } from 'react-icons/md'
import ModalAddProduct from '../Components/ModalAddProduct'
import { useSelector, useDispatch } from 'react-redux'
import ModalEditProduct from '../Components/ModalEditProduct'
import { deleteProductAction } from '../redux/actions'

const ManagementProduct = (props) => {

    const [modalOpen, setModalOpen] = useState(false)
    const [modalEditOpen, setModalEditOpen] = useState(false)
    const [detailProduct, setDetailProduct] = useState({})

    const { dataProduct } = useSelector((state) => {
        return {
            dataProduct: state.productReducer.listProduct
        }
    })
   
    const dispatch = useDispatch()

    const printProduct = () => {
        if (dataProduct.length > 0) {
            return dataProduct.map((item, index) => {
                return (
                    <>
                        <Tr>
                            <Th textAlign='center'>{index+1}</Th>
                            <Th textAlign='center'>{item.nama}</Th>
                            <Th textAlign='center'>{item.kategori}</Th>
                            <Th textAlign='center'>Rp.{item.harga.toLocaleString()}</Th>
                            <Th textAlign='center'>
                                <Button colorScheme='yellow' mx='3' size='sm' onClick={() => handleBtEdit(item,true)}>Edit</Button>
                                <Button colorScheme='red' size='sm' onClick={() => btDelete(item.idproduct)}>Delete</Button>
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

    const handleBtEdit = (item,open) => {
        setDetailProduct(item)
        setModalEditOpen(open)
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
                                <Button colorScheme='green' onClick={() => { setModalOpen(true) }}>Tambah Product</Button>
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
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ManagementProduct