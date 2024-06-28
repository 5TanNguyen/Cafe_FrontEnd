import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import NavBar from './Components/Public/NavBar/NavBar';
import Nav from './Components/Public/NavBar/Nav';
import Footer from './Components/Public/Footer/Footer';

import LoginSignup from './Components/Customer/Login/LoginSignup';
import Products from './pages/Customer/Product/Products';
import OrderPage from './pages/User/OrderPage/ConnectRoom';
import ProductDetails from './pages/Customer/ProductDetail/ProductDetails';
import UserProduct from './pages/User/Product/Products';
import Chat from './pages/Customer/Chat/ConnectRoom';
import Homee from './pages/Customer/Home/Home';

import {About, Contact, Home, Services } from "./pages";

function App() {
  return (
    <div className='AppContainer'>
      <BrowserRouter>
        <Nav />
        {/* <NavBar /> */}
        <Routes>
          <Route path="/Home" element={<Homee />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/order" element={<OrderPage/>} />
          <Route path="/product-detail/:id" element={<ProductDetails/>} />
          <Route path="/user-product" element={<UserProduct/>}/>
          <Route path="/chat" element={<Chat/>}/>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
