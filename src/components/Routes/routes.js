import React, { Fragment, Suspense, lazy } from 'react';
import {BrowserRouter, Route, Redirect,Switch } from 'react-router-dom'
import PageNotFound from './../PageNotFound/pagenotfound';
import Header from '../Header/header'
import Login from '../Login/login';
// import Sidebar from '../Sidebar/sidebar';
import LandingPage from '../LandingPage/landingpage';
import RaiseRequest from '../RaiseRequest/raiserequest';
import DevComp from '../devComp/devcomp';
import RequestDetails from './../BloodReqDetails/requestdetails';
import Spinner from '../Spinner/spinner';

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
                                    <Header/>
                                  </div>

                                  <Suspense fallback={<div className="sidebar"> <Spinner /> </div>}>
                                  <div className="sidebar">
                                    <Sidebar />
                                  </div>
                                  </Suspense>

                                  <div className="login">
                                    <Login />
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
                      <DevComp />
                    </div>
                          } />
                  
                  

                  <Route
                      render={
                        props =>
                          <Fragment>
                            <PageNotFound />
                          </Fragment>
                      }
                    />
                </Switch>
               
        </BrowserRouter>
    
}

export default Routes;