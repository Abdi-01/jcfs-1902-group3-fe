import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { logOutAction } from '../redux/actions';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
            <div>
                <p>landing page</p>
                {this.props.username}
                <Button onClick={() =>{
                    localStorage.removeItem("data");
                    this.props.logOutAction();
                }}>
                    Logout
                </Button>
            </div>
         );
    }
}
const mapToProps = (state) => {
    return {
        username: state.userReducer.username
    }
}
 
export default connect(mapToProps, {logOutAction}) (LandingPage);