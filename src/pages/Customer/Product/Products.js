import { Link, useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Product.css';
import swal from 'sweetalert';
// import io from 'socket.io-client';

// const socket = io.connect("http://localhost:5005");

export default function Products() {

  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cToken, setCToken] = useState();
  const [cName, setCName] = useState();
  const [cId, setCId] = useState();

  const createCart = async (id) =>{
    if (!cId) {
      console.log('Bạn cần đăng nhập');
      swal("Bạn chưa đăng nhập !", {
        buttons: {
          cancel: "Cancel!",
          catch: {
            text: "Đăng nhập",
            value: "login",
          },
        },
      })
      .then((value)=>{
        switch(value){
          case "login":
            navigate('/login');
            break;
        }
      }
      )
      return;
    }
      const cart = {
        customer_id : cId,
        productn_id: id,
        quantity: 1
      };

      axios({
        url: "http://localhost:5555/cart-add",
        method: "POST",
        data: cart,
        headers: {token: `Bearer ${cToken}`} 
      }).then((res)=>{
          navigate('/');
      }).catch(function(err)
      {
        console.log(err + ' Lỗi gửi đơn');
      })
  }


  useEffect(() => {
    setCToken(localStorage.getItem('customerToken'));
    setCName(localStorage.getItem('customerName'));
    setCId(localStorage.getItem('customerId'));
    getProducts();

    console.log( new Date(Date.now()).getHours())
  }, [])
  const getProducts = () => {
    axios({
      url: "http://localhost:5555/api/Pets/list",
      method: "GET",
      headers: {token: `Bearer ${cToken}`} 
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
                {/* <div className="btn"> */}
                  <button className="btn" onClick={() =>createCart(item.id)}>Add To Cart</button>
                {/* </div> */}
              </div>
              
              
            </div>
          )
        })
      }  
    </div>
  )
}
