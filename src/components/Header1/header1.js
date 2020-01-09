import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './header1.css'
import blood_drop from './../../../src/blood_drop2.png';
import { withRouter } from 'react-router-dom';

class Header extends Component
{

    goToHome = e => {
        this.props.history.push('/landingpage');
    }

    goToRaiseRequest = e => {
        this.props.history.push('/landingpage/raiserequest');
    }

    render()
    {
        return(
            <div className="app-header">

                <div className="app-logoes">
                    <span id="logo-header">
                        &nbsp; &nbsp; Let's React
                        <img src={blood_drop} width="42" height="42" alt="blood drop"/>
                    </span> 
                </div>

                <div className="navbar"> 
                    <div className="menus">
                        <a href="##" onClick={this.goToHome} tabIndex="1">Home</a>  
                        <Link to="/devurl" tabIndex="2"> Dev Url</Link>
                        <a href="##" onClick={this.goToRaiseRequest} tabIndex="3"> Raise Blood Request</a>
                        <a href="##" tabIndex="4">Emergency Contacts</a>
                    </div>
                </div>
            </div>      
        );
    } 
}

export default withRouter(Header);