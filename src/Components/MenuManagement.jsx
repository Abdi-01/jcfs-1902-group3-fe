import React from 'react'
import { Box, Center, Icon, Image, Menu, Text } from '@chakra-ui/react'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { Link } from 'react-router-dom'

const MenuManagement = (props) => {
    return (
        <>
            <Box w='20vw' h='35vw' borderRadius='15px' boxShadow='lg'>
                <Box display='flex' p='5'>
                    <Image boxSize='80px' borderRadius='full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlYdOdFhSlfKukj6FKFx_SvqfRy9h6ld8Ki2C87CxBdDsFgZ5BAEy2iF8aO1mGpVesGHg&usqp=CAU' />
                    <Center>
                        <Box>
                            <Text ml='10px'>John Doe</Text>
                            <Text ml='10px'>Admin</Text>
                        </Box>
                    </Center>
                </Box>
                <hr />
                <Box p='5'>
                    <Box display='flex'>
                        <Icon as={MdProductionQuantityLimits} boxSize='7' />
                        <Center>
                            <Box ml='20px'>
                                <Link to='/management/product'>Management Product</Link>
                            </Box>
                        </Center>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default MenuManagement