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
                              <div className="application">
                                  <div className="App-header">
                                    <ErrorBoundary>
                                      <Header />
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

export default Routes;