import React,{useState,useContext} from 'react';
import axios from 'axios';
import {store} from './App';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import "./Login.css";
import 'bootstrap/dist/css/bootstrap.css';

const Login = () =>{
    const [token,setToken]=useContext(store);
    const [data,setData]=useState({
        email:'',
        password:''
    })

    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
    }

    const submitHandler = e =>{
        e.preventDefault();
        axios.post('http://localhost:5000/login',data).then(
            res => setToken(res.data.token)
        )
    }
    if(token){
       return <Navigate to='/myprofile'/>
    }

    return(   
<div className="bodyy">
      <div>
        <form className="form py-2 mt-3" onSubmit={submitHandler} autoComplete="off">
          <legend className="text-center">
            Login <i className="fas fa-lock"></i>
          </legend>
          <hr />
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email Address"
              onChange={changeHandler}
              required
            />
          </div>
          <br/>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={changeHandler}
              placeholder="Password"
            /></div>
            <br/>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-success btn-block login-btn"
            >
              Login <i className="login-btn__icon fas fa-sign-in-alt" />
            </button>
          </div>
          <div>
          <p className="my-1">
          Don't have an account? <Link to="/register">Register Now</Link>
        </p>
          </div>
        </form>
      </div>
    </div>
    )
}

export default Login;



///////
