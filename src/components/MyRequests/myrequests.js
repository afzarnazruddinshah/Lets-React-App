import React, { Component } from 'react';
import axios from 'axios';
import './myrequests.css';
//const BloodRequest = lazy(()=> import('../RaiseRequest/bloodrequest'));
import BloodRequest from '../RaiseRequest/bloodrequest';
import { MY_REQUESTS_API } from '../ConstDataRepo/constants';

class MyRequests extends Component {
    state = { 
        requestOwner: '',
        bloodreqs: [
         
        ],
        dataPresent: false,
        norequests: true
     }
     
     constructor(props)
     {
       super(props);
       this.getMyRequests = this.getMyRequests.bind(this);
     }
     componentDidMount()
     {
       document.title = "LetsReact | My Requests";
      this.getMyRequests();
     }

     async getMyRequests() 
     {
        //  var requestOwner = this.state.requestOwner;
         var stateProps = JSON.parse(localStorage.getItem('state'));
         var requestOwner = String(stateProps.auth.email);
         var token = String(localStorage.getItem('token'));
         await axios({
          method: 'post',
          url: MY_REQUESTS_API,
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
           if(res.data.error === false && res.data.payload.result !== null)
           {
              this.setState(
                ()=> { return { bloodreqs: (res.data.payload.result), dataPresent: true, norequests: false};},
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
      // const mapper = this.state.norequests === false?  : null;
      const noRequestsMsg = <small id="no-request">You don't have any requests. Also, Thank God for keeping your family and acquaintances safe !</small>
      const feed = this.state.norequests === true ? noRequestsMsg   : this.state.bloodreqs.map((item, key) => <BloodRequest key={key} bldreq={item} id={key}/>);
      
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