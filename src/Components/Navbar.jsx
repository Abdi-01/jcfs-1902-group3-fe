import React from 'react'
import { Box, Button, Center, Flex, Heading, HStack, Icon, Image, Input, InputGroup, Spacer, Text } from '@chakra-ui/react'
const Navbar = () => {
  return (
    <>
        <Box bg={'white'} height='10vh' boxShadow='md' mb='8vh'>
                <Center>
                    <HStack spacing={'50px'} margin='2vw' height='2vh' color={'white'}>
                        <Text fontSize={'lg'} fontWeight='bold' color={'#6b3c3b'}>
                            Kamar Keluarga
                        </Text>
                        <Text fontSize={'lg'} fontWeight='bold' color={'#6b3c3b'}>
                            Kamar Mandi
                        </Text>
                        <Text fontSize={'lg'} fontWeight='bold' color={'#6b3c3b'}>
                            Kamar Tidur
                        </Text>
                    </HStack>
                </Center>
            </Box>
    </>
  )
}

export default Navbar