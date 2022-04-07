import React from 'react';
import { Title, Modal, ModalBody, ModalFooter, ModalHeader, Button, Label, Input, InputGroup, InputGroupText, Form, FormGroup } from 'reactstrap';

class ForgotPasswordPage extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        return (
            <div>
                <form style={{ textAlign: "left", paddingLeft: "350px", paddingTop: "70px", paddingRight:"400px" }}>
                    <Label style={{ fontWeight: "bold", fontSize: "20px", paddingTop: "" }}>Atur Ulang Kata Sandi</Label>
                    <div class="form-group" style={{ paddingTop: "20px" }}>
                        <p style={{color:"grey", fontSize:"14px"}}>Masukkan e-mail atau nomor HP yang terdaftar. Kami akan mengirimkan kode verifikasi untuk atur ulang kata sandi.</p>
                        {/* <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div class="form-group" style={{}}>
                        {/* <label for="exampleInputPassword1">Email</label> */}
                        {/* <input type="email" class="form-control" id="Email" placeholder="Email" /> */}
                        <Input type='text' style={{ marginTop: 10, borderColor:"transparent", fontSize:"16px", outline:"none", borderBottomColor:"grey" }} placeholder="Email" innerRef={(element) => this.emailConfirmation = element}/>
                            {/* <Label style={{color:"grey"}}>Email</Label> */}
                        
                    </div>
                    {/* <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div> */}
                    <button type="submit" class="btn btn-primary" style={{buttonColor:"green"}}>Lanjut</button>
                </form>
            </div>
        );
    }
}

export default ForgotPasswordPage;