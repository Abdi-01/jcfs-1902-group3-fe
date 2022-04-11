import React, { useState } from 'react'
import { Box, Center, Icon, Image, Menu, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button, Select, NumberInput, NumberInputField, Textarea } from '@chakra-ui/react'
import { FiPlusCircle, FiEdit, FiSave } from 'react-icons/fi'
import { FaEdit } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { addProductAction, getJenisProductAction, getProductAction, updateImgProductAction, updateProductAction } from '../redux/actions'

const ModalEditProduct = (props) => {

    const [enable, setEnable] = useState(true)
    const [btColor, setBtColor] = useState('yellow')
    const [btName, setBtName] = useState('Edit')
    const [editImage, seteditImage] = useState([])
    const [data, setData] = useState({ idmaterial: null, idkategori: null, idjenis_product: null, nama: '', harga: 0, deskripsi: '', berat: 0 })
    const [stockEdit, setStockEdit] = useState([])
    const { dataKategori, dataMaterial, dataJenisProduct } = useSelector((state) => {
        return {
            dataKategori: state.kategoriReducer.listKategori,
            dataMaterial: state.materialReducer.listMaterial,
            dataJenisProduct: state.jenisProductReducer.listJenisProduct
        }
    })
    let { idproduct, nama, harga, stock, idkategori, idmaterial, idjenis_product, deskripsi, images, berat } = props.detailProduct
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

    const printImages = () => {
        if (images) {
            return images.map((item, index) => {
                return (
                    <>
                        <Image boxSize='108px' src={editImage[index] ? URL.createObjectURL(editImage[index].file) : `http://localhost:2000/${item.url}`} my='10px' borderRadius='5px' boxShadow='md' />
                        <label>
                            <Icon as={FiEdit} borderRadius='5px' bg='#fed330' boxSize='16.5px' position='relative' right='40px' top='95px' cursor={enable ? '' : 'pointer'} />
                            <Input type="file" onChange={(event) => handleEditImage(event, index)} display='none' disabled={enable} />
                        </label>
                        <Icon as={FiSave} onClick={() => btSimpanImg(index)} borderRadius='5px' bg='#fed330' boxSize='18px' position='relative' right='35px' top='100px' cursor={enable ? '' : 'pointer'} />
                    </>
                )
            })
        }
    }
    const handleEditImage = (event, idx) => {
        let temp = [...editImage]
        temp[idx] = { name: event.target.files[0].name, file: event.target.files[0], idimage: images[idx].idimage }
        delete images[idx].url
        seteditImage(temp)
    }
    const handleStock = (event) => {
        let temp = [...stock]
        temp[0].qty = Number(event)
        setStockEdit(temp)
    }
    const handleKategori = async (event) => {
        let temp = { ...data }
        temp.idkategori = Number(event.target.value)
        setData(temp)
        await dispatch(getJenisProductAction(event.target.value))
    }
    const btKlikEdit = () => {
        if (enable == true) {
            setEnable(false)
            setBtColor('green')
            setBtName('Simpan')
        } else {
            setEnable(true)
            setBtColor('yellow')
            setBtName('Edit')
        }
    }
    const btKlikCancel = () => {
        if (enable == false) {
            setEnable(true)
            setBtColor('yellow')
            setBtName('Edit')
            props.closeEdit()
        } else {
            props.closeEdit()
        }
    }
    const btSimpan = async () => {
        let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let temp = {
            idmaterial: data.idmaterial ? data.idmaterial : idmaterial,
            idkategori: data.idkategori ? data.idkategori : idkategori,
            idjenis_product: data.idjenis_product ? data.idjenis_product : idjenis_product,
            nama: data.nama ? data.nama : nama,
            harga: data.harga ? data.harga : harga,
            deskripsi: data.deskripsi ? data.deskripsi : deskripsi,
            stock: stockEdit.length > 0 ? stockEdit : stock,
            berat: data.berat ? data.berat : berat,
            date: date
        }
        try {
            let res = await dispatch(updateProductAction(idproduct, temp))
            if (res.success) {
                btKlikCancel()
                setData({ idmaterial: null, idkategori: null, idjenis_product: null, nama: '', harga: 0, deskripsi: '', berat: 0 })
                dispatch(getProductAction())
            }
        } catch (error) {
            console.log(error)
        }
    }
    const btSimpanImg = async (index) => {
        let temp = [...editImage]
        let formImage = new FormData()
        try {
            formImage.append('data', JSON.stringify(images[index]))
            formImage.append('images', temp[index].file)
            let res = await dispatch(updateImgProductAction(temp[index].idimage, formImage))
            if (res.success) {
                dispatch(getProductAction())
                btKlikCancel()
            }
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <>
            {
                console.log('isi image edit', editImage, images)
                // console.log('isi image',images.url)
            }
            <Modal isOpen={props.openEdit} closeOnOverlayClick={false} onClose={btKlikCancel} size='xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign='center' fontSize='25'>Edit Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Nama Product</FormLabel>
                            <Input type='text' defaultValue={nama} placeholder='nama product' disabled={enable} onChange={(event) => setData({ ...data, nama: event.target.value })} />
                        </FormControl>
                        <Box display='flex' my='1.5vh'>
                            <FormControl mr='1vw'>
                                <FormLabel>Stock</FormLabel>
                                <NumberInput defaultValue={stock ? stock[0].qty : 1} min={1} disabled={enable} onChange={(event) => handleStock(event)}>
                                    <NumberInputField />
                                </NumberInput>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Berat(kg)</FormLabel>
                                <NumberInput defaultValue={berat} disabled={enable} onChange={(event) => setData({ ...data, berat: event })} min={0}>
                                    <NumberInputField />
                                </NumberInput>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Harga</FormLabel>
                                <NumberInput defaultValue={harga} disabled={enable} onChange={(event) => setData({ ...data, harga: event })} min={0}>
                                    <NumberInputField />
                                </NumberInput>
                            </FormControl>
                        </Box>
                        <Box display='flex' my='1.5vh'>
                            <FormControl>
                                <FormLabel>Kategori</FormLabel>
                                <Select placeholder='Kategori' defaultValue={idkategori} disabled={enable} onChange={(event) => handleKategori(event)} >
                                    {printKategori()}
                                </Select>
                            </FormControl>
                            <FormControl mx='1vw'>
                                <FormLabel>Material</FormLabel>
                                <Select placeholder='Material' defaultValue={idmaterial} disabled={enable} onChange={(event) => setData({ ...data, idmaterial: Number(event.target.value) })}>
                                    {printMaterial()}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Jenis Product</FormLabel>
                                <Select placeholder='Jenis Product' defaultValue={idjenis_product} disabled={enable} onChange={(event) => setData({ ...data, idjenis_product: Number(event.target.value) })}>
                                    {printJenisProduct()}
                                </Select>
                            </FormControl>
                        </Box>
                        <FormControl mb='8px'>
                            <FormLabel>Deskripsi</FormLabel>
                            <Textarea placeholder='Deskripsi Product' defaultValue={deskripsi} disabled={enable} onChange={(event) => setData({ ...data, deskripsi: event.target.value })} />
                        </FormControl>
                        <FormControl>
                            <Box display='flex' justifyContent='space-between'>
                                <FormLabel>Photo Product</FormLabel>
                            </Box>
                            <Box display='flex' justifyContent='center' mx='15px' flexWrap='wrap'>
                                {printImages()}
                            </Box>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        {
                            btName == 'Edit' ?
                                <Button colorScheme={btColor} mx='10px' onClick={() => btKlikEdit(enable)}>{btName}</Button>
                                :
                                <Button colorScheme={btColor} mx='10px' onClick={btSimpan}>{btName}</Button>
                        }
                        <Button colorScheme='blue' onClick={() => btKlikCancel()} >Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalEditProduct