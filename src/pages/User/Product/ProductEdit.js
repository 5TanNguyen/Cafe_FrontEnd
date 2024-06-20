import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate} from 'react-router-dom';

export default function ProductEdit({productId}){
    // const product = props.product;
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const [proId, setProId] = useState();
    const [token, setToken] = useState();
    const [customerId, setCustomerId] = useState("");
    const [price, setPrice] = useState("");
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [description, setDescription] = useState();
    const [stock, setStock] = useState();
    const [state, setState] = useState();
    const [categoryId, setCategoryId] = useState();
    const [productDetail, setProductDetail] = useState();


    const toggleModal = () =>{
        setModal(!modal);
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();

        const model = {
            id: productId,
            code: name,
            name: name,
            description: description,
            stock: stock,
            state: state,
        };

        console.log(model);

        axios({
            url: `http://localhost:5555/api/Pets/Update/${productId}`,
            method: "PUT",
            data : model,
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
            
            setName(res.data.product.name);
            setStock(res.data.product.stock);
            setState(res.data.product.state);
            setDescription(res.data.product.description);
        }).catch(function(err)
        {
          console.log(err + ' Lỗi getProducts');
        })
      }

    return(
        <>
        <button
            onClick={toggleModal}
            className="btn-edit"
        >SỬA</button>
        
        {modal && (<div className="editForm">
            <div className="modal-content">
                <div className="overplayEdit">
                    <h2>Chỉnh Sửa Thông Tin</h2>
                </div>
                <form className="containerr" onSubmit={handleSubmit}>
                    <div className="inputEditForm">
                        <h2>Tên Cún</h2>
                        <div className="input">
                            <input 
                                value={name}
                                type="text"
                                onChange={
                                    e => setName(e.target.value)}
                                />
                        </div>  
                        <h2>Còn</h2>
                        <div className="input">
                            <input 
                                value={stock}
                                type="text"
                                onChange={
                                    e => setStock(e.target.value)}/>
                        </div>  

                        <h2>Trạng thái</h2>
                        <div className="input">
                            <input 
                                value={state}
                                type="text"
                                onChange={
                                    e => setState(e.target.value)}/>
                        </div>  

                        <h2>Mô tả</h2>
                        <div className="input">
                            <input 
                                value={description}
                                type="text"
                            onChange={e => setDescription(e.target.value)}/>
                        </div>  
                    </div>
                    <button className='btn-submit-EditForm' type="submit">SỬA</button>
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