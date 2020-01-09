import React, { Component, Fragment, Suspense } from 'react';
import { connect } from 'react-redux'
import {BrowserRouter, Route, Redirect,Switch } from 'react-router-dom'
import {withRouter } from 'react-router-dom';
import Feed from '../Feed/feed';
import './landingpage.css';
import '../App/App.css';
import Header1 from '../Header1/header1';
import Sidenavbar from '../Sidenavbar/sidenavbar';
import ErrorBoundary from '../ErrorBoundary/errorboundary';
import DisplayDetails from '../BloodReqDetails/displayDetails';
import MyRequests from '../MyRequests/myrequests';
import Spinner from '../Spinner/spinner';
import RequestForm from '../RaiseRequest/requestform';
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
          
          <BrowserRouter>
      <Switch>
        <Route exact path="/landingpage" render={() => (
                  <Redirect to="/landingpage/feed"/>
                    )}/>

        <Route exact path="/landingpage/feed" render={()=> 
        <Suspense fallback={<div className="sidebar"> <Spinner /> </div>}>
            <ErrorBoundary>
              <Feed />
            </ErrorBoundary>
          </Suspense>
          }/>
        
        <Route path="/landingpage/raiserequest/" render={()=> 
          <div className="bloodrequest requestform">
            <ErrorBoundary>
              <RequestForm />
            </ErrorBoundary>
          
        <br /><br />
        </div>
        } />
      
        <Route path='/landingpage/bloodreq' render={ ()=> 
            <Fragment>
            <ErrorBoundary>
                <DisplayDetails req={this.props}/>
            </ErrorBoundary>   
            </Fragment>
          } />
        
        <Suspense fallback={<div className="sidebar"> <Spinner /> </div>}>
          <Route path='/landingpage/myrequests/' render={ ()=> 
            
              <Fragment>
                <ErrorBoundary>
                    <MyRequests />
                </ErrorBoundary>
              </Fragment>
              }
          />
        </Suspense>
      </Switch>
  </BrowserRouter>
          

      </div>
    );
  }
}
const mapStateToProps = (state) =>
{
    return state;
}

export default withRouter(connect(mapStateToProps)(LandingPage));
