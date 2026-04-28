import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
import API from "../../api.jsx";

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Sign In");
    const [data, setData] = useState({
        username: "", 
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleAuth = async (event) => {
        event.preventDefault();
        
        let endpoint = currState === "Sign In" ? "login/" : "register/";
        
        try {
            const response = await API.post(endpoint, data);
            
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
                window.location.reload(); 
            }
        } catch (error) {
            console.error("Auth Error:", error);
            alert(error.response?.data?.error || "Invalid username or password");
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={handleAuth} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
                </div>
                
                <div className="login-popup-inputs">
                    { }
                    <input 
                        name='username' 
                        onChange={onChangeHandler} 
                        value={data.username} 
                        type="text" 
                        placeholder='Username' 
                        required 
                    />
                    
                    {currState === "Sign Up" && (
                        <input 
                            name='email' 
                            onChange={onChangeHandler} 
                            value={data.email} 
                            type="email" 
                            placeholder='Email Address' 
                            required 
                        />
                    )}
                    
                    <input 
                        name='password' 
                        onChange={onChangeHandler} 
                        value={data.password} 
                        type="password" 
                        placeholder='Password' 
                        required 
                    />
                </div>

                <button type="submit">
                    {currState === "Sign Up" ? "Create Account" : "Login"}
                </button>

                {currState === "Sign In"
                    ? <p>New here? <span onClick={() => setCurrState("Sign Up")}>Create an account</span></p>
                    : <p>Have an account? <span onClick={() => setCurrState("Sign In")}>Sign In instead</span></p>
                }
            </form>
        </div>
    );
}

export default LoginPopup;