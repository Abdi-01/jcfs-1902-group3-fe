import React from 'react'
import { Box, Button, Center, Flex, Heading, HStack, Icon, Image, Input, InputGroup, Spacer, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
const Navbar = () => {
    const { dataKategori } = useSelector((state) => {
        return {
            dataKategori: state.kategoriReducer.listKategori
        }
    })
    const printKategori = () => {
        if (dataKategori.length > 0) {
            return dataKategori.map((item, index) => {
                return (
                    <Link to={`/product?kategori=${item.idkategori}`} state={dataKategori[index]}>
                        <Text fontSize={'lg'} fontWeight='bold' color={'#6b3c3b'}>
                            {item.kategori}
                        </Text>
                    </Link>
                )
            })
        }
    }
    return (
        <>
            <Box bg={'white'} height='10vh' boxShadow='md' mb='8vh'>
                <Center>
                    <HStack spacing={'50px'} margin='2vw' height='2vh' color={'white'}>
                        {printKategori()}
                    </HStack>
                </Center>
            </Box>
        </>
    )
}

export default Navbar