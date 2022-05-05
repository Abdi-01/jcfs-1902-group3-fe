import { Badge, Box, Button, Center, FormControl, FormLabel, Heading, Icon, Image, Input, InputGroup, InputLeftAddon, InputRightAddon, InputRightElement, Select, Text } from '@chakra-ui/react'
import { Pagination } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { API_URL } from '../helper'
// import { useLocation } from 'react-router-dom'
import { getRequest } from '../redux/actions'

const ManagementRequest = (props) => {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [limitData, setLimitData] = useState(6)

    const { requestList } = useSelector((state) => {
        return {
            requestList: state.transactionAdminReducer.requestList
        }
    })

    useEffect(() => {
        dispatch(getRequest())
    }, [])

    const { idrole } = useSelector((state) => {
        return {
            idrole: state.userReducer.idrole
        }
    })

    const printRequest = () => {
        if (requestList.length > 0) {
            return requestList.slice(page > 1 ? (page - 1) * limitData : page - 1, page * limitData).map((item, index) => {
                return (
                    <>
                        <Box mt='20px' p='4' border='2px solid #F3F4F5' borderRadius='10px'>
                            <Box display='flex'>
                                <Text>Request {item.added_date.substr(0, 10)}</Text>
                                <Text mx='10px'><Badge variant='subtle' colorScheme={item.idstatus === 6 ? 'gray' : item.idstatus === 7 ? 'yellow' : item.idstatus === 8 ? 'messenger' : item.idstatus === 9 ? 'green' : 'red'}>{item.status}</Badge></Text>
                                <Text fontWeight='semibold'>{item.invoice}</Text>
                            </Box>
                            <Box mt='10px'>
                                <Text fontWeight='semibold'>{item.warehouse}</Text>
                                <Text fontWeight='semibold'>Warehouse : {item.nama}</Text>
                            </Box>
                            <Box display='flex' justifyContent='space-between'>
                                <Box mt='10px' display='flex'>
                                    <Image src={`${API_URL}/${item.images[0].url}`} w='80px' borderRadius='10px' />
                                    <Center>
                                        <Box mx='15px'>
                                            <Text>Nama</Text>
                                            <Text>Rp.{(item.ongkir).toLocaleString()}</Text>
                                        </Box>
                                    </Center>
                                </Box>
                                <Box mr='50px' borderLeft='1px solid gray'>
                                    <Box ml='20px' my='20px'>
                                        <Text fontWeight='semibold'>Total Belanja</Text>
                                        <Text>Rp.{(item.ongkir).toLocaleString()}</Text>
                                    </Box>
                                </Box>
                            </Box>
                            <Box mt='15px' display='flex' justifyContent='end'>
                                <Button size='xs' colorScheme='blackAlpha' bgColor='red'>Reject</Button>
                                {item.idstatus === 7 && idrole === 2 && <Button ml='10px' size='xs' colorScheme='green' >Process Request</Button>}
                                {item.idstatus === 6 && idrole === 2 && <Button ml='10px' size='xs' colorScheme='red' color='white'>Reject</Button>}                                
                            </Box>
                        </Box>
                    </>
                )
            })
        } else {
            return (
                <>
                    <Box display='flex' justifyContent='center' my='20vh'>
                        <Heading as='h3' size='lg'>Belum ada transaksi</Heading>
                    </Box>
                </>
            )
        }
    }

    console.log(`requestList`, requestList)
    return (
        <>
            <Box>
                <p>ManagementRequest</p>
                {printRequest()}
                <Center>                    
                    <Pagination total={Math.ceil(requestList.length / limitData)} page={page} onChange={(event) => setPage(event)} size='lg' radius='xl' color='dark' />
                </Center>
            </Box>
        </>
    )
}

export default ManagementRequest