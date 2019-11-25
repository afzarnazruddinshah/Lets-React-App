import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import {withRouter,Redirect } from 'react-router-dom';
import './landingpage.css';
import '../App/App.css';
import Header1 from '../Header1/header1';
import BloodRequest from '../RaiseRequest/bloodrequest'
import Sidenavbar from '../Sidenavbar/sidenavbar';
import RaiseRequest from '../RaiseRequest/raiserequest';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import RequestForm from '../RaiseRequest/requestform';
import RequestDetails from './../BloodReqDetails/requestdetails';

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
    loading: '.d-none'
  }
  
  constructor(props)
  {
    super(props);
    // console.log('Props of LandingPage : ', props);

    //Updating State Via Props (Redux Store mapped to Props)
    this.state.fname = this.props.auth.fname;
    this.state.username = this.props.auth.username;
    this.state.isAuth = this.props.auth.isAuth;
  }

  componentDidMount()
  {
    // console.log('component Did Mount executed');
    document.title = "LetsReact | Home";
    this.getBloodReqs();
  }

  componentDidUpdate()
  {
    // console.log('Component Did Update Executed');
  }

  getBloodReqs = () => {
    axios.get('http://localhost:3001/bloodreqs')
      .then(res => {
          console.log('Getting Blood Requests..');
          // console.log(res.data);
          this.setState(
            ()=> { return { bloodreqs: (res.data)};}
          );

      });
  }

  render()
  {
    const isAuth = this.state.isAuth;
    // const blreqs = this.state.bloodreqs;
    if (isAuth === false) {
      return <Redirect to='/' /> 
    }
    // const className = '.d-block';
    // if(this.state.bloodreqs[0].dateofreq === null)
    // {
    //   this.setState(
    //     ()=> { return { loading: className};});
    // }
    
    const mapper = this.state.bloodreqs.map((item, key) => <BloodRequest key={key} bldreq={item} id={key}/>)

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
              <div className="bloodrequest">
                <p>Blood Requirements:</p>
                <div className={this.state.bloodreqs[0].dateofreq === null? '.d-none': '.d-block'}>
                  {mapper}
                </div>
              </div>
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
