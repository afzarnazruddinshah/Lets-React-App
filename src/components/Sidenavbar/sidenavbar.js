import React , { Component } from 'react';
import './sidenavbar.css';
import {Link} from 'react-router-dom';
import { FaSignOutAlt } from "react-icons/fa";
class Sidenavbar extends Component 
{
    state = {  }
    render() 
    { 
        return (
            <div className="sidenav">
            <p id="user-fname">{this.props.fname}</p>
            <Link to="/landingpage" tabIndex="5" >My Profile</Link>
            <a href="##" tabIndex="6">My Requests</a>
            <a href="##" tabIndex="7">My Donations</a>
            <a href="##"tabIndex="8"> My Medical Profile</a>
            <Link to="/" id="logout-btn" tabIndex="9">Logout <FaSignOutAlt /></Link>
             </div>
          
          );
    }
}

export default Sidenavbar;