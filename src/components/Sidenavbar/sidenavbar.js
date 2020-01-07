import React , { Component } from 'react';
import './sidenavbar.css';
import {Link} from 'react-router-dom';
import { FaSignOutAlt } from "react-icons/fa";
import {Redirect } from 'react-router-dom';
class Sidenavbar extends Component 
{
    state = {
        logout: false
    }

    openAlert = () => 
    {
        if(window.confirm('Are you sure to logout?'))
        {
            this.setState(
                () => { return { logout: true };},
                () => { console.log('logout changed');}
            );
        }
        else
        {
            return false;
        }
    }

    render() 
    { 
        if( this.state.logout === true)
        {
            return <Redirect to='/' />;
        }

        return (
            <div className="sidenav">
                <p id="user-fname">{this.props.fname}</p>
                <Link to="/landingpage" tabIndex="5" >My Profile</Link>
                <a href="/landingpage/myrequests/" tabIndex="6">My Requests</a>
                <Link to="/landingpage/myrequests/">Hey</Link>
                <a href="##" tabIndex="7">My Donations</a>
                <a href="##" tabIndex="8"> My Medical Profile</a>
                <a href="##" onClick={this.openAlert}  id="logout-btn" tabIndex="9">Logout <FaSignOutAlt /></a>
             </div>
          );
    }
}

export default Sidenavbar;