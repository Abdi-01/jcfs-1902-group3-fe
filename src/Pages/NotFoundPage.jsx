import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

const NotFoundPage = () => {
  return (
    <>
        <Box display='flex' justifyContent='center' my='10vw'>
            <Heading as='h2' size='xl'>Maaf, halaman yang dicari tidak ditemukan</Heading>
        </Box>
    </>
  )
}

export default NotFoundPage