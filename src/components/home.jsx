// import React from 'react';
import "./home.css";
import {Link} from 'react-router-dom';
import{useContext} from "react";
import store from "../context/storeContext";
const Home = () =>{
    const user = useContext(store).user
    return(
        <div className="home">
            <h6>Welcome back {user.email}</h6>
            <h1 className="head">Welcome to Pescado Fishing</h1>
            <div className="image-home">
                <img src="/images/poles2.jpg"></img>
                <div className="company">
                    <h1>Here at Pescado Fishing</h1>
                    <p>We cherish your business and want to be the go to shop for all your fishing needs. We offer many things from fishing charters, classes, and of course your physical products!</p>
                    <p>Call Today To Get Started!!!</p>
                </div>

            </div>
            <div>
                <Link className="btn btn-lg btn-primary" to="/catalog">Check out our amazing catalog</Link>
            </div>



        </div>

        
            
            

        
    );
};

export default Home;