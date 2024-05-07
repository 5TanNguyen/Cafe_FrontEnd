import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import NavBar from './Components/Public/NavBar/NavBar';
import Footer from './Components/Public/Footer/Footer';

import LoginSignup from './Components/Customer/Login/LoginSignup';
import Products from './pages/Customer/Product/Products';
import OrderPage from './pages/User/OrderPage/ConnectRoom';
import ProductDetails from './pages/Customer/ProductDetail/ProductDetails';

function App() {
  return (
    <div className='AppContainer'>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/order" element={<OrderPage/>} />
          <Route path="/product-detail/:id" element={<ProductDetails/>} />
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
