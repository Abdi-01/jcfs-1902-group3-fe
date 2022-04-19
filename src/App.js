import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import MenuManagement from './Components/MenuManagement';
import ManagementProduct from './Pages/ManagementProduct';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartAction, getJenisProductAction, getKategoriAction, getMaterialAction, getProductAction, getWarehouseAction, keepLoginAction } from './redux/actions';
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
import NotFoundPage from './Pages/NotFoundPage';
import WarehousePage from './Pages/Warehouse';
import MenungguPembayaranPage from './Pages/MenungguPembayaranPage';
import AddAdminPage from './Pages/AddAdmin';
import ListTransactionPage from './Pages/ListTransactionPage';
import ListTransactionWarehousePage from './Pages/ListTransactionWarehousePage';

function App() {

  const dispatch = useDispatch()

  const { idrole } = useSelector((state) => {
    return {
      idrole: state.userReducer.idrole
    }
  })

  useEffect(() => {
    dispatch(keepLoginAction())
    dispatch(getKategoriAction())
    dispatch(getMaterialAction())
    dispatch(getJenisProductAction())
    dispatch(getProductAction())
    dispatch(getCartAction())
    dispatch(getWarehouseAction())
  }, [])

  return (
    <>
      <Navbar />
      <Routes>
        {
          idrole == 3 ?
            <>
              <Route path='/product/checkout' element={<CheckoutPage />} />
              <Route path='/payment' element={<MenungguPembayaranPage />} />
              <Route path='/transaction/list' element={<ListTransactionPage />} />
            </>
            :
            idrole == 2 ?
              <>
                <Route path='/transaction/admin/list' element={<ListTransactionWarehousePage />} />
                <Route path='/management/product' element={<ManagementProduct />} />
              </>
              :
              idrole == 1 ?
                <>
                  <Route path='/transaction/admin/list' element={<ListTransactionWarehousePage />} />
                  <Route path='/warehouse' element={<WarehousePage />} />
                  <Route path='/addadmin' element={<AddAdminPage />} />
                </>
                :
                <Route path="/*" element={<NotFoundPage />} />
        }
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/resetpassword/:token" element={<ResetPasswordPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verification/:token" element={<VerifyPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path='/product' element={<ProductPage />} />
        <Route path='/detail/product' element={<DetailProduct />} />
        <Route path="/*" element={<NotFoundPage />} />
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
