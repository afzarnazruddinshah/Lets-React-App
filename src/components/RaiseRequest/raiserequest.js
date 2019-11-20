import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import {Redirect } from 'react-router-dom';

import Header1 from '../Header1/header1';
import '../App/App.css';
import '../LandingPage/landingpage.css';
import RequestForm from '../RaiseRequest/requestform';
import '../RaiseRequest/request.css'
import Sidenavbar from '../Sidenavbar/sidenavbar';


class RaiseRequest extends Component {
    state = { 
      username: 'unknown',
      isAuth : false,
      fname : 'unknown'
     }

    constructor(props)
    {
      super(props);

      // console.log('Props of Raise Blood Request', props);
      this.state.username = this.props.auth.username;
      this.state.fname = this.props.auth.fname;
      this.state.isAuth = this.props.auth.isAuth;
    }

    componentDidMount()
    {
      document.title = "LetsReact | Raise Blood Request";
    }

    render() { 
      // const properties = this.props.auth;
      const isAuth = this.state.isAuth;

    if (isAuth === false) {
      return <Redirect to='/landingpage' /> 
    }

    //const username = this.props.auth.fname=== 'UnKnownThisTime' ? this.props.auth.fname : this.props.auth
    // console.log(username);

        return ( 
            <div className="App">
          
              <div className="App-header">
                <Header1 fname={this.state.fname} />
              </div>
              <br />
              <Fragment>
                <Sidenavbar fname={this.state.fname}/>
              </Fragment>

              <div className="bloodrequest requestform">
                <RequestForm />
              <br /><br />
              </div>

            </div> 
        );
    }
}
 
const mapStateToProps = (state) =>
{
    return state;
}

export default connect(mapStateToProps)(RaiseRequest);
