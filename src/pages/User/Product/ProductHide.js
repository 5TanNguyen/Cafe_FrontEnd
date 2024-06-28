import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate} from 'react-router-dom';

export default function ProductHide({productId, productState}){
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

        const productHide = {
            state: false,
            updatedAt: new Date(Date.now())
        };

        axios({
            url: `http://localhost:5555/api/Pets/Hide/${productId}`,
            method: "PUT",
            data : productHide,
            headers: {token: `Bearer ${token}`} 
        }).then((res)=>{
            console.log(res.data)
            setModal(!modal);

            window.location.reload(false)
        }).catch(err => console.log(err));
    };

    useEffect(()=>{
        setToken(localStorage.getItem('userToken'));
        setCustomerId(localStorage.getItem('customerId'));

        getProductEdit(productId);
        console.log(new Date(Date.now()));
    }, []);

    const getProductEdit = (id) => {
        axios({
          url: `http://localhost:5555/api/Pets/GetById/${id}`,
          method: "GET",
        }).then((res)=>{
            setProductDetail(res.data.product)            
        }).catch(function(err)
        {
          console.log(err + ' Lỗi getProducts');
        })
      }

    return(
        <>
        { productState == true ? (
            
        <button
            onClick={toggleModal}
            className="btn-hide-off"
        >ẨN</button>
        ) : (
            <button
            onClick={toggleModal}
            className="btn-hide-on"
        >HIỆN</button>
        )
        }

        {modal && (<div className="deleteForm">
            <div className="modal-content">
                <div className="overplay-delete">
                    <h2>Xác Nhận</h2>
                </div>
                <form className="containerDelete" onSubmit={handleSubmit}>
                    <div className="inputEditForm">
                        <h2>Tên Cún</h2>
                        <div className="input">
                            <input 
                                value={productDetail.name}
                                type="text"
                                readOnly={true}
                            />
                        </div> 
                    </div>
                    <button className='btn-submit-DeleteForm' type="submit">SUBMIT</button>
                </form>
                <button className="close-modal"
                onClick={toggleModal}>Đóng !
                </button>
            </div>
        </div>
        )}
        </>
    )
}