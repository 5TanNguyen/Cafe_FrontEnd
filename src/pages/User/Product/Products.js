import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Products.css';
import ProductEdit from "./ProductEdit";
import ProductDelete from "./ProductDelete";
import ProductCreate from "./ProductCreate";
import ProdcutPrice from './ProductPrice';
import ProductHide from "./ProductHide";
// import io from 'socket.io-client';

// const socket = io.connect("http://localhost:5005");

export default function Products() {

  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(localStorage.getItem('userToken'));
    getProducts();

    console.log( new Date(Date.now()).getHours())
  }, [])
  const getProducts = () => {
    axios({
      url: "http://localhost:5555/api/Pets/list",
      method: "GET",
      headers: {token: `Bearer ${token}`} 
    }).then((res)=>{
        console.log(res.data.products);
        setProduct(res.data.products)
    }).catch(function(err)
    {
      console.log(err + ' Lỗi getProducts');
    })
  }
   
  return (
    <div className="content">
      <h2>Danh Sách Cún Con</h2>
      <br/>
      <div>
        <ProductCreate />
      </div>
      <br/>
      <br/>
      <div className="products">
        <table>
          <tr>
            <th>ID</th>
            <th>Ảnh</th>
            <th>Name</th>
            <th>Loài</th>
            <th>Thao Tác</th>
          </tr>
          { product?.map((item, index)=>{
              return(
                <tbody key={index}>
                  <td>{item.id}</td>
                  <td className="imgpet">
                    <img className="img-Pet" src={"https://www.ilovepets.com/wp-content/uploads/2019/11/corgi-6-1024x913.jpg"} alt=""></img>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td className="">
                    <ProductEdit productId={item.id} />
                    <ProductDelete productId={item.id} />
                    <ProductHide productId={item.id} productState={item.state} />
                  </td>
                </tbody>
              )
            })
          }
        </table>
      </div>
    </div>
  )
}
