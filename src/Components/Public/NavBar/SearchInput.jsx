import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./SearchInput.css";
import Logout from "../Logout/Logout";
import PopUp from '../PopUp/PopUp';
import Cart from '../../Customer/Cart/Cart';
import axios from 'axios';
import swal from 'sweetalert';

import io from "socket.io-client";
const socket = io.connect("http://localhost:5555");

export default function SearchInput () {
    const [keyword, setKeyword] = useState();
    const [modal, setModal] = useState(false);
    const [productList, setProductList] = useState([]);
    const [cName, setCName] = useState("");
    const [cToken, setCToken] = useState();
    const [cId, setCustomerId] = useState("");
    const [username, setUsername] = useState("");

    useEffect(()=>{
      setCToken(localStorage.getItem('customerToken'));
      setCName(localStorage.getItem('customerName'));
      setCustomerId(localStorage.getItem('customerId'));

      setUsername(localStorage.getItem('customerName'));

      });

  const toggleModal = () =>{
    setModal(!modal);
}

  const getProduct = (keyword) =>{
    const pets = {
      key: keyword,
      name: keyword,
      code: keyword,
      description: keyword
    }

    axios({
        url: `http://localhost:5555/api/Pets/GetByName`,
        method: "POST",
        headers: {token: `Bearer ${cToken}`},
        data: pets
    }).then((res)=>{
        setProductList(res.data.products);
    }).catch(err => console.log(err));
  }

  const handleSearch = () =>{
    if (!keyword) {
        swal("Bạn cần nhập tên pet !", {
          buttons: {
            cancel: "Cancel!",
            catch: {
              text: "Nhập lại",
              value: "retry",
            },
          },
        })
        .then((value)=>{
          switch(value){
            case "retry":
            //   navigate('/login');
              break;
          }
        }
        )
        return;
    }
    getProduct(keyword);

    setModal(!modal);  
    }

  return (
    <>
        <div className='searchInput'>
        {/* <form> */}
            <input
                type="text" placeholder='Name...'
                onChange={e => setKeyword(e.target.value)}/>

            <button onClick={handleSearch}>MUA</button>
        {/* </form> */}
        </div>

        {modal && (<div className="modal-search">
            <div className="overplay-search"></div>
            <div className="modal-content-search">
                <div className="div-scroll">
                    { productList?.map((item, index)=>{
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
                              {/* <button className="btn" onClick={() =>createCart(item.id)}>Add To Cart</button> */}
                            {/* </div> */}
                          </div>                      
                        </div>
                        )
                    })}  
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
