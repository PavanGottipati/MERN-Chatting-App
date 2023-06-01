import React, {useState, useContext, useEffect } from 'react';
import { store } from './App';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import 'bootstrap/dist/css/bootstrap.css';

const Myprofile = () =>{
    const [token,setToken] = useContext(store);
    const [data,setData]=useState(null);
    const [allmsg,setAllmsg]=useState([]);
    const [newmsg,setNewmsg]=useState('');
    useEffect(()=>{
        axios.get('http://localhost:5000/myprofile',{
            headers: {
                'x-token': token
            }
        }).then(res=> setData(res.data)).catch((err)=>console.log(err))
        axios.get('http://localhost:5000/getmsg',{
            headers: {
                'x-token': token
            }
        }).then(res=> setAllmsg(res.data)).catch((err)=>console.log(err))
  
    },[])
    const submitHandler = e =>{
        e.preventDefault();
        axios.post('http://localhost:5000/addmsg',{text:newmsg},{
            headers: {
                'x-token':token
            }
        }).then(res => setAllmsg(res.data)).catch((err)=>console.log(err))
    }

    if(!token){
        return <Navigate to='/'/>
    }
    return(
        <div>
            {
                data &&
            <center>
                <br/>
                <div className="card" style={{"width":"38rem","textAlign":"left"}}>
                    <div className="card-body">
                    {
                        allmsg.length>=1 ?
                           allmsg.map(message =><div class="card">
                            <div className="card-body">
                                <h5 className="card-title">{message.username} <Moment style={{"fontSize":"11px"}} format="hh:mm  DD:MM:yyyy">{message.date}</Moment></h5>
                                <p>{message.text}</p>
                                </div>
                            </div>
                            )
                            :
                            <h1>Message Loading..........</h1>
                    }
                    <br/>
                    <hr/>
                    <form onSubmit={submitHandler}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="message"
              placeholder="Enter Message"
              onChange={e => setNewmsg(e.target.value)}
              required
            />
          </div>
          <br/>
                        <div className="form-group">
                         <button
                            type="submit"
                            className="btn btn-success btn-block login-btn"
                            value="send message">
                            Send Message <i className="login-btn__icon fas fa-sign-in-alt" />
                          </button>
                        </div>
                    </form>
                    <br/>
                    <hr/>
                    <button className="btn btn-primary" onClick={()=>setToken(null)}>Logout</button>
                    </div>
                </div>
            </center>
            }
        </div>
    )
}

export default Myprofile;