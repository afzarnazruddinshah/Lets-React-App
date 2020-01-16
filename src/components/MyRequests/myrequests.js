import React, { Component , lazy } from 'react';
import axios from 'axios';
import './myrequests.css';
//const BloodRequest = lazy(()=> import('../RaiseRequest/bloodrequest'));
import BloodRequest from '../RaiseRequest/bloodrequest';

class MyRequests extends Component {
    state = { 
        requestOwner: '',
        bloodreqs: [],
        dataPresent: false,
        norequests: false
     }
     
     componentDidMount()
     {
       document.title = "LetsReact | My Requests";
      this.getMyRequests();
     }

     getMyRequests = () => 
     {
        //  var requestOwner = this.state.requestOwner;
         var stateProps = JSON.parse(localStorage.getItem('state'));
         var requestOwner = String(stateProps.auth.email);
         var token = String(localStorage.getItem('token'));
         axios({
          method: 'post',
          url: 'http://localhost:3001/api/myrequests',
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
           if(res.data.error === false)
           {
              this.setState(
                ()=> { return { bloodreqs: (res.data.payload.result), dataPresent: true};},
                ()=> { console.log('api fetched');} );
           }
           else if(res.data.error === false && res.data.payload.result === null)
           {
             this.setState(
               () => { return { norequests: true }},
               ()=> { console.log('no-requests');}
             );
           }
            if(res.data.error === true && res.data.payload.result === null)
            {
              this.setState(
                ()=> { return { dataPresent: false};},
                ()=> { console.error('error'); });
            }
        })
        .catch( err =>{
            console.log(err);
        });
     }
     
    render() 
    { 
      const mapper = this.state.bloodreqs.map((item, key) => <BloodRequest key={key} bldreq={item} id={key}/>)
      const feed = this.state.norequests === true ? <small id="no-request">You don't have any requests. Also, Thank God for keeping your acquaintances safe !</small> : mapper;
      return( 
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