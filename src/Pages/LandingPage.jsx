import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Card, CardColumns, CardImg, Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem, FormGroup, Input, InputGroup, InputGroupText, Label, UncontrolledCarousel } from 'reactstrap';
import { logOutAction, onLogin } from '../redux/actions';
import background from '../assets/bg1.png'
import { Box, Button, ButtonGroup, Heading, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Center } from '@chakra-ui/react';
import productIcon from '../assets/product-development.png'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { API_URL } from '../helper';
import ModalForgotPassword from '../Components/ModalForgotPassword';
import Swal from 'sweetalert2';
import { Link, Navigate } from 'react-router-dom';
import Slider from 'react-slick'
import banner1 from '../assets/carousel/banner1.jpg'
import banner2 from '../assets/carousel/banner2.jpg'
import banner3 from '../assets/carousel/banner3.jpg'
import iconMeja from '../assets/icon-carousel/meja.png'
import iconKursi from '../assets/icon-carousel/kursi.png'
import iconLemari from '../assets/icon-carousel/lemari.png'
import iconKategori from '../assets/semua produk.png'
import iconProdukBaru from '../assets/iconNewProduct.svg'
import iconInspirasi from '../assets/iconInspirasi.svg'
import living from '../assets/card-kategori/living.png'
import bath from '../assets/card-kategori/bath.png'
import bed from '../assets/card-kategori/bed.png'
import kayu from '../assets/bg-wood.png'
import fsc from '../assets/logo-fsc.png'
import inspirasi1 from '../assets/inspirasi-img/inspirasi1.jpg'
import inspirasi2 from '../assets/inspirasi-img/inspirasi2.jpg'
import inspirasi3 from '../assets/inspirasi-img/inspirasi3.jpg'
import inspirasi4 from '../assets/inspirasi-img/inspirasi4.jpg'
import inspirasi5 from '../assets/inspirasi-img/inspirasi5.jpg'
import inspirasi6 from '../assets/inspirasi-img/inspirasi6.jpg'
import GoOnTop from '../Components/GoOnTop';
import BtnOnTop from '../Components/BtnOnTop';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "none" }}
            onClick={onClick}
        />
    );
}
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "none" }}
            onClick={onClick}
        />
    );
}

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        passShow: <AiOutlineEyeInvisible />,
        passType: "password",
        dataUser: [],
        modalOpenPassword: false,
        productList: [],
        settingsCarousel: {
            dots: true,
            infinite: true,
            slideToShow: 1,
            autoplay: true,
            speed: 1000,
            autoplaySpeed: 7000,
            cssEase: 'linear',
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />

        },
        settingsCarouselCard: {
            infinite: true,
            slideToShow: 1,
            autoplay: true,
            speed: 1000,
            autoplaySpeed: 7000,
            cssEase: 'linear',
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        },
        banners: [banner1, banner2, banner3],
        carouselCard: [
            {
                icon: iconKursi,
                iconSize: '100px',
                subKategori: 'Kursi Tribute',
                deskripsi: 'Rangkaian tempat duduk berlapis kulit, rotan dan anyaman kertas dari koleksi Tribute.'
            },
            {
                icon: iconMeja,
                iconSize: '160px',
                subKategori: 'Koleksi Curbus',
                deskripsi: 'Lengkungan yang anggun memancarkan keindahan alami dari kayu solid',
            },
            {
                icon: iconLemari,
                iconSize: '120px',
                subKategori: 'Koleksi Tansu K',
                deskripsi: 'Lemari tangga bernuansa Jepang yang menawan.'
            }
        ],
        cartegoryCard: [
            {
                image: living,
                idkategori: 1,
                kategori: 'Ruang Keluarga',
                deskripsi: 'Furniture terbaik untuk berkumpul dengan yang tersayang '
            },
            {
                image: bath,
                idkategori: 2,
                kategori: 'Kamar Mandi',
                deskripsi: 'Mahakarya untuk pengalaman mandi yang mewah elegan'
            },
            {
                image: bed,
                idkategori: 3,
                kategori: 'Kamar Tidur',
                deskripsi: 'Serangkaian furnitur ternyaman untuk kamar tidur anda'
            }
        ]
    }
    componentDidMount() {
        axios.get(`${API_URL}/products?limit=3`)
            .then((res) => {
                this.setState({
                    productList: res.data.dataProduct
                })
            }).catch((err) => {
                console.log(err)
            })
    }
    printBanner = () => {
        return this.state.banners.map((item, index) => {
            return (
                <>
                    <Box key={index}>
                        <Image src={item} alt="banner" />
                    </Box>
                </>
            )
        })
    }
    printCarouselCard = () => {
        return this.state.carouselCard.map((item, index) => {
            return (
                <>
                    <Box py='8' margin='auto' w={item.iconSize} key={index}>
                        <Image src={item.icon} />
                    </Box>
                    <Box textAlign='center' color='white'>
                        <Text fontWeight='bold' fontSize='35px'>{item.subKategori}</Text>
                        <Text px='5' fontSize='20px'>{item.deskripsi}</Text>
                        <Text my='50px' color='white' fontSize='25px' fontWeight='semibold'>Telurusi lebih jauh</Text>
                        <Button mb='20px' colorScheme='whiteAlpha'>Beli Sekarang</Button>
                    </Box>
                </>
            )
        })
    }
    printCardCategory = () => {
        return this.state.cartegoryCard.map((item, index) => {
            return (
                <>
                    <Link to={`/product?kategori=${item.idkategori}`} state={this.state.cartegoryCard[index]} key={index}>
                        <Box overflow='hidden' h='400px' maxW='280px' borderRadius='15px' className='card-category' mr='10px'>
                            <Image src={item.image} width='100%' />
                            <Box position='relative' top='-300px' textAlign='center' fontWeight='semibold' textShadow='2px 2px 4px #000000'>
                                <Text fontSize='25px'>{item.kategori}</Text>
                                <Text mt='15px' mx='5px' textAlign='center' fontSize='12px' >
                                    {item.deskripsi}
                                </Text>
                            </Box>
                        </Box>
                    </Link>
                </>
            )
        })
    }
    printNewProduct = () => {
        if (this.state.productList.length > 0) {
            return this.state.productList.map((item, index) => {
                return (
                    <>
                        <Link to={`/detail/product?idproduct=${item.idproduct}`} state={item}>
                            <Box maxW={'275px'} mt='40px' cursor='pointer' color='#6B3C3B'>
                                <Box display='flex'>
                                    <Box position='absolute'>
                                        <Image src={`${API_URL}/${item.material[0].url}`} zIndex='1' boxSize='45px' position='relative' top='-5px' left='30px' />
                                    </Box>
                                    <Box ml='85px'>
                                        <Text fontSize='15px' fontWeight='medium' top='-5px' position='relative'>{item.material[0].material}</Text>
                                    </Box>
                                </Box>
                                <Box maxW={'250px'} overflow='hidden' borderRadius='15px' boxShadow='lg' className='item-product'>
                                    <Image src={`${API_URL}/${item.images[0].url}`} width='100%' transition='transform 1.2s ease-in-out' _hover={{ transform: "scale(1.1)" }} />
                                    <Box position='absolute' display='none' >
                                        <Button position='relative' colorScheme='facebook' top='-35px' ml='75px' size='sm'  >Lihat product</Button>
                                    </Box>
                                </Box>
                                <Box p='3px'>
                                    <Center>
                                        <Box mt='2vh'>
                                            <Text fontWeight={'bold'} fontSize='18px' color={'grey'}>{item.nama.split(' ')[0]}</Text>
                                        </Box>
                                    </Center>
                                    <Center>
                                        <Text fontSize='15px' fontWeight='semibold'>{item.nama}</Text>
                                    </Center>
                                    <Center>
                                        <Text fontSize='20px' mt='2vh' fontWeight={'bold'}>IDR {item.harga.toLocaleString()}</Text>
                                    </Center>
                                </Box>
                            </Box>
                        </Link>
                    </>
                )
            })
        }
    }
    printLandingPage = () => {
        if (this.props.username === "" || this.props.idrole === 2 || this.props.idrole === 3) {
            return (
                <>
                    {console.log('isi product', this.state.productList)}
                    <ModalForgotPassword
                        modalOpenForgot={this.state.modalOpenForgot}
                        btClose={() => this.setState({ modalOpenForgot: !this.state.modalOpenForgot })}
                    />
                    <GoOnTop />
                    <Box>
                        <Slider {...this.state.settingsCarousel}>
                            {this.printBanner()}
                        </Slider>
                        <Box position='absolute' w='30vw' left='5%' top='200px' borderRadius='15px' backgroundColor='#4D4D4F'>
                            <Slider {...this.state.settingsCarouselCard}>
                                {this.printCarouselCard()}
                            </Slider>
                        </Box>
                    </Box>
                    <Box position='absolute' top='220px' right='5%' display={this.props.username ? 'none' : 'inline-block'}>
                        <div className='bg-container' style={{ width: "27vw", borderRadius: "9px", margin: "auto" }}>
                            <Tabs>
                                <TabList>
                                    <Tab className='col-6' style={{ fontWeight: 400, color: "#6b3c3b" }}>Login</Tab>
                                    <Tab className='col-6' style={{ fontWeight: 400, color: "#6b3c3b" }}>Register</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <div style={{ textAlign: "center" }}>
                                            <p style={{ fontWeight: 500, color: "#6b3c3b", fontSize: 27 }}>LOGIN</p>
                                            <FormGroup style={{ marginTop: 25 }} >
                                                <Input type="text" id="textEmail" placeholder="Email/Username"
                                                    innerRef={(element) => this.emailLogin = element}
                                                    style={{ width: 300, margin: "auto" }} />
                                            </FormGroup>
                                            <FormGroup style={{ marginTop: 25 }} >
                                                <InputGroup style={{ width: 300, margin: "auto" }}>
                                                    <Input id="textEmail" placeholder="Password"
                                                        innerRef={(element) => this.passwordLogin = element} type={this.state.passType} />
                                                    <InputGroupText style={{ cursor: "pointer" }} onClick={this.showPass}>
                                                        {this.state.passShow}
                                                    </InputGroupText>
                                                </InputGroup>
                                            </FormGroup>
                                            <div>
                                                <Button colorScheme='teal' style={{ color: "white", width: 300, borderRadius: 50, marginTop: 15 }} onClick={this.btLogin}>Login</Button>
                                            </div>
                                            <Button colorScheme='teal' variant='link' style={{ textAlign: "center", marginTop: 25 }} onClick={() => this.setState({ modalOpenForgot: !this.state.modalOpenForgot })}>Forgot Password</Button>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div style={{ textAlign: "center" }}>
                                            <p style={{ fontWeight: 500, color: "#6b3c3b", fontSize: 27 }}>Register Account</p>
                                            <div style={{}}>
                                                <FormGroup style={{ marginTop: 25, textAlign: "center", border: "none" }}>
                                                    <Input type="text" id="textEmail" value={this.state.username} defaultValue={this.state.username} placeholder='Username'
                                                        innerRef={(element) => this.username = element}
                                                        style={{ width: 300, margin: "auto" }} />
                                                </FormGroup>
                                                <FormGroup style={{ marginTop: 25 }}>
                                                    <Input type="text" id="textEmail" value={this.state.email} defaultValue={this.state.email} placeholder='Email'
                                                        innerRef={(element) => this.email = element}
                                                        style={{ width: 300, margin: "auto" }} />
                                                </FormGroup>
                                                <FormGroup style={{ marginTop: 25 }}>
                                                    <InputGroup style={{ width: 300, margin: "auto" }}>
                                                        <Input id="textEmail" value={this.state.password} defaultValue={this.state.password} placeholder='Password'
                                                            innerRef={(element) => this.password = element} type={this.state.passType}
                                                        />
                                                        <InputGroupText style={{ cursor: "pointer" }} onClick={this.showPass}>
                                                            {this.state.passShow}
                                                        </InputGroupText>
                                                    </InputGroup>
                                                </FormGroup>
                                                <Button colorScheme='teal' style={{ color: "white", width: 300, borderRadius: 50, marginTop: 15 }} onClick={this.btRegis}>Create Account</Button>
                                            </div>
                                        </div>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </div>
                    </Box>
                    <Box mt='120px' mx='200px'>
                        <Box display='flex' alignItems='center'>
                            <Image src={iconKategori} boxSize='50px' mr='10px' />
                            <Text fontWeight='light' fontSize='40px' color='#4D4D4F'>Kategori Produk</Text>
                        </Box>
                        <Box my='20px' display='flex'>
                            {this.printCardCategory()}
                        </Box>
                    </Box>
                    <Box backgroundColor='#EFECEA' position='relative' top='-100px' zIndex='-1'>
                        <Box py='120px' w='855px' margin='auto' textAlign='center'>
                            <Text fontWeight='semibold' fontSize='50px'>SOLID WOOD ONLY</Text>
                            <Text mt='30px' px='5' fontWeight='semibold' fontSize='20px'>Solid Wood Only adalah prinsip yang kami pegang erat.
                                Untuk itu, proses produksi furnitur sangatlah kami jaga dengan
                                ketat demi mempertahankan keindahan alami yang tak lekang oleh waktu dari kayu solid.
                            </Text>
                            <Button mt='50px' colorScheme='blackAlpha'>Pelajari lebih lanjut</Button>
                        </Box>
                        <Box position='absolute' top='50%' >
                            <Image src={kayu} boxSize='600px' position='relative' left='-320px' top='-300px' />
                        </Box>
                    </Box>
                    <Box mx='200px'>
                        <Box display='flex' alignItems='center' >
                            <Image src={iconProdukBaru} boxSize='70px' mr='10px' />
                            <Text fontWeight='light' fontSize='40px' color='#4D4D4F'>Produk Terbaru</Text>
                        </Box>
                        <Box display='flex' justifyContent='space-between'>
                            {this.printNewProduct()}
                        </Box>
                    </Box>
                    <Box backgroundColor='#EFECEA' mt='100px' className='section-fsc'>
                        <Box display='flex' justifyContent='center' mx='300px'>
                            <Text mt='80px ' textAlign='center' fontSize='17px'>"Menjaga kelestarian lingkungan merupakan salah satu kewajiban kami demi
                                kemaslahatan generasi masa depan. Secara resmi, kami telah mengantongi sertifikat dari
                                <b> Forest Stewardship Council (FSC).</b>"</Text>
                        </Box>
                        <Box display='flex' justifyContent='center' >
                            <Image src={fsc} w='80px' h='120px' my='20px' />
                        </Box>
                    </Box>
                    <Box mt='40px' mx='200px'>
                        <Box display='flex' alignItems='center' >
                            <Image src={iconInspirasi} boxSize='70px' mr='10px' />
                            <Text fontWeight='light' fontSize='40px' color='#4D4D4F'>Inspirasi</Text>
                        </Box>
                        <Text fontWeight='light' fontSize='20px' color='#4D4D4F'>Cek galeri Instagram kami untuk inspirasi hunian Anda.</Text>
                    </Box>
                    <Box my='20px' display='flex' mx='20px' justifyContent='center'>
                        <Box mr='10px'>
                            <Image src={inspirasi1} w='633px' h='791px' borderRadius='10px' boxShadow='md' />
                        </Box>
                        <Box mr='10px'>
                            <Image src={inspirasi4} w='314px' h='314px' borderRadius='10px' boxShadow='md' />
                            <Image src={inspirasi3} my='10px' w='314px' h='230px' borderRadius='10px' boxShadow='md' />
                            <Image src={inspirasi6} w='314px' h='230px' borderRadius='10px' boxShadow='md' />
                        </Box>
                        <Box>
                            <Image src={inspirasi2} w='300px' h='390px' borderRadius='10px' boxShadow='md' />
                            <Image mt='10px' src={inspirasi5} w='300px' h='390px' borderRadius='10px' boxShadow='md' />
                        </Box>
                    </Box>
                </>
            )
        } else {
            return (
                <div>
                    <ModalForgotPassword
                        modalOpenForgot={this.state.modalOpenForgot}
                        btClose={() => this.setState({ modalOpenForgot: !this.state.modalOpenForgot })}
                    />
                    <div className='bg-image' style={{ height: "75vh", backgroundRepeat: "no-repeat", width: "100%", backgroundSize: "cover", backgroundPosition: "80% 40%", backgroundImage: "url('https://images.pexels.com/photos/5711874/pexels-photo-5711874.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260')" }}>
                    </div>
                    <div className='bg-text' style={{ width: "80%" }}>
                        <div style={{ textAlign: "center" }}>
                            <h6 style={{ fontSize: "48px", fontWeight: 600, marginBottom: "50px" }}>Ini Super Admin</h6>
                            <p style={{ fontSize: "17px", paddingTop: "" }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <Box className='row' style={{ paddingTop: "35px", width: "50%", margin: "auto" }}>
                                <Box className='col-6'>
                                    <Link to='/warehouse'>
                                        <Button colorScheme='teal' size={'lg'} variant='solid'>
                                            Create Warehouse
                                        </Button>
                                    </Link>
                                </Box>
                                <Box className='col-6'>
                                    <Link to='/addadmin'>
                                        <Button colorScheme='teal' size='lg' variant='solid' style={{ paddingLeft: 10 }}>
                                            Add Admin Warehouse
                                        </Button>
                                    </Link>
                                </Box>
                            </Box>
                        </div>
                    </div>
                </div >
            )
        }
    }

    showPass = () => {
        if (this.state.passType == "password") {
            this.setState({
                passShow: <AiOutlineEye />,
                passType: "text"
            })
        } else {
            this.setState({
                passShow: <AiOutlineEyeInvisible />,
                passType: "password"
            })
        }
    }

    btRegis = () => {
        if (this.username.value === "") {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Username Empty',
                showConfirmButton: false,
                timer: 1500
            })
        } else if (this.email.value === "") {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Email Empty',
                showConfirmButton: false,
                timer: 1500
            })
        } else if (this.password.value === "") {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Password Empty',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            if (this.email.value.includes("@")) {
                axios.post(`${API_URL}/users/register`, {
                    username: this.username.value,
                    email: this.email.value,
                    password: this.password.value,
                })
                    .then((response) => {
                        console.log("data regis", response.dataRegis)
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'register success ✔',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.username.value = ""
                        this.email.value = ""
                        this.password.value = ""
                    })
                    .catch((error) => {
                        console.log(error)
                        if (error.response) {
                            console.log(error.response.data.message);
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: (error.response.data.message),
                            })
                        }
                    })
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'email didnt contain @',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.username.value = ""
                this.email.value = ""
                this.password.value = ""
            }
        }
    }

    getData = () => {
        axios.get(`${API_URL}/users/`)
            .then((response) => {
                console.log("GET DATA LOGIN", response.data)
                this.setState({ dataUser: response.data })
            }).catch((error) => {
                console.log(error)
            })
    }

    btLogin = () => {
        if (this.emailLogin.value == "" || this.passwordLogin.value == "") {
            // alert(`Input your Username & Password❗`)
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Input your Username & Password❗',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            this.props.onLogin(this.emailLogin.value, this.passwordLogin.value)
        }
    }

    render() {
        return (
            <div>
                {this.printLandingPage()}
                <BtnOnTop />
            </div>
        );

    }
}
const mapToProps = (state) => {
    return {
        username: state.userReducer.username,
        email: state.userReducer.email,
        iduser: state.userReducer.iduser,
        idrole: state.userReducer.idrole
    }
}

export default connect(mapToProps, { logOutAction, onLogin })(LandingPage);