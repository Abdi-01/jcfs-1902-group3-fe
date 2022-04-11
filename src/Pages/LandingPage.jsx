import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Card, CardColumns, CardImg, Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem, FormGroup, Input, InputGroup, InputGroupText, Label, UncontrolledCarousel } from 'reactstrap';
import { logOutAction, onLogin } from '../redux/actions';
import background from '../assets/bg1.png'
import { Box, Button, ButtonGroup, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import productIcon from '../assets/product-development.png'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { API_URL } from '../helper';
import ModalForgotPassword from '../Components/ModalForgotPassword';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        passShow: <AiOutlineEyeInvisible />,
        passType: "password",
        dataUser: [],
        modalOpenPassword: false
    }

    printLandingPage = () => {
        if (this.props.username == "") {
            return (
                <div>
                    <ModalForgotPassword
                        modalOpenForgot={this.state.modalOpenForgot}
                        btClose={() => this.setState({ modalOpenForgot: !this.state.modalOpenForgot })}
                    />
                    <div className='bg-image' style={{ height: "75vh", backgroundRepeat: "no-repeat", width: "100%", backgroundSize: "cover", backgroundPosition: "80% 40%", backgroundImage: "url('https://images.pexels.com/photos/5711874/pexels-photo-5711874.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260')" }}>
                    </div>
                    <div className='bg-text' style={{ width: "90%" }}>
                        <div className='row' style={{ paddingBot: "100px" }}>
                            <div className='col-6' style={{ margin: "auto" }}>
                                <h6 style={{ fontSize: "48px", fontWeight: 600, marginBottom: "50px" }}>We help startups launch their products with awesome website</h6>
                                <p style={{ fontSize: "17px", paddingTop: "" }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <div style={{ paddingTop: "35px" }}>
                                    <Button colorScheme='teal' size={'lg'} variant='solid' style={{ borderRadius: "50%" }}>
                                        <img src={productIcon} style={{ blockSize: 20 }} />
                                    </Button>                                    
                                
                                    <Button colorScheme='white' variant='link' style={{ paddingLeft: 10 }}>
                                        Check Our Product
                                    </Button>
                                </div>
                            </div>

                            <div className='col-2'>

                            </div>

                            <div className='col-4' style={{ margin: "auto" }}>
                                <div className='container' style={{}}>
                                    <div className='bg-container' style={{ height: "53vh", width: "27vw", borderRadius: "9px", margin: "auto" }}>
                                        <Tabs>
                                            <TabList>
                                                <Tab className='col-6' style={{ fontWeight: 400, color: "#6b3c3b" }}>Register</Tab>
                                                <Tab className='col-6' style={{ fontWeight: 400, color: "#6b3c3b" }}>Login</Tab>
                                            </TabList>
                                            <TabPanels>
                                                <TabPanel>
                                                    <div style={{ textAlign: "center" }}>
                                                        <p style={{ fontWeight: 500, color: "#6b3c3b", fontSize: 27 }}>Register Account</p>
                                                        <div style={{}}>
                                                            <FormGroup style={{ marginTop: 25, textAlign: "center", border: "none" }}>                                                                
                                                                <Input type="text" id="textEmail" placeholder="Username"
                                                                    innerRef={(element) => this.username = element}
                                                                    style={{ width: 300, margin: "auto" }} />
                                                            </FormGroup>
                                                            <FormGroup style={{ marginTop: 25 }}>                                                                
                                                                <Input type="text" id="textEmail" placeholder="Email"
                                                                    innerRef={(element) => this.email = element}
                                                                    style={{ width: 300, margin: "auto" }} />
                                                            </FormGroup>
                                                            <FormGroup style={{ marginTop: 25 }}>                                                               
                                                                <InputGroup style={{ width: 300, margin: "auto" }}>
                                                                    <Input id="textEmail" placeholder="Password"
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
                                                <TabPanel>
                                                    <div style={{ textAlign: "center" }}>
                                                        <p style={{ fontWeight: 500, color: "#6b3c3b", fontSize: 27 }}>LOGIN</p>
                                                        <FormGroup style={{ marginTop: 25 }} >                                                            
                                                            <Input type="text" id="textEmail" placeholder="Email"
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
                                            </TabPanels>
                                        </Tabs>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            )
        }else{
            return(
                <div>
                <ModalForgotPassword
                    modalOpenForgot={this.state.modalOpenForgot}
                    btClose={() => this.setState({ modalOpenForgot: !this.state.modalOpenForgot })}
                />
                <div className='bg-image' style={{ height: "75vh", backgroundRepeat: "no-repeat", width: "100%", backgroundSize: "cover", backgroundPosition: "80% 40%", backgroundImage: "url('https://images.pexels.com/photos/5711874/pexels-photo-5711874.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260')" }}>
                </div>                
                <div className='bg-text' style={{ width: "80%" }}>
                    {/* <div> */}
                        <div style={{ textAlign:"center" }}>
                            <h6 style={{ fontSize: "48px", fontWeight: 600, marginBottom: "50px" }}>We help startups launch their products with awesome website</h6>
                            <p style={{ fontSize: "17px", paddingTop: "" }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <div style={{ paddingTop: "35px" }}>
                                <Button colorScheme='teal' size={'lg'} variant='solid' style={{ borderRadius: "50%" }}>
                                    <img src={productIcon} style={{ blockSize: 20 }} />
                                </Button>                                
                                <Button colorScheme='white' variant='link' style={{ paddingLeft: 10 }}>
                                    Check Out Cart
                                </Button>
                            </div>
                        </div>
                    {/* </div> */}
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
            alert("Username empty")
        } else if (this.email.value === "") {
            alert("email empty")
        } else if (this.password.value === "") {
            alert("password empty")
        } else {
            if (this.email.value.includes("@")) {
                axios.post(`${API_URL}/users/register`, {
                    username: this.username.value,
                    email: this.email.value,
                    password: this.password.value,
                }).then((response) => {
                    alert("register success ✔")
                }).catch((error) => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data.message);
                        alert(error.response.data.message);
                        // console.log(error.response.status);
                        // console.log(error.response.headers);
                    }
                })
            } else {
                alert("email didnt contain @")
            }
        }
    }

    // componentDidMount() {
    //     this.getData()
    // }

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
            alert(`Input your Username & Password❗`)
        } else {
            this.props.onLogin(this.emailLogin.value, this.passwordLogin.value)
        }
    }

    render() {        
            return (
                <div>
                    {this.printLandingPage()}
                </div >
            );                                  
        
    }
}
const mapToProps = (state) => {
    return {
        username: state.userReducer.username,
        email: state.userReducer.email,
        iduser: state.userReducer.iduser,
    }
}

export default connect(mapToProps, { logOutAction, onLogin })(LandingPage);


{/* <ModalForgotPassword
    modalOpenForgot={this.state.modalOpenForgot}
    btClose={() => this.setState({ modalOpenForgot: !this.state.modalOpenForgot })}
/>
<div className='bg-image' style={{ height: "75vh", backgroundRepeat: "no-repeat", width: "100%", backgroundSize: "cover", backgroundPosition: "80% 40%", backgroundImage: "url('https://images.pexels.com/photos/5711874/pexels-photo-5711874.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260')" }}>
</div>
<div className='bg-text' style={{ width: "90%" }}>
    <div className='row'>
        <div className='col-6' style={{ margin: "auto" }}>
            <h6 style={{ fontSize: "48px", fontWeight: 600, marginBottom: "50px" }}>We help startups launch their products with awesome website</h6>
            <p style={{ fontSize: "17px", paddingTop: "" }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div style={{ paddingTop: "35px" }}>
                <Button colorScheme='teal' size={'lg'} variant='solid' style={{ borderRadius: "50%" }}>
                    <img src={productIcon} style={{ blockSize: 20 }} />
                </Button>                                    
                <Button colorScheme='white' variant='link' style={{ paddingLeft: 10 }}>
                    Check Our Product
                </Button>
            </div>
        </div>

        <div className='col-2'>

        </div>

        <div className='col-4' style={{ margin: "auto" }}>
            <div className='container' style={{}}>
                <div className='bg-container' style={{ height: "53vh", width: "27vw", borderRadius: "9px", margin: "auto" }}>
                    <Tabs>
                        <TabList>
                            <Tab className='col-6' style={{ fontWeight: 400, color: "#6b3c3b" }}>Register</Tab>
                            <Tab className='col-6' style={{ fontWeight: 400, color: "#6b3c3b" }}>Login</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <div style={{ textAlign: "center" }}>
                                    <p style={{ fontWeight: 500, color: "#6b3c3b", fontSize: 27 }}>Register Account</p>
                                    <div style={{}}>
                                        <FormGroup style={{ marginTop: 25, textAlign: "center", border: "none" }}>                                                                
                                            <Input type="text" id="textEmail" placeholder="Username"
                                                innerRef={(element) => this.username = element}
                                                style={{ width: 300, margin: "auto" }} />
                                        </FormGroup>
                                        <FormGroup style={{ marginTop: 25 }}>                                                                
                                            <Input type="text" id="textEmail" placeholder="Email"
                                                innerRef={(element) => this.email = element}
                                                style={{ width: 300, margin: "auto" }} />
                                        </FormGroup>
                                        <FormGroup style={{ marginTop: 25 }}>                                                                
                                            <InputGroup style={{ width: 300, margin: "auto" }}>
                                                <Input id="textEmail" placeholder="Password"
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
                            <TabPanel>
                                <div style={{ textAlign: "center" }}>
                                    <p style={{ fontWeight: 500, color: "#6b3c3b", fontSize: 27 }}>LOGIN</p>
                                    <FormGroup style={{ marginTop: 25 }} >                                                            
                                        <Input type="text" id="textEmail" placeholder="Email"
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
                        </TabPanels>
                    </Tabs>
                </div>
            </div>
        </div>
    </div>
</div> */}