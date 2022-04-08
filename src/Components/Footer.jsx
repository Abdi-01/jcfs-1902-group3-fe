import React from 'react'
import { Box, Button, Flex, Icon, Input, InputGroup, Spacer, Text } from '@chakra-ui/react'
import { AiFillFacebook } from 'react-icons/ai'
import { AiOutlineInstagram } from 'react-icons/ai'
import { AiOutlineTwitter } from 'react-icons/ai'
import { AiOutlineYoutube } from 'react-icons/ai'
const Footer = () => {
    return (
        <>
            <Box bg={'#575757'} height='45vh' p='5vh'>
                <Box display={'flex'} justifyContent='space-around' color={'white'}>
                    <Box>
                        <Text fontWeight={'bold'}>HUBUNGI KAMI</Text>
                        <Text mt='5px'>info@woodavenue.co.id</Text>
                        <Text mt='5px'>08112643121</Text>
                    </Box>
                    <Box>
                        <Text fontWeight={'bold'}>IKUTI KAMI</Text>
                        <Box display={'flex'} mt='1vh'>
                            <Icon as={AiFillFacebook} w='7' h='7' />
                            <Icon as={AiOutlineInstagram} w='7' h='7' />
                            <Icon as={AiOutlineTwitter} w='7' h='7' />
                            <Icon as={AiOutlineYoutube} w='7' h='7' />
                        </Box>
                    </Box>
                    <Box>
                        <Text fontWeight={'bold'}>TENTANG KAMI</Text>
                        <Text mt='5px'>Desain & Keterampilan</Text>
                        <Text mt='5px'>Material yang Berkelanjutan</Text>
                        <Text mt='5px'>Butuh Bantuan</Text>
                        <Text mt='5px'>Apakah Anda Seorang Profesional? Mari Terhubung!</Text>
                    </Box>
                    <Box>
                        <Text fontWeight={'bold'}>TETAP TERHUBUNG</Text>
                        <InputGroup mt='2vh'>
                            <Input placeholder='Email Anda' size='sm' w='10vw' />
                            <Button bgColor={'black'} size='sm' borderRadius={'0'}>Berlangganan</Button>
                        </InputGroup>
                    </Box>
                </Box>
                <Box mt='10vh'>
                    <Flex>
                        <Box>
                            <Text color={'#ABABAB'}>© Wood Avenue, Seluruh hak cipta</Text>
                        </Box>
                        <Spacer />
                        <Box mr='3vw' color={'white'}>
                            <Text>Syarat & Ketentuan</Text>
                        </Box>
                        <Box color={'white'}>
                            <Text>Kebijakan Privasi</Text>
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </>
    )
}

export default Footer