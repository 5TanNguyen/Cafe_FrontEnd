import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate} from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';

// import "react-datepicker/dist/react-datepicker.css";

export default function ProductCreate({productId}){
    // const product = props.product;
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const [token, setToken] = useState();
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [species, setSpecies] = useState("");
    const [description, setDescription] = useState();
    const [weight, setWeight] = useState();
// birthDay
    const [stock, setStock] = useState();
    const [imgUrl, setImgUrl] = useState();
    const [importPrice, setImportPrice] = useState("");
    const [price, setPrice] = useState("");
    const [beginDate, setBeginDate] = useState();
    const [endDate, setEndDate] = useState();
    const [category_id, setCategory_id] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [birthDate, setBirthtDate] = useState(new Date());

    const toggleModal = () =>{
        setModal(!modal);
        console.log(startDate);
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();

        const model = {
            code: code,
            name: code,
            description: description,
            stock: stock,
            category_id: category_id,
            PetTypeId: category_id
        };

        axios({
            url: `http://localhost:5555/api/Pets/Add`,
            method: "POST",
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

        // console.log(new Date(Date.now()));
    }, []);

    return(
        <>
        <button
            onClick={toggleModal}
            className="btn-create"
        >THÊM CÚN</button>
        
        {modal && (<div className="addForm">
            <div className="modal-content">
                <form className="containerAdd" onSubmit={handleSubmit}>
                    <table className="tableAdd">
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>
                                <h5>Mã Cún</h5>
                                <div className="">
                                    <input 
                                        value={code}
                                        type="text"
                                        onChange={
                                            e => setCode(e.target.value)}
                                        />
                                </div>  
                            </td>
                            <td>
                                <h5>Mô tả</h5>
                                <div className="">
                                    <input 
                                        value={description}
                                        type="text"
                                    onChange={e => setDescription(e.target.value)}/>
                                </div>  
                            </td>
                        </tr>
                        <tr> 
                            <td>
                                <h5>Số lượng</h5>
                                <div className="">
                                    <input 
                                        value={stock}
                                        type="text"
                                    onChange={e => setStock(e.target.value)}/>
                                </div>  
                            </td>
                            <td>
                                <h5>Loại</h5>
                                <div className="">
                                    <input 
                                        value={category_id}
                                        type="text"
                                        onChange={
                                            e => setCategory_id(e.target.value)}/>
                                </div>  
                            </td>
                        </tr>
                    </table>

                    <div className="inputs">
                    </div>
                    <button className='btn-submit-CreateForm' type="submit">THÊM</button>
                </form>
                <button className="close-modal-delete"
                onClick={toggleModal}>Đóng
                </button>
            </div>
        </div>
        )}
        </>
    )
}