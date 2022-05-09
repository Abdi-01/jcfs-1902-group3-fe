import { Box, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { GoArrowUp } from 'react-icons/go'

const BtnOnTop = () => {
    const onTop = () => {
        window.scrollTo(0,0)
    }
    return (
        <>
            <Box backgroundColor='#6B3C3B' display={window.scrollTo(0,0) ? 'none' : 'flex'} justifyContent='center'
             alignItems='center' borderRadius='full' boxSize='50px' cursor='pointer'
              position='fixed' bottom='20px' right='20px' onClick={onTop}>
                <Icon as={GoArrowUp} boxSize='35px' color='white'  />
            </Box>
        </>
    )
}

export default BtnOnTop