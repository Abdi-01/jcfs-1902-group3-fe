import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Route, Routes } from 'react-router-dom';
import MenuManagement from './Components/MenuManagement';
import ManagementProduct from './Pages/ManagementProduct';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartAction, getJenisProductAction, getKategoriAction, getMaterialAction, getProductAction, getWarehouseAction, keepLoginAction, getWarehouse, getWarehouseAdmin, getProductWarehouseAction, getProductAdminAction } from './redux/actions';
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
import RequestStockPage from './Pages/RequestStock';
import DetailProductRequest from './Pages/DetailProductRequest';
import AdminRequest from './Pages/AdminRequest';
import ManagementRequest from './Pages/ManagementRequest';
import ListTransactionPage from './Pages/ListTransactionPage';
import ListTransactionWarehousePage from './Pages/ListTransactionWarehousePage';
import LoadingPage from './Pages/LoadingPage';
import OutgoingRequest from './Pages/OutgoingRequest';


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
    dispatch(getWarehouse())
    dispatch(getWarehouseAdmin())
    dispatch(getProductWarehouseAction())
    dispatch(getProductAdminAction())
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
              <Route path="/verification/:token" element={<VerifyPage />} />
            </>
            :
            idrole == 2 ?
              <>
                <Route path='/transaction/admin/list' element={<ListTransactionWarehousePage />} />
                <Route path='/management/product' element={<ManagementProduct />} />
                <Route path='/adminrequest' element={<AdminRequest />} />
                <Route path='/requeststock' element={<RequestStockPage />} />
                <Route path='/detail/productreq' element={<DetailProductRequest />} />
                <Route path='/management-request' element={<ManagementRequest />} />
                <Route path='/outgoing-request' element={<OutgoingRequest />} />
              </>
              :
              idrole == 1 ?
                <>
                  <Route path='/transaction/admin/list' element={<ListTransactionWarehousePage />} />
                  <Route path='/warehouse' element={<WarehousePage />} />
                  <Route path='/addadmin' element={<AddAdminPage />} />
                  <Route path='/management-request' element={<ManagementRequest />} />
                </>
                :
                <Route path="*" element={<LoadingPage />} />
        }
        <Route path="/resetpassword/:token" element={<ResetPasswordPage />} />
        <Route path='/product/checkout' element={<CheckoutPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path='/product' element={<ProductPage />} />
        <Route path='/detail/product' element={<DetailProduct />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;