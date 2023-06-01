import React,{useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Register.css";
import 'bootstrap/dist/css/bootstrap.css';

const Register = () =>{
    const [data,setData]=useState({
        username:'',
        email:'',
        password:'',
        confirmpassword:''
    })

    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
    }

    const submitHandler = e =>{
        e.preventDefault();
        axios.post('http://localhost:5000/register',data).then(
            res => alert(res.data)
        )
    }

    return(
        <div className="bodyy">
            <form className="form py-2 mt-3" onSubmit={submitHandler} autoComplete="off">
          <legend className="text-center">
            Register <i className="fas fa-lock"></i>
          </legend>
          <hr />
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="User Name"
              onChange={changeHandler}
              required
            />
          </div>
          <br/>
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
            <input
              type="password"
              className="form-control"
              name="confirmpassword"
              onChange={changeHandler}
              placeholder="Confirm Password"
            /></div>
            <br/>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-success btn-block login-btn"
            >
              Register <i className="login-btn__icon fas fa-sign-in-alt" />
            </button>
          </div>
          <div>
          <p className="my-1">
          Already have an account? <Link to="/login">Login Now</Link>
        </p>
          </div>
        </form>
        </div>
    )
}

export default Register;