import { Button, FormControl, FormLabel, Image, Input, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, ModalBody, ModalHeader, Text, Center } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getTransactionAction, uploadReceiptaAction } from '../redux/actions'


const ModalUploadReceipt = (props) => {
    const [receipt, setReceipt] = useState(null)
    const dispatch = useDispatch()
    const handleUnggah = (event) => {
        let temp = { name: event.target.files[0].name, file: event.target.files[0] }
        setReceipt(temp)
    }
    const closeModal = () => {
        setReceipt(null)
        props.onClose()
    }
    const btUnggah = async () => {
        let tanggal = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let temp = { ...receipt}
        let date = {date: tanggal}
        let formUnggah = new FormData()
        try {
            formUnggah.append('date', JSON.stringify(date))
            formUnggah.append('data', temp.file)
            let res = await dispatch(uploadReceiptaAction(props.detailTrans.idtransaksi, formUnggah))
            if(res.success){
                dispatch(getTransactionAction(6))
                props.onClose()
            }
        } catch (error) {
            console.log(error)
        }
        console.log(temp)
    }
    return (
        <>
        {/* {console.log('isi props', props.detailTrans)} */}
            <Modal isOpen={props.open} onClose={() => closeModal()}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Center>
                            Cara Pembayaran
                        </Center>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>1. Pembayaran dapat melalui Bank atau ATM</Text>
                        <Text>2. Pastikan nominal yang ditransfer tepat</Text>
                        <Text>3. No.rekening 191029378290 A.n Wood Avenue</Text>
                        <Text>4. Simpan bukti pembayaran</Text>
                        <Text>5. Unggah bukti pembayaran pada form dibawah ini</Text>
                        <FormControl my='20px'>
                            <FormLabel>bukti pembayaran</FormLabel>
                            <Center>
                                <Image src={receipt ? URL.createObjectURL(receipt.file) : ''} display={receipt ? 'inline-block' : 'none'} boxSize='300px' mb='10px' />
                            </Center>
                            <Input type='file' onChange={(event) => handleUnggah(event)} />
                        </FormControl>
                        <ModalFooter>
                            <Button colorScheme='green' disabled={receipt ? false : true} onClick={btUnggah}>Unggah</Button>
                        </ModalFooter>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalUploadReceipt