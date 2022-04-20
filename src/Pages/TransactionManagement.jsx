


// import { Box, Button, Center, Image, Text } from '@chakra-ui/react';
// import React from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import ModalRequestStock from '../Components/ModalRequestStock';
// import { API_URL } from '../helper';
// import { getProductAction } from '../redux/actions';

// class TransactionManagementPage extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     state = {
//         product:[],
//         page:1,
//         limitData:6,
        
//     }

//     printProduct = () => {
//         let {page, limitData, product} = this.state
//         if (product.length > 0) {
//             return product.slice(page > 1 ? (page - 1) * limitData : page - 1, page * limitData).map((item, index) => {
//                 return (
//                     <>
//                         <Link to={`/detail/product?idproduct=${item.idproduct}`} state={item}  >
//                             <Box maxW={'275px'} mt='80px' cursor='pointer' color='#6B3C3B' >
//                                 <Box display='flex'>
//                                     <Box position='absolute'>
//                                         <Image src={`${API_URL}/${item.material[0].url}`} zIndex='1' boxSize='45px' position='relative' top='-5px' left='30px' />
//                                     </Box>
//                                     <Box ml='85px'>
//                                         <Text fontSize='15px' fontWeight='medium' top='-5px' position='relative'>{item.material[0].material}</Text>
//                                     </Box>
//                                 </Box>
//                                 <Box maxW={'250px'} overflow='hidden' borderRadius='15px' boxShadow='lg' className='item-product'>
//                                     <Image src={`${API_URL}/${item.images[0].url}`} width='100%' transition='transform 1.2s ease-in-out' _hover={{ transform: "scale(1.1)" }} />
//                                     <Box position='absolute' display='none' >
//                                         <Button position='relative' colorScheme='facebook' top='-35px' ml='75px' size='sm'  >Lihat product</Button>
//                                     </Box>
//                                 </Box>
//                                 <Box p='3px'>
//                                     <Center>
//                                         <Box mt='2vh'>
//                                             <Text fontWeight={'bold'} fontSize='18px' color={'grey'}>{item.nama.split(' ')[0]}</Text>
//                                         </Box>
//                                     </Center>
//                                     <Center>
//                                         <Text fontSize='15px' fontWeight='semibold'>{item.nama}</Text>
//                                     </Center>
//                                     <Center>
//                                         <Text fontSize='20px' mt='2vh' fontWeight={'bold'}>IDR {item.harga.toLocaleString()}</Text>
//                                     </Center>
//                                 </Box>
//                             </Box>
//                         </Link>
//                     </>
//                 )
//             })
//         }
//     }

//     //onClick={() => this.onBtPilih(value.idaddress)}
//     render() {
//         return (
//             <Box className='text-center'>
//                 {/* <ModalRequestStock
//                     ModalRequestStock={this.state.ModalRequestStock}
//                     btClose={() => this.setState({ ModalRequestStock: !this.state.ModalRequestStock })}
//                     onClick={() => this.setState({ ModalRequestStock: !this.state.ModalRequestStock })}
//                 /> */}
//                 <p>Transaction Management Page</p>
//                 <Box>
//                     <Link to='/requeststock'>
//                         <Button
//                             size='sm'
//                             colorScheme='blackAlpha'
//                             bgColor='#6b3c3b'
//                         >
//                             Request Stock
//                         </Button>
//                     </Link>
//                     <Box>
//                         {this.printProduct}
//                     </Box>
//                 </Box>

//             </Box>
//         );
//     }
// }

// const mapToProps = (state) => {
//     return {
//         listProduct: state.userReducer.listProduct
//     }
// }

// export default connect(mapToProps,{getProductAction})(TransactionManagementPage);