import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
import { useNavigate} from 'react-router-dom'

function Order({ socket, username, room, product , currentprice}) {
  const [currentCustomerId, setCurrentCustomerId] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [token, setToken] = useState();
  const [userId, setUerId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [productId, setProductId] = useState("");
  const [address, setAddress] = useState("");
  const [orderId, setOrderId] = useState("");
  const [orderLastId,  setOrderLastId] = useState("");
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();

  const createOrder = async () => {
    if (currentCustomerId !== "") {
      const order = {
        id: null,
        user_id: null,
        customer_id : currentCustomerId,
        customer: {
          firstName: firstName
        },
        quantity: quantity,
        price: currentprice,
        product_id : product.id,
        address: address,
        state: false,
        author: username,
        room: room,
        totalPrice: currentprice * quantity,
        createdAt: new Date(Date.now())
        // time:
        //   new Date(Date.now()).getDate() +
        //   " " +
        //   new Date(Date.now()).getHours() +
        //   ":" +
        //   new Date(Date.now()).getMinutes(),
      };

      console.log(order);

      axios({
        url: "http://localhost:5555/order-add",
        method: "POST",
        data: order,
        headers: {token: `Bearer ${token}`} 
      }).then((res)=>{
          console.log(`FrontEnd: Thêm đơn thành công!`);
      }).catch(function(err)
      {
        console.log(err + ' Lỗi thêm đơn');
      })

      await socket.emit("send_order", order);
      axios({
        url: "http://localhost:5555/user/order-list",
        method: "GET",
      }).then((res)=>{
          setOrderList(res.data);
      }).catch(function(err)
      {
        console.log(err + ' Lỗi lấy tin nhắn');
      })

      // window.location.reload(false);

      // ZALOPAY
      let zalopay = {
        price: currentprice
      }

      axios({
        url: "http://localhost:5555/payment",
        method: "POST",
        data: zalopay,
      }).then((res)=>{
          console.log('Chuyển trang ZaloPay');

          window.location.assign(res.data);
      }).catch(function(err)
      {
        console.log(err + ' Lỗi thanh toán');
      })
    }
  };

  useEffect(() => {
    getOrders();
    // getOrderLastID();

    setToken(localStorage.getItem('token'));
    setCurrentCustomerId(localStorage.getItem('customerId'));
    setFirstName(localStorage.getItem('customerName'));
    
    socket.on("receive_order", (data) => {
      setOrderList((list) => [...list, data]);
      console.log('receive_order')
    });
  }, [socket]);

  const getOrders = () => {
    axios({
      url: "http://localhost:5555/user/order-list",
      method: "GET",
    }).then((res)=>{
        // console.log(res.data);
        setOrderList(res.data);
    }).catch(function(err)
    {
      console.log(err + ' Lỗi lấy tin nhắn');
    })
  }

  // const getOrderLastID = () => {
  //   axios({
  //     url: "http://localhost:5005/user/order-lastId",
  //     method: "GET",
  //   }).then((res)=>{
  //       setOrderLastId(res.data.lastId + 1);
  //       console.log("Last ID: ")
  //       console.log(res.data.lastId + 1);
  //   }).catch(function(err)
  //   {
  //     console.log(err + ' Lỗi lấy tin nhắn');
  //   })
  // }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>THÔNG TIN ĐẶT HÀNG</p>
      </div>
      <div className="info-input">
        <input
          type="text"
          value={quantity}
          placeholder="Số lượng..."
          onChange={(event) => {
            setQuantity(event.target.value);
          }}
        />
        <input
          hidden={true}
          type="text"
          value={currentprice}
          placeholder="Giá..."
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <input
          type="text"
          value={address}
          placeholder="Địa chỉ..."
          onChange={(event) => {
            setAddress(event.target.value);
          }}
        />
        <button onClick={createOrder}>&#9658;</button>
      </div>
    </div>
  );
}

export default Order;