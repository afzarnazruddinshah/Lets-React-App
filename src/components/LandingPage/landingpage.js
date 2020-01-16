import React, { Component, Fragment, Suspense, lazy } from 'react';
import { connect } from 'react-redux'
import {BrowserRouter, Route, Redirect,Switch } from 'react-router-dom'
import {withRouter } from 'react-router-dom';
 //import Feed from '../Feed/feed';
import './landingpage.css';
import '../App/App.css';
import Header1 from '../Header1/header1';
import Sidenavbar from '../Sidenavbar/sidenavbar';
import ErrorBoundary from '../ErrorBoundary/errorboundary';
//import DisplayDetails from '../BloodReqDetails/displayDetails';
 //import MyRequests from '../MyRequests/myrequests';
import Spinner from '../Spinner/spinner';
//import MyProfile from '../MyProfile/myprofile';
 //import RequestForm from '../RaiseRequest/requestform';


//Lazy Loading Components Defined here
const Feed = lazy(()=> import('../Feed/feed'));
const RequestForm = lazy( ()=> import('../RaiseRequest/requestform'));
const DisplayDetails = lazy( ()=> import('../BloodReqDetails/displayDetails'));
const MyRequests = lazy( ()=> import('../MyRequests/myrequests'));
const MyProfile = lazy( ()=> import('../MyProfile/myprofile'));

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
              <Suspense fallback={<div className="sidebar"> <Spinner /> </div>}>
                <div className="bloodrequest requestform">
                  <ErrorBoundary>
                    <RequestForm />
                  </ErrorBoundary>
                  <br /><br />
                </div>
              </Suspense>
              } />
            
              <Route path='/landingpage/bloodreq' render={ ()=> 
               <Suspense fallback={<div className="sidebar"> <Spinner /> </div>}>
                  <Fragment>
                    <ErrorBoundary>
                        <DisplayDetails req={this.props}/>
                    </ErrorBoundary>   
                  </Fragment>
                  </Suspense>
                } />
              
              <Route path='/landingpage/myrequests/' render={ ()=> 
              <Suspense fallback={<div className="sidebar"> <Spinner /> </div>}>
                    <Fragment>
                      <ErrorBoundary>
                          <MyRequests />
                      </ErrorBoundary>
                    </Fragment>
                    </Suspense>
                    }
                />
                <Route path="/landingpage/myprofile" render={ ()=> 
                 <Suspense fallback={<div className="sidebar"> <Spinner /> </div>}>
                <div className="bloodrequest requestform">
                    <ErrorBoundary>
                      <MyProfile />
                    </ErrorBoundary>
                    </div>
                  </Suspense>
                
                } />

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
