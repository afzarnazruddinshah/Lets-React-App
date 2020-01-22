import React , { Component } from 'react';
import './sidenavbar.css';
// import {Link} from 'react-router-dom';
import { FaSignOutAlt } from "react-icons/fa";
import {Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
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

    goToMyRequests = e => {
        this.props.history.push('/landingpage/myrequests');
    }

    goToMyProfile = e => {
        this.props.history.push('/landingpage/myprofile');
    }

    render() 
    { 
        if( this.state.logout === true)
        {
            return <Redirect to='/' />;
        }

        return (
            <div className="sidenav">
                <p id="user-fname">Hey {this.props.fname}</p>
                <a href="##" onClick={this.goToMyProfile} tabIndex="5" >My Profile</a>
                <a href="##" onClick={this.goToMyRequests} tabIndex="6">My Requests</a> 
                <a href="##"  tabIndex="7">My Donations</a>
                <a href="##" tabIndex="8"> My Medical Profile</a>
                <a href="##"  onClick={this.openAlert}  id="logout-btn" tabIndex="9">Logout <FaSignOutAlt /></a>
             </div>
          );
    }
}

export default withRouter(Sidenavbar);