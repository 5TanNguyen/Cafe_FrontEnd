import { Route, useParams, useNavigate } from "react-router-dom"
import React, {useEffect, useState} from 'react';
import axios from "axios";
import './ProductDetails.css';
import Order from './Order';

import io from "socket.io-client";
const socket = io.connect("http://localhost:5555");


export default function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [room, setRoom] = useState("");
  const [token, setToken] = useState();
  const [customerId, setCustomerId] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [price, setPrice] = useState();

  const [showOrderButton, setShowOrderButton] = useState(false);

  const joinRoom = () => {
    if(!customerId){
      navigate('/');
    }

    if (customerName !== "" && room !== "") {

      console.log("Room: " + room);
      console.log("Username: " + customerName);

      socket.emit("join_room", room);
      setShowChat(true);

      setShowOrderButton(true);
    }
  };  

  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    stock: '',
    state: ''
  }); 

  useEffect(() => {
    setRoom(localStorage.getItem('customerId'));
    setCustomerName(localStorage.getItem('customerName'));

    setToken(localStorage.getItem('token'));
    setCustomerId(localStorage.getItem('customerId'));

    getProductDetail();
  }, [])
  const getProductDetail = () => {
    axios({
      url: `http://localhost:5555/product-detail/${id}`,
      method: "GET" 
    }).then((res)=>{
        console.log(res.data.product);
        setProduct(res.data.product);
        setPrice(res.data.price);
    }).catch(function(err)
    {
      console.log(err + ' Lỗi getProductDetail');
    })
  }

  return (
    <div className="content">
      <div className="productDetail">
        <div className="productDetail-image">
          <img src="https://th.bing.com/th/id/R.522a1291c2a8353ab522906e2d03d107?rik=BRHolPPfSiLTzg&pid=ImgRaw&r=0" alt="" />
        </div>
        <div className="details">
          <h2>{product.name}</h2>
          <p>Còn lại: {product.stock}</p>
          <p>Đánh giá: 4 sao</p>
          <span class="change_price">
            7,000,000₫
          </span>
          {!showChat ? (
            <div className="orderContainer">
              <input
                hidden={true}
                value={customerName}
                type="text"
                placeholder="John..."
                onChange={(event) => {
                  setCustomerName(event.target.value);
                }}
              />
              <input
                hidden={true}
                type="text"
                value={room}
                placeholder="Room ID..."
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              />
              <button onClick={joinRoom}>Đặt Mua</button>
            </div>
          ) : (
            <Order socket={socket} username={customerName} room={room} product={product} currentprice={price} />
          )}
        </div>

        <div className="detail_info">
          <h3>Chi tiết sản phẩm</h3>
          <div className="pd-description">
            <p>{product.description}</p>       
          </div>
        </div>

        <div className="relative_product">
          <h3 className="heading">Sản phẩm đề xuất</h3>
          <div className="box_container">
            <div className="box">
              <img className="box_img" src="https://www.ilovepets.com/wp-content/uploads/2019/11/corgi-6-1024x913.jpg" />
              <h3>Cún</h3>
              <p>Sẽ tìm được việc trước 28/5</p>
              <a href="" className="btn">MUA</a>
            </div>

            <div className="box">
              <img className="box_img" src="https://www.ilovepets.com/wp-content/uploads/2019/11/corgi-6-1024x913.jpg" />
              <h3>Cún</h3>
              <p>Sẽ tìm được việc trước 28/5</p>
              <a href="" className="btn">MUA</a>
            </div>

            <div className="box">
              <img className="box_img" src="https://www.ilovepets.com/wp-content/uploads/2019/11/corgi-6-1024x913.jpg" />
              <h3>Cún</h3>
              <p>Sẽ tìm được việc trước 28/5</p>
              <a href="" className="btn">MUA</a>
            </div>

            <div className="box">
              <img className="box_img" src="https://www.ilovepets.com/wp-content/uploads/2019/11/corgi-6-1024x913.jpg" />
              <h3>Cún</h3>
              <p>Sẽ tìm được việc trước 28/5</p>
              <a href="" className="btn">MUA</a>
            </div>

            <div className="box">
              <img className="box_img" src="https://www.ilovepets.com/wp-content/uploads/2019/11/corgi-6-1024x913.jpg" />
              <h3>Cún</h3>
              <p>Sẽ tìm được việc trước 28/5</p>
              <a href="" className="btn">MUA</a>
            </div>
          </div>
        </div>
      </div>      
    </div>
  )
}
