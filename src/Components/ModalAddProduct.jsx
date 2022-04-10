import React, { useState } from 'react'
import { Box, Center, Icon, Image, Menu, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button, Select, NumberInput, NumberInputField, Textarea } from '@chakra-ui/react'
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { addProductAction, getJenisProductAction } from '../redux/actions'
import axios from 'axios'
import { API_URL } from '../helper'

const ModalAddProduct = (props) => {
    const [inputPhoto, setInputPhoto] = useState([{}])
    const [open, setOpen] = useState(true)
    const [product, setProduct] = useState({ idmaterial: null, idkategori: null, idjenis_product: null, nama: '', harga: 0, deskripsi: '', berat: 1, stock: 1 })
    const dispatch = useDispatch()
    const { dataKategori, dataMaterial, dataJenisProduct } = useSelector((state) => {
        return {
            dataKategori: state.kategoriReducer.listKategori,
            dataMaterial: state.materialReducer.listMaterial,
            dataJenisProduct: state.jenisProductReducer.listJenisProduct
        }
    })

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


    const btAddPhoto = () => {
        let data = [...inputPhoto]
        data.push({})
        setInputPhoto(data)
    }
    const btDelPhoto = () => {
        let data = [...inputPhoto]
        data.splice(data.length - 1, 1)
        setInputPhoto(data)
    }
    const printInputPhoto = () => {
        return inputPhoto.map((item, index) => {
            return (
                <>
                    <Input type='file' my='1vh' onChange={(event) => handlePhoto(event, index)} />
                </>
            )
        })
    }

    const handlePhoto = (event, index) => {
        let temp = [...inputPhoto]
        temp[index] = { name: event.target.files[0].name, file: event.target.files[0] }
        setInputPhoto(temp)
    }

    const handleKategori = async (event) => {
        let temp = { ...product }
        temp.idkategori = event.target.value
        setProduct(temp)

        await dispatch(getJenisProductAction(event.target.value))

    }

    const btSimpan = async () => {

        let formData = new FormData()
        let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let data = {
            ...product,
            date: date
        }

        try {
            formData.append('data', JSON.stringify(data))
            inputPhoto.forEach((item) => formData.append('images', item.file))
            let res = await dispatch(addProductAction(formData))
            if (res.success) {
                props.modalClose()
            }
        } catch (error) {
            console.log(error)
        }

        console.log(data)
        console.log('data foto', inputPhoto)
    }

    return (
        <>
            <Modal isOpen={open == false ? open : props.modalOpen} onClose={props.modalClose} size='xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign='center' fontSize='25'>Tambah Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Nama Product</FormLabel>
                            <Input type='text' placeholder='nama product' onChange={(text) => setProduct({ ...product, nama: text.target.value })} />
                        </FormControl>
                        <Box display='flex' my='1.5vh'>
                            <FormControl>
                                <FormLabel>Stock</FormLabel>
                                <NumberInput defaultValue={1} min={1}>
                                    <NumberInputField onChange={(event) => setProduct({ ...product, stock: Number(event.target.value) })} />
                                </NumberInput>
                            </FormControl>
                            <FormControl mx='10px'>
                                <FormLabel>Berat(kg)</FormLabel>
                                <NumberInput defaultValue={1} min={1}>
                                    <NumberInputField onChange={(event) => setProduct({ ...product, berat: Number(event.target.value) })} />
                                </NumberInput>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Harga</FormLabel>
                                <NumberInput defaultValue={0} min={0}>
                                    <NumberInputField onChange={(event) => setProduct({ ...product, harga: Number(event.target.value) })} />
                                </NumberInput>
                            </FormControl>
                        </Box>
                        <Box display='flex' my='1.5vh'>
                            <FormControl>
                                <FormLabel>Kategori</FormLabel>
                                <Select placeholder='Kategori' onChange={(event) => handleKategori(event)}>
                                    {printKategori()}
                                </Select>
                            </FormControl>
                            <FormControl mx='1vw'>
                                <FormLabel>Material</FormLabel>
                                <Select placeholder='Material' onChange={(event) => setProduct({ ...product, idmaterial: event.target.value })}>
                                    {printMaterial()}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Jenis Product</FormLabel>
                                <Select placeholder='Jenis Product' onChange={(event) => setProduct({ ...product, idjenis_product: event.target.value })}>
                                    {printJenisProduct()}
                                </Select>
                            </FormControl>
                        </Box>
                        <FormControl mb='8px'>
                            <FormLabel>Deskripsi</FormLabel>
                            <Textarea placeholder='Deskripsi Product' onChange={(event) => setProduct({ ...product, deskripsi: event.target.value })} />
                        </FormControl>
                        <FormControl>
                            <Box display='flex' justifyContent='space-between'>
                                <FormLabel>Photo Product</FormLabel>
                                <Box display='flex'>
                                <Button mr='10px' colorScheme='green' size='xs' onClick={btAddPhoto}>Photo<Icon as={FiPlusCircle} boxSize='15px' ml='5px' /></Button>
                                <Button colorScheme='red' size='xs' onClick={btDelPhoto}><Icon as={FiMinusCircle} boxSize='15px' mr='5px' />Photo</Button>
                                </Box>
                            </Box>
                            {printInputPhoto()}
                        </FormControl>
                    </ModalBody>
                    <FormControl>
                        <Box display='flex' justifyContent='space-between' my='1.5vh' mx='1.5vw'>
                            <Button colorScheme='green' onClick={btSimpan}>Simpan</Button>
                            <Button colorScheme='blue' onClick={props.modalClose}>Close</Button>
                        </Box>
                    </FormControl>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalAddProduct