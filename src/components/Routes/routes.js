import React, { Fragment, Suspense, lazy } from 'react';
import {BrowserRouter, Route, Redirect,Switch } from 'react-router-dom'
import PageNotFound from './../PageNotFound/pagenotfound';
import Header from '../Header/header'
import Login from '../Login/login';
// import Sidebar from '../Sidebar/sidebar';
import LandingPage from '../LandingPage/landingpage';
// import RaiseRequest from '../RaiseRequest/raiserequest';
import Feed from '../Feed/feed';
import RequestForm from '../RaiseRequest/requestform';
import DisplayDetails from '../BloodReqDetails/displayDetails';
import MyRequests from '../MyRequests/myrequests';
// import RequestDetails from './../BloodReqDetails/requestdetails';
import Spinner from '../Spinner/spinner';
import ErrorBoundary from '../ErrorBoundary/errorboundary';
import TodoApp from '../devComp/devcomp';
const Sidebar = lazy(()=> import('../Sidebar/sidebar'));

const Routes = () => 
{
    return <BrowserRouter>
              <Switch>
                  <Route exact path="/" render={() => (
                      <Redirect to="/login"/>
                        )}/>

                  <Route path='/login' render={ () =>
                              <div>
                                  <div className="App-header">
                                    <ErrorBoundary>
                                      <Header/>
                                    </ErrorBoundary>
                                  </div>

                                  <Suspense fallback={<div className="sidebar"> <Spinner /> </div>}>
                                  <div className="sidebar">
                                  <ErrorBoundary>
                                      <Sidebar />
                                  </ErrorBoundary>
                                    
                                  </div>
                                  </Suspense>

                                  <div className="login">
                                  <ErrorBoundary>
                                    <Login />
                                  </ErrorBoundary>
                                    
                                  </div>
                                  
                              </div>
                            } />

                  <Route path='/landingpage' render={() =>
                              <div>
                                  <div className="App-header">
                                  <LandingPage/>
                                  </div>
                              </div>
                            } />

                  {/* <Route path='/raiserequest' render={() =>
                              <div>
                                  <div className="App-header">
                                  <RaiseRequest/>
                                  </div>
                              </div>
                            } /> */}

                  <Route path='/devurl' render={ ()=>
                    <div className="devcomp">  
                      <TodoApp />
                    </div>
                          } />

                  <Route
                      render={
                        props =>
                          <Fragment>
                            <ErrorBoundary>
                              <PageNotFound />
                            </ErrorBoundary>
                          </Fragment>
                      }
                    />
                </Switch>
               
        </BrowserRouter>
    
}


export const AppRoutes = () => 
{
  return <BrowserRouter>
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
}

export default Routes;