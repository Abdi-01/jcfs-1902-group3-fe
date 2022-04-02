import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import MenuManagement from './Components/MenuManagement';
import ManagementProduct from './Pages/ManagementProduct';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getJenisProductAction, getKategoriAction, getMaterialAction, getProductAction } from './redux/actions';
import ProductPage from './Pages/ProductPage';
import Footer from './Components/Footer';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getKategoriAction())
    dispatch(getMaterialAction())
    dispatch(getJenisProductAction())
    dispatch(getProductAction())
  },[])

  return (
    <>
      <Navbar />
      <Routes>
          <Route path='/management/product' element={<ManagementProduct/>}/>
          <Route path='/product' element={<ProductPage/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
