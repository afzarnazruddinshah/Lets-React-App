import React, { Component , lazy } from 'react';
import axios from 'axios'
import Spinner from '../Spinner/spinner';
const BloodRequest = lazy(()=> import('../RaiseRequest/bloodrequest'));
// import BloodRequest from '../RaiseRequest/bloodrequest';

class MyRequests extends Component {
    state = { 
        requestOwner: '',
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
          ]
     }

     componentDidMount()
     {
         this.getMyRequests();
     }
     getMyRequests = () => {
        //  var requestOwner = this.state.requestOwner;
         var stateProps = JSON.parse(localStorage.getItem('state'));
         var requestOwner = String(stateProps.auth.email);
         var token = String(localStorage.getItem('token'));
         axios({
          method: 'post',
          url: 'http://localhost:3001/myrequests',
          data: {
            requestOwner: requestOwner
          },
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
         .then(res => {
            console.log('Getting My Blood Requests..');
            this.setState(
              ()=> { return { bloodreqs: (res.data)};},
              ()=> { console.log('bloodreqs changed');}
            );
  
        })
        .catch( err =>{
            // console.log(err);
        })
     }
    render() {
        
        const mapper = this.state.bloodreqs.map((item, key) => <BloodRequest key={key} bldreq={item} id={key}/>)
        const feed = this.state.bloodreqs[0].dateofreq === null ? <Spinner /> : mapper;
        return ( 
            <div className="bloodrequest">
                <p>My Blood Requests:</p>
                <div>
                  {feed}
                </div>
              </div>
         );
    }
}
 
export default MyRequests;