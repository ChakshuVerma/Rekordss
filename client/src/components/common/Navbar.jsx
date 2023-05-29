import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar = ({contents}) => {
    const appName = "Rekords";

    return(
        <nav className="navbar">
            <NavLink to="/" className="app-name">{appName}</NavLink>
            <div className="components">
            <ul>
                {
                    contents.map((component, index)=>{
                        return <li key={index}><NavLink to={component.link}>{component.name}</NavLink></li>
                    })
                }
            </ul>
            </div>
        </nav>
    );
}

export default Navbar;