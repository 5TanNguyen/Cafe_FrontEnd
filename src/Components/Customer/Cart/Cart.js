import React, {useState, useEffect} from "react";
import "./Cart.css";
import axios from "axios";
import { useNavigate} from 'react-router-dom';
import Order from './Order';

// export default function Modal({product, socket, username, room}){
export default function Cart({socket, customername, room}){
    // const product = props.product;

    const [orderList, setOrderList] = useState();
    const [modal, setModal] = useState(false);
    const [cToken, setCToken] = useState();
    const [cId, setCustomerId] = useState("");
    const [cName, setCName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    const [cartList, setCartList] = useState([]);
    const [username, setUsername] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [proId, setProID] = useState("");

    const toggleModal = () =>{
        setModal(!modal);
    }

    const handleSubmit = async (productn_id) => {
        if (cName !== "") {
          const order = {
            user_id: null,
            customer_id : 1,
            customer: {
              firstName: 'hhaha'
            },
            quantity: 1,
            price: 22,
            productn_id : productn_id,
            address: 'Cần Thơ',
            state: false,
            author: customername,
            room: room,
            totalPrice: 22,
            createdAt: new Date(Date.now())
            // time:
            //   new Date(Date.now()).getDate() +
            //   " " +
            //   new Date(Date.now()).getHours() +
            //   ":" +
            //   new Date(Date.now()).getMinutes(),
          };
    
          axios({
            url: "http://localhost:5555/order-add",
            method: "POST",
            data: order,
            // headers: {token: `Bearer ${token}`} 
          }).then((res)=>{
            console.log('Thêm thành công')
        }).catch(function(err)
          {
            console.log(err + ' Lỗi gửi đơn');
          })
    
          await socket.emit("send_order", order);
          axios({
            url: "http://localhost:5555/order-list",
            method: "GET",
          }).then((res)=>{
              console.log('Lấy thành công sau khi send!');
              setOrderList(res.data);
          }).catch(function(err)
          {
            console.log(err + ' Lỗi lấy tin nhắn');
          })
    
          // navigate(`/productDetail/${product.id}`);
          window.location.reload(false);
        }
      };

    useEffect(()=>{
        setCToken(localStorage.getItem('customerToken'));
        setCName(localStorage.getItem('customerName'));
        setCustomerId(localStorage.getItem('customerId'));

        setUsername(localStorage.getItem('customerName'));

        getCarts();

        socket.on("receive_order", (data) => {
            setCartList((list) => [...list, data]);
            console.log('receive_order')
        });
        }, [socket]);

    const getCarts = () =>{
        axios({
            url: `http://localhost:5555/cart-list/${localStorage.getItem('customerId')}`,
            method: "GET",
            headers: {token: `Bearer ${cToken}`} 
        }).then((res)=>{
            // console.log(res.data)
            setCartList(res.data);
        }).catch(err => console.log(err));
    }

    return(
        <>
        <button
            onClick={toggleModal}
            className="btn-modal"
        >Giỏ hàng</button>
        
        {modal && (<div className="modal">
            <div className="overplay"></div>
            <div className="modal-content">
                <div className="div-scroll">
                    <ul className="cart-ul">
                    { cartList.cart?.map((item, index)=>{
                        return(
                            <li key={index}>  
                                <div className="div-li">
                                    <form onSubmit={()=>handleSubmit(item.productn.id)}>
                                        <input
                                            value={proId}
                                            type="text" placeholder='Password' name="" id=""
                                            onChange={e => setProID(item.productn.id)}/>

                                        <img className="cart-img" src="https://www.ilovepets.com/wp-content/uploads/2019/11/corgi-6-1024x913.jpg" />
                                        <div className="info">
                                            {item.productn.name}
                                            <br/>
                                            Số lượng: {item.quantity}
                                        </div>
                                        <button type="submit" className="btn-mua">MUA</button>
                                    
                                    </form>
                                </div>   
                            </li>
                        )
                    })}  
                    </ul>
                </div>
                <button className="close-modal"
                onClick={toggleModal}>Đóng
                </button>
            </div>
        </div>
        )}
        </>
    )
}