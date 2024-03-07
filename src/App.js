import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import NavBar from './Components/Public/NavBar/NavBar';
import Footer from './Components/Public/Footer/Footer';

import LoginSignup from './Components/Customer/Login/LoginSignup';
import Products from './pages/Customer/Product/Products';

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
