import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './Pages/LoginPage';
import { Route, Routes } from 'react-router-dom';
import ResetPasswordPage from './Pages/ResetPasswordPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import RegisterPage from './Pages/RegisterPage';
import LandingPage from './Pages/LandingPage';
import VerificationPage from './Pages/VerificationPage';
import { connect } from 'react-redux';
import { keepLoginAction } from './redux/actions';
import Navbar from './Components/Navbar';
import ProfilePage from './Pages/ProfilePage';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {}

  componentDidMount() {
    this.props.keepLoginAction()    
  }

  // keepLogin = async () => {
  //     await this.props.keepLoginAction()
  // }

  render() {
    return (
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/resetpassword/:token" element={<ResetPasswordPage />} />
          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verification/:token" element={<VerificationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    );
  }
}

export default connect(null, { keepLoginAction })(App);


// import logo from './logo.svg';
// import './App.css';
// import LoginPage from './Pages/LoginPage';
// import { Route, Routes } from 'react-router-dom';
// import ResetPasswordPage from './Pages/ResetPasswordPage';
// import ForgotPasswordPage from './Pages/ForgotPasswordPage';
// import RegisterPage from './Pages/RegisterPage';
// import LandingPage from './Pages/LandingPage';
// import VerificationPage from './Pages/VerificationPage';
// import { connect } from 'react-redux';
// import { keepLoginAction } from './redux/actions';

// componentDidMount() {
//   this.props.keepLoginAction()
// }
// function App() {
//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/resetpassword/:token" element={<ResetPasswordPage />} />
//         <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/verification/:token" element={<VerificationPage />} />
//       </Routes>
//     </div>
//   );
// }

// export default connect(null, { keepLoginAction })(App);
