import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './Home.css';
import groupPic from './groupPic.jpg'

const Home=()=>{
    return(
    <div className="mainBody">
            <div className="homePic">
           <center>
           <section className="landing">
              <div className="dark-overlay">
                <div className="landing-inner">
                <h3 style={{"color":"white"}}>Welcome To</h3>
                   <h1 style={{"color":"white"}}>APEX IT & Softs</h1>
                   <h3 style={{"color":"white"}}>Community Group Chat</h3>
                   <p className="lead" style={{"color":"white"}}>
                       Dear Developers,
                   </p>
                   <p className="lead" style={{"color":"white"}}>
                       <b></b>Create An Account And Communicate With Your Office Community & Share Your Ideas
                   </p>
                   <form>
                   <Link to='/register' className="btn btn-primary ">Register</Link>
                    <Link to='/login' className="btn btn-success btn-block login-btn mx-2">Login</Link>

                   </form>
                </div>
              </div>
              <img className="pics" src={groupPic} alt=""/>
           </section>
           </center>
           </div>

    </div>

    )
}
export default Home;
//Home