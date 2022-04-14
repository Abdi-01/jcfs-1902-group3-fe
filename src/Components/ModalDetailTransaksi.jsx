import { Box, Center, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React from 'react'
import { API_URL } from '../helper'

const ModalDetailTransaksi = (props) => {
    const { invoice, added_date, warehouse, detail, ongkir, total_tagihan, pajak } = props.detailTransaksi
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
    return (
        <>
            {/* {console.log('isi detail', props.detailTransaksi)} */}
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
                            added_date && invoice &&
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
                                    <Box display='flex' justifyContent='space-between' >
                                        <Text fontWeight='semibold'>Detail Produk</Text>
                                        <Text fontWeight='semibold'>{warehouse}</Text>
                                    </Box>
                                    <Box borderBottom='8px solid  #F3F4F5' h='30vh' overflow='auto' overflowX='hidden'>
                                        {printDetail()}
                                    </Box>
                                </Box>
                                <Box mt='15px'>
                                    <Text fontWeight='semibold'>Rincian Pembayaran</Text>
                                    <Box mt='15px' display='flex' justifyContent='space-between'>
                                        <Text>Total Harga {`(${detail[0].qty} Barang)`}</Text>
                                        <Text>Rp.{(detail[0].sub_total).toLocaleString()}</Text>
                                    </Box>
                                    <Box mt='15px' display='flex' justifyContent='space-between'>
                                        <Text>Total Ongkos kirim </Text>
                                        <Text>Rp.{(ongkir).toLocaleString()}</Text>
                                    </Box>
                                    <Box mt='15px' display='flex' justifyContent='space-between' borderBottom='3px solid  #F3F4F5'>
                                        <Text>Pajak </Text>
                                        <Text mb='20px'>Rp.{(pajak).toLocaleString()}</Text>
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