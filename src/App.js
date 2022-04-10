import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import MenuManagement from './Components/MenuManagement';
import ManagementProduct from './Pages/ManagementProduct';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCartAction, getJenisProductAction, getKategoriAction, getMaterialAction, getProductAction, keepLoginAction } from './redux/actions';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ResetPasswordPage from './Pages/ResetPasswordPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import VerificationPage from './Pages/VerificationPage';
import Navbar from './Components/Navbar';
import ProfilePage from './Pages/ProfilePage';
import ProductPage from './Pages/ProductPage';
import Footer from './Components/Footer';
import DetailProduct from './Pages/DetailProduct';
import CheckoutPage from './Pages/CheckoutPage';
import VerifyPage from './Pages/Verify';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(keepLoginAction())
    dispatch(getKategoriAction())
    dispatch(getMaterialAction())
    dispatch(getJenisProductAction())
    dispatch(getProductAction())
    dispatch(getCartAction())
  },[])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/resetpassword/:token" element={<ResetPasswordPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/verification/:token" element={<VerificationPage />} /> */}
        <Route path="/verification/:token" element={<VerifyPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path='/management/product' element={<ManagementProduct />} />
        <Route path='/product' element={<ProductPage />} />
        <Route path='/detail/product' element={<DetailProduct />} />
        <Route path='/product/checkout' element={<CheckoutPage/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;


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
