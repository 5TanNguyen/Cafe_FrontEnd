import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate} from 'react-router-dom';
import "./Logout.css";

export default function Logout(){
    // const product = props.product;
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const [proId, setProId] = useState();
    const [token, setToken] = useState();
    const [customerId, setCustomerId] = useState("");
    const [state, setState] = useState("");
    const [productDetail, setProductDetail] = useState();


    const toggleModal = () =>{
        setModal(!modal);
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();

        localStorage.removeItem('customerName');
        localStorage.removeItem('customerToken');
        localStorage.removeItem('customerId');
        setModal(false);

        navigate('/');
        window.location.reload(false);
    };

    useEffect(()=>{
        setToken(localStorage.getItem('token'));
        setCustomerId(localStorage.getItem('customerId'));
    }, []);

    return(
        <>
        <a onClick={toggleModal}>Đăng Xuất</a>
        
        {modal && (<div className="logoutForm">
            <div className="modal-user-logout">
                <div className="overplay-user-delete">
                    <h2>Xác Nhận Đăng Xuất</h2>
                </div>
                <form className="containerUserDelete" onSubmit={handleSubmit}>
                    <button className='btn-user-submit' type="submit">ĐĂNG XUẤT</button>
                </form>
                <button className="close-modal"
                onClick={toggleModal}>Đóng
                </button>
            </div>
        </div>
        )}
        </>
    )
}