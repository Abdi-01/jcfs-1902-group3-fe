import React, { useEffect, useState } from 'react'
import { Badge, Box, Button, Center, Flex, Heading, HStack, Icon, Image, Input, InputGroup, Spacer, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsCart3, BsPerson } from 'react-icons/bs'
import logoWeb from '../assets/web-icon.png'
import DrawerCart from './DrawerCart'
import DrawerUser from './DrawerUser'
import DrawerAdmin from './DrawerAdmin'

const Navbar = () => {

    const [openCart, setOpenCart] = useState(false)
    const [openUser, setOpenUser] = useState(false)
    const [openAdmin, setOpenAdmin] = useState(false)
    const { dataKategori, carts, username, idrole } = useSelector((state) => {

        return {
            dataKategori: state.kategoriReducer.listKategori,
            carts: state.transactionReducer.carts,
            username: state.userReducer.username,
            idrole: state.userReducer.idrole
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
    const setTotalCart = () => {
        let total = 0
        if (carts.length > 0) {
            carts.forEach((item, index) => {
                total = total + item.qty
            })
        }
        return total
    }
    return (
        <>
            <Box bg={'white'} height='10vh' boxShadow='md' position='sticky'>
                <Box mx='90px' display='flex'>
                    <Center>
                        <Box position='absolute'>
                            <Link to='/'>
                                <Image src={logoWeb} w='200px' position='relative' left='55px' />
                            </Link>
                        </Box>
                    </Center>
                    <Center ml='45vh'>
                        <HStack spacing={'80px'} margin='2vw' height='2vh' color={'white'}>
                            {printKategori()}
                        </HStack>
                    </Center>
                    {username &&
                        <Center ml='25vh'>
                            <Box display='flex'>
                                <Box mr='20px'>
                                    <Icon as={BsCart3} boxSize='22px' position='relative' left='8px' cursor='pointer' onClick={() => setOpenCart(!openCart)} />
                                    {
                                        carts.length > 0 && <Badge position='absolute' borderRadius='full' color='white' w='19px' h='19px' bgColor='#6B3C3B'><Center>{setTotalCart()}</Center></Badge>

                                    }
                                    <DrawerCart openCart={openCart} closeCart={() => setOpenCart(!openCart)} />
                                </Box>
                                {
                                    idrole == 3 ?
                                        <Box>
                                            <Icon as={BsPerson} boxSize='20px' cursor='pointer' onClick={() => setOpenUser(!openUser)} />
                                            <DrawerUser openUser={openUser} closeUser={() => setOpenUser(!openUser)} />
                                        </Box>
                                        :
                                        idrole == 2 ?
                                            <Box>
                                                <Icon as={BsPerson} boxSize='20px' cursor='pointer' onClick={() => setOpenAdmin(!openAdmin)} />
                                                <DrawerAdmin openAdmin={openAdmin} closeAdmin={() => setOpenAdmin(!openAdmin)} />
                                            </Box>
                                            :
                                            <Box>
                                                <Icon as={BsPerson} boxSize='20px' cursor='pointer' />
                                            </Box>
                                }
                            </Box>
                        </Center>
                    }
                </Box>
            </Box>
        </>
    )
}

export default Navbar

// import React from 'react'
// import { Box, Button, Center, Flex, Heading, HStack, Icon, Image, Input, InputGroup, Spacer, Text } from '@chakra-ui/react'
// import { Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// const Navbar = () => {
//     const { dataKategori } = useSelector((state) => {
//         return {
//             dataKategori: state.kategoriReducer.listKategori
//         }
//     })
//     const printKategori = () => {
//         if (dataKategori.length > 0) {
//             return dataKategori.map((item, index) => {
//                 return (
//                     <Link to={`/product?kategori=${item.idkategori}`} state={dataKategori[index]}>
//                         <Text fontSize={'lg'} fontWeight='bold' color={'#6b3c3b'}>
//                             {item.kategori}
//                         </Text>
//                     </Link>
//                 )
//             })
//         }
//     }
//     return (
//         <>
//             <Box bg={'white'} height='10vh' boxShadow='md'>
//                 <Center>
//                     <HStack spacing={'50px'} margin='2vw' height='2vh' color={'white'}>
//                         {/* {printKategori()} */}
//                         <Text fontSize={'lg'} fontWeight='bold' color={'#6b3c3b'}>
//                             Ruang Keluarga
//                         </Text>
//                         <Text fontSize={'lg'} fontWeight='bold' color={'#6b3c3b'}>
//                             Kamar Mandi
//                         </Text>
//                         <Text fontSize={'lg'} fontWeight='bold' color={'#6b3c3b'}>
//                             Kamar Tidur
//                         </Text>
//                     </HStack>
//                 </Center>
//             </Box>
//         </>
//     )
// }

// export default Navbar

// import React from 'react';
// import { Link } from "react-router-dom";
// import { Button, Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink, UncontrolledDropdown, DropdownMenu, DropdownItem, NavbarText, DropdownToggle, Spinner } from "reactstrap";
// import { connect } from "react-redux";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { FaMoneyBillAlt } from "react-icons/fa";
// import { FiLogOut } from "react-icons/fi";
// class  NavbarComponent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             color: ""
//          }
//     }
//     render() {
//         return (
//             <div style={{marginBottom:"60px"}}>
//                 <Navbar expand="md" color="light" fixed="top">
//                 <NavbarBrand>
//                     <Link to="/">
//                         <img src="https://i.postimg.cc/Fs2JsY4w/wood-avenue-logo-01.png" alt="logo-brand" width="80px" />
//                     </Link>
//                 </NavbarBrand>
//                 <NavbarToggler onClick={() => this.setState({ openCollapse: !this.state.openCollapse })} />
//                 <Collapse isOpen={this.state.openCollapse} navbar>
//                     <Nav>
//                         <NavItem>
//                             <Link className="nav-link" to="/product-page" style={{ color: "#5A5A5A", fontWeight: "bold" }}>
//                                RUANG KELUARGA
//                             </Link>
//                         </NavItem>
//                         <NavItem>
//                             <NavLink style={{ color: "#5A5A5A", fontWeight: "bold" }}>
//                                KAMAR MANDI
//                             </NavLink>
//                         </NavItem>
//                         <NavItem>
//                             <NavLink style={{ color: "#5A5A5A", fontWeight: "bold" }}>
//                                 KAMAR TIDUR
//                             </NavLink>
//                         </NavItem>
//                     </Nav>
//                     {

//                             this.props.username ?
//                                 <UncontrolledDropdown style={{ marginLeft: "auto" }}>
//                                     <DropdownToggle caret nav size="sm" className="d-flex align-items-center" style={{ color: "#6b3c3b" }}>
//                                         Hello, {this.props.username}!
//                                     </DropdownToggle>
//                                     {
//                                         this.props.idrole == 3
//                                             ?
//                                             <DropdownMenu right>
//                                                 <Link to="/profile" style={{ color: "#2d3436", textDecoration: "none" }}>
//                                                          <DropdownItem>
//                                                              Profile
//                                                          </DropdownItem>
//                                                    </Link>
//                                                 <Link to="/cart-page" style={{ color: "#159953", textDecoration: "none" }}>
//                                                     <DropdownItem style={{color: "#159953"}}>
//                                                        Cart  <AiOutlineShoppingCart/>
//                                                     </DropdownItem>
//                                                 </Link>
//                                                 <Link to="transaction-page" style={{ color: "#159953", textDecoration: "none" }}>
//                                                     <DropdownItem style={{color: "#159953"}}>
//                                                         Transactions <FaMoneyBillAlt/>
//                                                     </DropdownItem>
//                                                 </Link>
//                                                 <DropdownItem divider/>
//                                                 <DropdownItem onClick={() => {
//                                                     localStorage.removeItem("data");
//                                                     // this.props.logoutAction();
//                                                 }} style={{color: "red"}}>
//                                                     <FiLogOut/> Logout
//                                                 </DropdownItem>
//                                             </DropdownMenu>
//                                             :
//                                             <DropdownMenu right >
//                                                 <Link to="/product-admin" style={{ color: "#159953", textDecoration: "none" }} className="nav-link">
//                                                     <DropdownItem style={{color: "#159953"}}>
//                                                         Products Management
//                                                     </DropdownItem>
//                                                 </Link>
//                                                 <Link to="/transaction-admin" style={{ color: "#159953", textDecoration: "none" }} className="nav-link">
//                                                     <DropdownItem style={{color: "#159953"}}>
//                                                         Transactions Management
//                                                     </DropdownItem>
//                                                 </Link>
//                                                 <DropdownItem divider />
//                                                 <DropdownItem onClick={() => {
//                                                     localStorage.removeItem("data");

//                                                 }} style={{color: "red"}}>
//                                                     Logout
//                                                 </DropdownItem>
//                                             </DropdownMenu>
//                                     }
//                                 </UncontrolledDropdown>
//                                 :
//                                 <Nav style={{ marginLeft: "auto" }}>
//                                     <NavItem>
//                                         <Link className="nav-link" to="/register-page" style={{ color: "#5A5A5A" }}>
//                                             Register
//                                         </Link>
//                                     </NavItem>
//                                     <NavItem>
//                                         <Link className="nav-link" to="/login-page" style={{ color: "#5A5A5A" }}>
//                                             Login
//                                         </Link>
//                                     </NavItem>
//                                 </Nav>
//                     }
//                 </Collapse>
//             </Navbar>
//             </div>
//          );
//     }
// }
// const mapToProps = (state) => {
//     return {
//         username: state.userReducer.username,
//         idrole: state.userReducer.idrole,
//     }
// }

// export default connect(mapToProps)(NavbarComponent);

// import React, { useState } from 'react';
// import { connect, useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { Button, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Collapse, DropdownToggle, UncontrolledDropdown, DropdownMenu, DropdownItem, Spinner } from 'reactstrap';
// import { logOutAction } from '../redux/actions';
// import logo from '../assets/woodavenue.jpeg'

// class NavbarComponent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {

//         }
//     }
//     render() {
//         console.log("cek idrole",this.props.idrole)
//         return (
//             <div>
//                 <Navbar expand="md" className="shadow" style={{ padding: "25px" }}>
//                     <NavbarBrand>
//                         <Link to="/">
//                             <img src={logo} width="100px" />
//                         </Link>
//                     </NavbarBrand>
//                     <NavbarToggler onClick={() => this.setState({ openCollapse: !this.state.openCollapse })} />
//                     <Collapse isOpen={this.state.openCollapse} navbar>
//                         {
//                             this.props.loading ?
//                                 <Spinner style={{ marginLeft: "auto", marginRight: 50 }}>Loading...</Spinner>
//                                 :
//                                 this.props.username ?
//                                     <UncontrolledDropdown style={{ marginLeft: "auto" }}>
//                                         <DropdownToggle caret nav size="sm" outline className="d-flex align-items-center" style={{ color: "#6b3c3b" }}>
//                                             Hello,<b style={{ fontWeight: "bold" }}>{this.props.username}</b>
//                                         </DropdownToggle>
//                                         {
//                                             this.props.idrole == 3
//                                                 ?
//                                                 <DropdownMenu right>
//                                                     <Link to="/cart-user" style={{ color: "#2d3436", textDecoration: "none" }}>
//                                                         <DropdownItem>
//                                                             Cart
//                                                         </DropdownItem>
//                                                     </Link>
//                                                     <Link to="history-user" style={{ color: "#2d3436", textDecoration: "none" }}>
//                                                         <DropdownItem>

//                                                         </DropdownItem>
//                                                     </Link>
//                                                     <Link to="/profile" style={{ color: "#2d3436", textDecoration: "none" }}>
//                                                         <DropdownItem>
//                                                             Profile
//                                                         </DropdownItem>
//                                                     </Link>
//                                                     <DropdownItem divider />
//                                                     <DropdownItem onClick={() => { localStorage.removeItem("data"); this.props.onLogout() }}>
//                                                         Keluar
//                                                     </DropdownItem>
//                                                 </DropdownMenu>
//                                                 :
//                                                 <DropdownMenu right >
//                                                     <Link to="/product-management" style={{ color: "#2d3436" }} className="nav-link">
//                                                         <DropdownItem>
//                                                             tes1
//                                                         </DropdownItem>
//                                                     </Link>
//                                                     <Link to="/management-article" style={{ color: "#2d3436" }} className="nav-link">
//                                                         <DropdownItem>
//                                                             tes2
//                                                         </DropdownItem>
//                                                     </Link>
//                                                     <DropdownItem divider />
//                                                     <DropdownItem onClick={() => { localStorage.removeItem("data"); this.props.onLogout() }}>
//                                                         Keluar
//                                                     </DropdownItem>
//                                                 </DropdownMenu>
//                                         }

//                                     </UncontrolledDropdown>
//                                     :
//                                     <>
//                                         <Nav style={{ marginLeft: "auto", marginRight: "35px" }}>
//                                             <Link to="/Login"><Button  style={{ marginRight: "10px", backgroundColor: "white", borderColor: "white", color: "red" }} type="button" >Login</Button></Link>
//                                             <Link to="/Register"><Button outline color='danger' type="button">Register</Button></Link>
//                                         </Nav>
//                                     </>

//                         }
//                     </Collapse>
//                 </Navbar>

//             </div>
//         );
//     }
// }
// const mapToProps = (state) => {
//     return {
//         username: state.userReducer.username,
//         idrole: state.userReducer.idrole,
//         iduser: state.userReducer.iduser

//     }
// }
// export default connect(mapToProps, { logOutAction })(NavbarComponent);
