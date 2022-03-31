import React, { useState } from 'react'
import { Box, Center, Icon, Image, Menu, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button, Select, NumberInput, NumberInputField, Textarea } from '@chakra-ui/react'
import { FiPlusCircle } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { addProductAction, getJenisProductAction } from '../redux/actions'

const ModalEditProduct = (props) => {

    const [enable,setEnable] = useState(true)
    const [data,setData] = useState({ idmaterial: null, idkategori: null, idjenis_product: null, nama: '', harga: 0, deskripsi: ''})
    const [stockEdit,setStockEdit] = useState([])
    const { dataKategori, dataMaterial, dataJenisProduct } = useSelector((state) => {
        return {
            dataKategori: state.kategoriReducer.listKategori,
            dataMaterial: state.materialReducer.listMaterial,
            dataJenisProduct: state.jenisProductReducer.listJenisProduct
        }
    })
    let {nama,harga,stock,idkategori,idmaterial,idjenis_product,deskripsi} = props.detailProduct
    let dispatch = useDispatch()

    const printKategori = () => {
        if (dataKategori.length > 0) {
            return dataKategori.map((item, index) => {
                return (
                    <option value={item.idkategori}>{item.kategori}</option>
                )
            })
        }
    }
    const printMaterial = () => {
        if (dataMaterial.length > 0) {
            return dataMaterial.map((item, index) => {
                return (
                    <option value={item.idmaterial}>{item.material}</option>
                )
            })
        }
    }
    const printJenisProduct = () => {
        if (dataJenisProduct.length > 0) {
            return dataJenisProduct.map((item, index) => {
                return (
                    <option value={item.idjenis_product}>{item.jenis_product}</option>
                )
            })
        }
    }
    const handleStock = (event) => {
        let temp = [...stock]
        temp[0].qty = Number(event)
        setStockEdit(temp)
    }
    const btSimpan = () => {
        let temp = {
            idmaterial: data.idmaterial ? data.idmaterial : idmaterial,
            idkategori: data.idkategori ? data.idkategori : idkategori,
            idjenis_product: data.idjenis_product ? data.idjenis_product : idjenis_product,
            nama: data.nama ? data.nama : nama,
            harga: data.harga ? data.harga : harga,
            deskripsi: data.deskripsi ? data.deskripsi : deskripsi,
            stock: stockEdit.length > 0 ? stockEdit : stock,
        }

        
        
        console.log('isi data di edit', temp)
        
    }

    const handleKategori = async (event) => {
        let temp = { ...data }
        temp.idkategori = Number(event.target.value)
        setData(temp)
        await dispatch(getJenisProductAction(event.target.value))
    }

    return (
        <>
            {/* {console.log('isi stok',jumlah)} */}
            <Modal isOpen={props.openEdit} onClose={props.closeEdit}  size='xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign='center' fontSize='25'>Edit Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Nama Product</FormLabel>
                            <Input type='text' defaultValue={nama} placeholder='nama product' onChange={(event) => console.log(event.target)} />
                        </FormControl>
                        <Box display='flex' my='1.5vh'>
                            <FormControl mr='1vw'>
                                <FormLabel>Stock</FormLabel>
                                <NumberInput defaultValue={stock ? stock[0].qty: 1 } min={1} onChange={(event) => handleStock(event)}>
                                    <NumberInputField  />
                                </NumberInput>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Harga</FormLabel>
                                <NumberInput defaultValue={harga} min={0}>
                                    <NumberInputField />
                                </NumberInput>
                            </FormControl>
                        </Box>
                        <Box display='flex' my='1.5vh'>
                            <FormControl>
                                <FormLabel>Kategori</FormLabel>
                                <Select placeholder='Kategori' defaultValue={idkategori} onChange={(event) => handleKategori(event)} >
                                    {printKategori()}
                                </Select>
                            </FormControl>
                            <FormControl mx='1vw'>
                                <FormLabel>Material</FormLabel>
                                <Select placeholder='Material' defaultValue={idmaterial} onChange={(event) => setData({...data, idmaterial: Number(event.target.value)})}>
                                   {printMaterial()}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Jenis Product</FormLabel>
                                <Select placeholder='Jenis Product' defaultValue={idjenis_product} onChange={(event) => setData({...data, idjenis_product: Number(event.target.value)})}>
                                   {printJenisProduct()}
                                </Select>
                            </FormControl>
                        </Box>
                        <FormControl mb='8px'>
                            <FormLabel>Deskripsi</FormLabel>
                            <Textarea placeholder='Deskripsi Product' defaultValue={deskripsi}/>
                        </FormControl>
                        <FormControl>
                            <Box display='flex' justifyContent='space-between'>
                                <FormLabel>Photo Product</FormLabel>
                                <Button colorScheme='green' size='xs' >Photo<Icon as={FiPlusCircle} boxSize='15px' ml='5px' /></Button>
                            </Box>
                            
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                            <Button colorScheme='green' mx='10px' onClick={btSimpan}>Simpan</Button>
                            <Button colorScheme='blue' onClick={props.closeEdit}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalEditProduct