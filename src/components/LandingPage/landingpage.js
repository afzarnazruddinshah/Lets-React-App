import React, { Component, Fragment, Suspense } from 'react';
import { connect } from 'react-redux'
import {withRouter,Redirect } from 'react-router-dom';
import './landingpage.css';
import '../App/App.css';
import Header1 from '../Header1/header1';
import Sidenavbar from '../Sidenavbar/sidenavbar';
import ErrorBoundary from '../ErrorBoundary/errorboundary';
import { AppRoutes } from '../Routes/routes';
class LandingPage extends Component
{

  componentDidMount()
  {
    document.title = "LetsReact | Home";
  }

  componentDidCatch(props)
  {
    console.log(props);
  }

  render()
  {
    const isAuth = this.props.auth.isAuth;
    if (isAuth === false) {
      return <Redirect to='/login' /> 
    }


    return (
      <div className="App">
          <div className="App-header">
            <ErrorBoundary>
                <Header1/>
            </ErrorBoundary>
          </div>

          <Fragment>
            <ErrorBoundary>
              <Sidenavbar fname={this.props.auth.fname}/>
            </ErrorBoundary>
          </Fragment>
          
          <AppRoutes />
          

      </div>
    );
  }
}
const mapStateToProps = (state) =>
{
    return state;
}

export default withRouter(connect(mapStateToProps)(LandingPage));
