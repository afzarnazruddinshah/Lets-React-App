import React, { Component, Fragment, Suspense, lazy  } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import {withRouter,Redirect } from 'react-router-dom';
import './landingpage.css';
import '../App/App.css';
import Header1 from '../Header1/header1';
// import BloodRequest from '../RaiseRequest/bloodrequest'
import Sidenavbar from '../Sidenavbar/sidenavbar';
import RaiseRequest from '../RaiseRequest/raiserequest';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import RequestForm from '../RaiseRequest/requestform';
import RequestDetails from './../BloodReqDetails/requestdetails';
import MyRequests from '../MyRequests/myrequests';
import Spinner from '../Spinner/spinner';

// const Sidebar = lazy(()=> import('../Sidebar/sidebar'));
const BloodRequest = lazy(()=> import('../RaiseRequest/bloodrequest'));
class LandingPage extends Component
{
  state = {
    fname : 'UnKnownThisTime',
    bloodreqs: [
      {
        ptntname: '', 
        ptntgender: '', 
        ptntage: '', 
        ptntblgrp: '', 
        unitsreq: '', 
        hospname : '', 
        hosploc: '', 
        reqreason: '', 
        attendeename: '', 
        cntctno1: '', 
        cntctno2: '', 
        dateofreq: null
      }
    ],
    ptntname : null, ptntgender: null, ptntage: null,  ptntblgrp: null,
    unitsreq: null,hospname: null,hosploc: null, reqreason: null,
    attendeename: null,cntctno1: null,cntctno2: null, dateofreq: null,
    username: 'unknown', isAuth : false,
    loading: '.d-none',
    token: 'none'
  }
  
  constructor(props)
  {
    super(props);
    //Updating State Via Props (Redux Store mapped to Props)
    this.state.fname = this.props.auth.fname;
    this.state.username = this.props.auth.username;
    this.state.isAuth = this.props.auth.isAuth;
    this.state.token = this.props.auth.token;
  }

  componentDidMount()
  {
    document.title = "LetsReact | Home";
    this.getBloodReqs();
  }

  componentDidUpdate()
  {
    // console.log('Component Did Update Executed');
  }

  getBloodReqs = () => 
  {
    var token = String(this.state.token);
    if(token !== 'none')
    {
      axios({
        method: 'get',
        url: 'http://localhost:3001/bloodreqs',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
            console.log('Getting Blood Requests...');
            this.setState(
              ()=> { return { bloodreqs: (res.data)};}
            );
  
        });
    }
  }

  render()
  {
    const isAuth = this.state.isAuth;
    if (isAuth === false) {
      return <Redirect to='/' /> 
    } 
    
    const mapper = this.state.bloodreqs.map((item, key) => <BloodRequest key={key} bldreq={item} id={key}/>)
    const feed = this.state.bloodreqs[0].dateofreq === null ? <Spinner /> : mapper;

    return (
      <div className="App">
          <div className="App-header">
            <Header1/>
          </div>

          <Fragment>
            <Sidenavbar fname={this.state.fname}/>
          </Fragment>
          
          <BrowserRouter>

          <Route exact path="/landingpage" render={()=> 
          <Suspense fallback={<div className="sidebar"> <Spinner /> </div>}>
              <div className="bloodrequest">
                <p>Blood Requirements:</p>
                <div>
                  {feed}
                </div>
              </div>
            </Suspense>
            }/>
          
          <Route path="/landingpage/raiserequest/" render={()=> 
            <div className="bloodrequest requestform">
            <RequestForm />
          <br /><br />
          </div>
          } />
        
          <Route path='/landingpage/bloodreq' render={ ()=> 
              <Fragment>
                  <RequestDetails />
              </Fragment>
              
            } />

          <Route path='/landingpage/myrequests' render={ ()=> 
          <Suspense fallback={<div className="sidebar"> <Spinner /> </div>}>
          <Fragment>
            <MyRequests />
          </Fragment>
          </Suspense>}
          />
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

//https://www.tatacliq.com/puma-velocity-idp-white-black-running-shoes/p-mp000000002386038
