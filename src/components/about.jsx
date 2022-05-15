import React from 'react';
import "./about.css";
const About = () =>{
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");

    const handleShowEmail = () =>{
        setEmail("albert@gmail.com");
    }

    const handleShowName = () =>{
        setName("Albert");
    };
    
    return(
        <div className="about">
            <h1>About Me</h1>
            <div className="contact">
                <h3>{name}</h3>
                <hr></hr>
                <h3>{email}</h3>
            </div>

            <button onClick={handleShowName} className="btn btn-sm btn-danger">Click Me</button>
            <button onClick={handleShowEmail} className="btn btn-sm btn-danger">Click Me</button>
        </div>
    );
}

export default About;