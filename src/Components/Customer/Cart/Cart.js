import React, {useState, useEffect} from "react";
import "./Cart.css";
import axios from "axios";
import { useNavigate} from 'react-router-dom';

// export default function Modal({product, socket, username, room}){
export default function Cart(){
    // const product = props.product;

    const [modal, setModal] = useState(false);
    const [cToken, setCToken] = useState();
    const [cId, setCustomerId] = useState("");
    const [cName, setCName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    const [cartList, setCartList] = useState([]);

    const toggleModal = () =>{
        setModal(!modal);
    }

    // const handleSubmit = async(event)=>{
    //     event.preventDefault();

    //     const order = {
    //         user_id: null,
    //         customer_id : customerId,
    //         quantity: quantity,
    //         price: price,
    //         product_id : product.id,
    //         address: address,
    //         totalPrice: price * quantity,
    //         author: username,
    //         room: room,
    //         time:
    //           new Date(Date.now()).getDate() +
    //           " " +
    //           new Date(Date.now()).getHours() +
    //           ":" +
    //           new Date(Date.now()).getMinutes(),
    //     };

    //     axios({
    //         url: "http://localhost:5005/order-add",
    //         method: "POST",
    //         data : order,
    //         headers: {token: `Bearer ${token}`} 
    //     }).then((res)=>{
    //         console.log(res.data)
    //         setModal(!modal);
    //     }).catch(err => console.log(err));




    //     await socket.emit("send_order", order);
    //     // setCartList((list) => [...list, order]);
    //     axios({
    //         url: "http://localhost:5005/user/order-list",
    //         method: "GET",
    //     }).then((res)=>{
    //         console.log('Lấy thành công sau khi send Modal!');
    //         setCartList(res.data);
    //     }).catch(function(err)
    //     {
    //         console.log(err + ' Lỗi lấy tin nhắn');
    //     })
    // };

    useEffect(()=>{
        setCToken(localStorage.getItem('customerToken'));
        setCName(localStorage.getItem('customerName'));
        setCustomerId(localStorage.getItem('customerId'));

        getCarts();

        // socket.on("receive_order", (data) => {
        //     setCartList((list) => [...list, data]);
        //     console.log('receive_order')
        // });
    }) //, [socket]);

    const getCarts = () =>{
        axios({
            url: `http://localhost:5555/cart-list/${cId}`,
            method: "GET",
            headers: {token: `Bearer ${cToken}`} 
        }).then((res)=>{
            console.log(res.data)
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
                                    <img className="cart-img" src="https://www.ilovepets.com/wp-content/uploads/2019/11/corgi-6-1024x913.jpg" />
                                    <div className="info">
                                        {item.productn.name}
                                        <br/>
                                        Số lượng: {item.quantity}
                                    </div>
                                    <button className="btn-mua">MUA</button>
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