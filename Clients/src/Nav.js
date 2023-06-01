import React,{useContext,useState} from 'react';
import { Link} from 'react-router-dom';
import { store } from './App';

const Nav = () =>{
    const [token,setToken] = useContext(store);
   return(
    <div>
    <nav className="navbar bg-dark">
             <h1 className="text-white">
                <Link to='/'>APEX IT & Softs</Link>
             </h1>
             <ul>
                <Link to="/register" className="btn btn-primary">Register</Link>
                <Link to="/login" className="btn btn-success btn-block login-btn mx-2">Login</Link>
             </ul>
           </nav>
    </div>
   )
}

export default Nav;