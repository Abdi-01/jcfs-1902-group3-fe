import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import loading from '../assets/loading.gif'
const LoadingPage = () => {
  return (
    <>
        <Box display='flex' justifyContent='center'>
            <Image src={loading} boxSize='500'/>
        </Box>
    </>
  )
}

export default LoadingPage