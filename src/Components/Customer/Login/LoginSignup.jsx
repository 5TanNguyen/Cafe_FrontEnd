import React, {useState, useEffect} from 'react';
import './LoginSignup.css'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

import user_icon from '../../Assets/person.png'
import email_icon from '../../Assets/email.png'
import password_icon from '../../Assets/password.png'
import Validation from './Validation';

const LoginSignup = () =>{
    const navigate = useNavigate();
    const [action, setAction] = useState("Login");
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();
    const [token, setToken] = useState();
    const [address, setAddress] = useState();
    const [errors, setErrors] = useState({});

    useEffect(()=>{
        setToken(localStorage.getItem('token'));
    })

    function handleSubmit(event){
        // console.log(action);
        event.preventDefault();

        let model = {
            phone: phone,
            password: password
        };

        setErrors(Validation.Login(model));

        if(phone && password){
            if(action === "Login"){

                console.log(errors);

                axios.post('http://localhost:5555/login', {phone, password})
                    .then((res)=>{
                        console.log(res.data)
                        // localStorage
                        localStorage.setItem('customerToken', res.data.token);
                        localStorage.setItem('customerId', res.data.customer.id);
                        localStorage.setItem('customerName', res.data.customer.firstName);

                        navigate('/')
                    })
                    .catch(err => console.log(err));
            }

            if(action === "Sign Up"){
                axios.post('http://localhost:5555/register', 
                {
                    firstName,
                    lastName,
                    email, 
                    password,
                    phone
                })
                .then((res)=>{
                    console.log(res.data)
                    console.log("Đăng ký thành công!");
                    navigate('/')
                })
                .catch(err => console.log(err + "Há há"));
            }
        }
    }

    return (
        <div>
            {/* <div> */}
                <form className="container" onSubmit={handleSubmit}>
                    <div className="header">
                        <div className="text">{action}</div>
                        <div className="underline"></div>
                    </div>
                    <div className="submit-container">
                        <div className={action === "Login"?"submit gray": "submit"} onClick={() =>{setAction("Sign Up")}}>Sign Up</div>
                        <div className={action === "Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
                    </div>
                    <div className="inputs"> 
                        <div className="input">
                            <input type="text" placeholder='               Phone' name="" id=""
                            onChange={e => setPhone(e.target.value)}/>
                            {errors.phone && <p style={{color: 'red'}}>{errors.phone}</p>}
                        </div>

                        <div className="input">
                            <img src={password_icon} alt="" />
                            <input type="password" placeholder='Password' name="" id=""
                            onChange={e => setPassword(e.target.value)}/>
                            {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
                        </div>  
                        
                        {action==="Login"?<div></div>:
                            <div className=''>
                                <div className="input">
                                    <img src={user_icon} alt="" />
                                    <input type="text" placeholder='Name' name="" id="" 
                                    onChange={e => setFirstName(e.target.value)} />
                                </div>
                                <br />
                                <div className="input">
                                    <img src={user_icon} alt="" />
                                    <input type="text" placeholder='Last Name' name="" id="" 
                                    onChange={e => setLastName(e.target.value)} />
                                </div>
                            </div>
                        }

                        {action==="Sign Up"? 
                            <div>
                                {/* <h2>Phone</h2> */}
                                <div className="input">
                                <img src={email_icon} alt="" />
                                <input type="email" placeholder='Email' name="" id="" 
                                onChange={e => setEmail(e.target.value)}/>
                                    {/* <img src={password_icon} alt="" /> */}
                                    
                                </div>  

                                <br/>
                                <div className="input">
                                <img src={email_icon} alt="" />
                                <input type="text" placeholder='Address' name="" id="" 
                                onChange={e => setAddress(e.target.value)}/>
                                </div>  
                            </div>
                            :
                            <div className='forgot-password-div'>
                            <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
                            </div>
                        }
                    </div>

                    <button className='btn-submit' type="submit">Login</button>
                </form>
            {/* </div> */}
        </div>
    )
}

export default LoginSignup