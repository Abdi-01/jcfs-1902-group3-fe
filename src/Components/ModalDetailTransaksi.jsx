import { Box, Center, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React from 'react'
import { API_URL } from '../helper'

const ModalDetailTransaksi = (props) => {
    const { invoice, added_date, warehouse, detail, ongkir, total_tagihan, pajak, nama_penerima } = props.detailTransaksi
    const printDetail = () => {
        if (detail.length > 0) {
            // detail.splice(1, 2)
            return detail.map((item, index) => {
                return (
                    <>
                        <Box my='15px' p='3' border='2px solid #F3F4F5' borderRadius='10px'>
                            <Box display='flex' justifyContent='space-between'>
                                <Box display='flex'>
                                    <Image src={`${API_URL}/${item.images}`} boxSize='80px' borderRadius='10px' />
                                    <Center>
                                        <Box ml='10px'>
                                            <Text fontWeight='semibold'>{item.nama}</Text>
                                            <Text>{item.qty} x Rp.{(item.harga).toLocaleString()}</Text>
                                        </Box>
                                    </Center>
                                </Box>
                                <Box my='15px'>
                                    <Text fontWeight='semibold'>Total Harga</Text>
                                    <Text>Rp.{(item.sub_total.toLocaleString())}</Text>
                                </Box>
                            </Box>
                        </Box>
                    </>
                )
            })
        }
    }
    const printTotalBarang = () => {
        let total = 0
        if (detail.length > 0) {
            detail.forEach((item) => {
                total += item.qty
            })
        }
        return total
    }
    const printTotalTagihan = () => {
        let total = 0
        if (detail.length > 0) {
            detail.forEach((item) => {
                total += item.sub_total
            })
        }
        return total
    }
    return (
        <>
            {console.log('isi detail', props.detailTransaksi)}
            <Modal size='md' scrollBehavior='inside' isOpen={props.onOpen} onClose={props.onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Center>
                            Detail Transaksi
                        </Center>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            added_date && invoice && detail &&
                            <>
                                <Box borderBottom='8px solid  #F3F4F5'>
                                    <Box display='flex' justifyContent='space-between'>
                                        <Text>No. Invoice</Text>
                                        <Text fontWeight='semibold'>{invoice}</Text>
                                    </Box>
                                    <Box my='10px' display='flex' justifyContent='space-between'>
                                        <Text>Tanggal Pembelian</Text>
                                        <Text fontWeight='semibold'>{added_date.substr(0, 10)}</Text>
                                    </Box>
                                </Box>
                                <Box mt='15px'>
                                    <Box display='flex' justifyContent='space-between' mb='10px' >
                                        <Text fontWeight='semibold'>Detail Produk</Text>
                                        <Text fontWeight='semibold'>{warehouse}</Text>
                                    </Box>
                                    <Box borderBottom='8px solid  #F3F4F5' h='30vh' overflow='auto' overflowX='hidden'>
                                        {printDetail()}
                                    </Box>
                                </Box>
                                <Box mt='15px' borderBottom='8px solid  #F3F4F5'>
                                    <Text fontWeight='semibold'>Info Pengiriman</Text>
                                    <Box display='flex' my='15px'>
                                        <Text mr='10px'>Alamat :</Text>
                                        <Box>
                                            <Text fontWeight='semibold'>{detail[0].nama_penerima}</Text>
                                            <Text>{detail[0].no_telpon}</Text>
                                            <Text>{detail[0].alamat}</Text>
                                            <Text>{detail[0].kecamatan}, {detail[0].kota}</Text>
                                            <Text>{detail[0].provinsi} {detail[0].kode_pos}</Text>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box mt='15px'>
                                    <Text fontWeight='semibold'>Rincian Pembayaran</Text>
                                    <Box mt='15px' display='flex' justifyContent='space-between'>
                                        <Text>Total Harga {`(${printTotalBarang()} Barang)`}</Text>
                                        <Text>Rp.{(printTotalTagihan()).toLocaleString()}</Text>
                                    </Box>
                                    <Box mt='15px' display='flex' justifyContent='space-between'>
                                        <Text>Pajak </Text>
                                        <Text>Rp.{(pajak).toLocaleString()}</Text>
                                    </Box>
                                    <Box mt='15px' display='flex' justifyContent='space-between' borderBottom='3px solid  #F3F4F5'>
                                        <Text>Total Ongkos kirim </Text>
                                        <Text mb='20px'>Rp.{(ongkir).toLocaleString()}</Text>
                                    </Box>
                                    <Box my='35px' display='flex' justifyContent='space-between'>
                                        <Text fontWeight='semibold'>Total Belanja </Text>
                                        <Text>Rp.{(total_tagihan).toLocaleString()}</Text>
                                    </Box>
                                </Box>
                            </>
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalDetailTransaksi