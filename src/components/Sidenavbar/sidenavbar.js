import React , { Component, Fragment } from 'react';
import './sidenavbar.css';
// import {Link} from 'react-router-dom';
import { FaSignOutAlt } from "react-icons/fa";
import {Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

class Sidenavbar extends Component 
{
    state = {
        logout: false,
        notificationNumber: 0,
        openAlert: false
    }

    openAlert = () => 
    {
        this.setState(
            () => { return { openAlert: true}},
            () => { console.log();}
        );
    }

    handleClose = (e, reason) =>
    {
        if (reason === 'clickaway') {
            return;
          }
        this.setState(
            () => { return { openAlert: false}},
            () => { console.log();}
        );
    }

    logout = e => {
            this.setState(
                () => { return { logout: true };},
                () => { console.log('logout changed');}
            );
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
            <Fragment>
            <div className="sidenav">
                <p id="user-fname">Hey {this.props.fname}</p>
                <a href="##" onClick={this.goToMyProfile} tabIndex="5" >My Profile</a>
                <a href="##" onClick={this.goToMyRequests} tabIndex="6">My Requests</a> 
                <a href="##"  tabIndex="7">My Donations</a>
                <a href="##" tabIndex="8"> My Medical Profile</a>
                <a href="##" tabIndex="8">Notifications {this.state.notificationNumber === 0 ? null : this.state.notificationNumber} </a>
                <a href="##"  onClick={this.openAlert}  id="logout-btn" tabIndex="9">Logout <FaSignOutAlt /></a>
             </div>
                    <Dialog
                        open={this.state.openAlert}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description">
                        <DialogTitle id="alert-dialog-slide-title">{"Are you sure you want to logout?"}</DialogTitle>
                        {/* <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to logout?
                        </DialogContentText>
                        </DialogContent> */}
                        <DialogActions>
                            <Button onClick={this.logout} color="primary">
                                Yes
                            </Button>
                            <Button onClick={this.handleClose} color="primary">
                                No
                            </Button>
                        </DialogActions>
                    </Dialog>
            </Fragment>
          );
    }
}

Sidenavbar.defaultProps = {
    fname: 'User'
}
export default withRouter(Sidenavbar);