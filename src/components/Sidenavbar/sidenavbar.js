import React , { PureComponent } from 'react';
import './sidenavbar.css';
import {Link} from 'react-router-dom';
import { FaSignOutAlt } from "react-icons/fa";
import {Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
class Sidenavbar extends PureComponent 
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

    handleHistoryPush = e => {

        this.props.history.push('/landingpage/myrequests');
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
                <a href="##" onClick={this.handleHistoryPush} tabIndex="6">My Requests</a> 
                <a href="##"  tabIndex="7">My Donations</a>
                <a href="##" tabIndex="8"> My Medical Profile</a>
                <a href="##"  onClick={this.openAlert}  id="logout-btn" tabIndex="9">Logout <FaSignOutAlt /></a>
             </div>
          );
    }
}

export default withRouter(Sidenavbar);