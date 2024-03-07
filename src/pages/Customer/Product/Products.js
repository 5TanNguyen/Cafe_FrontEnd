import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Product.css';
// import io from 'socket.io-client';

// const socket = io.connect("http://localhost:5005");

export default function Products() {

  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(localStorage.getItem('session'));
    getProducts();

    console.log( new Date(Date.now()).getHours())
  }, [])
  const getProducts = () => {
    axios({
      url: "http://localhost:5555/productn-list",
      method: "GET",
    }).then((res)=>{
        // console.log("getProduts " + token);
        setProduct(res.data.products)
    }).catch(function(err)
    {
      console.log(err + ' Lỗi getProducts');
    })
  }
   
  return (
    <div className="main_content">
      { product?.map((item, index)=>{
          return(
            <div
              key={index}
              className="card"
            >
              <div className="card_img">
                <img src="https://www.ilovepets.com/wp-content/uploads/2019/11/corgi-6-1024x913.jpg" />
              </div>
              <div className="card_header">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p className="price">10.000<span>VNĐ</span></p>
                <div className="btn">Add to cart</div>
              </div>
              
              
            </div>
          )
      })
    }  
    </div>
  )
}
