import React, { useState } from 'react'
import { Box, Center, Icon, Image, Menu, Text, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button, Select, NumberInput, NumberInputField, Textarea } from '@chakra-ui/react'
import { Modal } from '@mantine/core'
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { addProductAction, getJenisProductAction, getProductWarehouseAction } from '../redux/actions'
import axios from 'axios'
import { API_URL } from '../helper'
import Swal from 'sweetalert2'
import moment from 'moment'

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
        let date = moment().format().slice(0, 19).replace('T', ' ');
        let data = {
            ...product,
            date: date
        }
        let checkInputPhoto = inputPhoto.filter(item => item.hasOwnProperty('file'))
        try {
            let { idmaterial, idkategori, idjenis_product, nama, harga, deskripsi, berat, stock } = data
            if (idmaterial === null || idkategori === null || idjenis_product === null || nama === '' || harga === 0 || deskripsi === '' || berat === null || stock === null || checkInputPhoto.length === 0) {
                Swal.fire(
                    'Warning!',
                    'Semua data harus di isi',
                    'warning'
                )
                // props.modalClose()
            } else {
                formData.append('data', JSON.stringify(data))
                inputPhoto.forEach((item) => formData.append('images', item.file))
                let res = await dispatch(addProductAction(formData))
                if (res.success) {
                    Swal.fire(
                        'Success!',
                        'Data berhasil ditambah',
                        'success'
                    )
                    props.modalClose()
                    dispatch(getProductWarehouseAction())
                    setProduct({ idmaterial: null, idkategori: null, idjenis_product: null, nama: '', harga: 0, deskripsi: '', berat: 1, stock: 1 })
                    setInputPhoto([{}])
                }
            }
        } catch (error) {
            console.log(error)
        }

        // console.log(data)
        // console.log('data foto', inputPhoto)
    }
    const btModalClose = () => {
        props.modalClose()
        setProduct({ idmaterial: null, idkategori: null, idjenis_product: null, nama: '', harga: 0, deskripsi: '', berat: 1, stock: 1 })
        setInputPhoto([{}])
    }

    return (
        <>
            <Modal opened={open == false ? open : props.modalOpen} onClose={btModalClose} title='Tambah Product' size='lg' closeOnClickOutside={false} overlayOpacity={0.5} >
                <FormControl>
                    <FormLabel>Nama Product</FormLabel>
                    <Input type='text' placeholder='nama product' onChange={(text) => setProduct({ ...product, nama: text.target.value })} value={product.nama} />
                </FormControl>
                <Box display='flex' my='1.5vh'>
                    <FormControl>
                        <FormLabel>Stock</FormLabel>
                        <NumberInput defaultValue={1} min={1}>
                            <NumberInputField onChange={(event) => setProduct({ ...product, stock: Number(event.target.value) })} value={product.stock} />
                        </NumberInput>
                    </FormControl>
                    <FormControl mx='10px'>
                        <FormLabel>Berat(kg)</FormLabel>
                        <NumberInput defaultValue={1} min={1}>
                            <NumberInputField onChange={(event) => setProduct({ ...product, berat: Number(event.target.value) })} value={product.berat} />
                        </NumberInput>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Harga</FormLabel>
                        <NumberInput defaultValue={0} min={0}>
                            <NumberInputField onChange={(event) => setProduct({ ...product, harga: Number(event.target.value) })} value={product.harga} />
                        </NumberInput>
                    </FormControl>
                </Box>
                <Box display='flex' my='1.5vh'>
                    <FormControl>
                        <FormLabel>Kategori</FormLabel>
                        <Select onChange={(event) => handleKategori(event)} value={product.idkategori}>
                            <option value="null" defaultChecked>Kategori</option>
                            {printKategori()}
                        </Select>
                    </FormControl>
                    <FormControl mx='1vw'>
                        <FormLabel>Material</FormLabel>
                        <Select onChange={(event) => setProduct({ ...product, idmaterial: event.target.value })} value={product.idmaterial}>
                            <option value="null" defaultChecked>Material</option>
                            {printMaterial()}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Jenis Product</FormLabel>
                        <Select placeholder='Jenis Product' onChange={(event) => setProduct({ ...product, idjenis_product: event.target.value })} value={product.idjenis_product}>
                            <option value="null" defaultChecked>Kategori</option>
                            {printJenisProduct()}
                        </Select>
                    </FormControl>
                </Box>
                <FormControl mb='8px'>
                    <FormLabel>Deskripsi</FormLabel>
                    <Textarea placeholder='Deskripsi Product' onChange={(event) => setProduct({ ...product, deskripsi: event.target.value })} value={product.deskripsi} />
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
                <FormControl mt='20px'>
                    <Box display='flex' justifyContent='space-between' my='1.5vh' mx='1.5vw'>
                        <Button colorScheme='green' onClick={btSimpan}>Simpan</Button>
                        <Button colorScheme='blue' onClick={btModalClose}>Close</Button>
                    </Box>
                </FormControl>
            </Modal>
        </>
    )
}

export default ModalAddProduct