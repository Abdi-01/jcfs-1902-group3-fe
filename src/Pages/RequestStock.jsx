import { Box, Button } from '@chakra-ui/react';
import React from 'react';

class RequestStockPage extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
            <Box className='text-center'>
                <Button>Request Stock</Button>
            </Box>
         );
    }
}
 
export default RequestStockPage;