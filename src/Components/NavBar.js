import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = ({section}) => {

    const [ show, setShow ] = useState("");
    const [ activeHome, setActiveHome ] = useState("");
    const [ activeSearch, setActiveSearch ] = useState("");

    function handleClick(e){
        e.preventDefault();
        setShow((prevState)=>prevState===""?"show":"");
    }

    useEffect(()=>{
        if(section==="home") setActiveHome("active");
        if(section==="search") setActiveSearch("active");
    })

    return(
        <ul className="navbar bg-primary navbar-expand-md navbar-dark sticky-top">
            <div className="container-sm justify-content-start">
                <button onClick={handleClick} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="main-nav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={"collapse navbar-collapse justify-content-start align-center " + show} id="main-nav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={`nav-link ${activeHome}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${activeSearch}`} to="/search">Búsqueda</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </ul>
    );
}

export default NavBar;