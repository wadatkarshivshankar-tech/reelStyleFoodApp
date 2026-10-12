import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


import '../../style/auth-shared.css'

const UserLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const navigate=useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle form submission logic here
        const response=await axios.post("http://localhost:3000/api/auth/login",{
            email,
            password  
        },{
          withCredentials:true
        })

        console.log(response.data);
        console.log("Login successful");
        navigate("/");
    }



  return (
     <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="user-login-title">
        <header>
          <h1 id="user-login-title" className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to continue your food journey.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="auth-submit" type="submit">Sign In</button>
        </form>
        <div className="auth-alt-action">
          New here? <a href="/user/register">Create account</a>
        </div>
      </div>
    </div>
  )
}

export default UserLogin