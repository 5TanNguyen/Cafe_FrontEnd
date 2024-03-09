import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import NavBar from './Components/Public/NavBar/NavBar';
import Footer from './Components/Public/Footer/Footer';

import LoginSignup from './Components/Customer/Login/LoginSignup';
import Products from './pages/Customer/Product/Products';
import OrderPage from './pages/User/OrderPage/ConnectRoom';

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/order" element={<OrderPage/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
