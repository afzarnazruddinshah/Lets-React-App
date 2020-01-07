import React, { Component , lazy } from 'react';
import axios from 'axios'
const BloodRequest = lazy(()=> import('../RaiseRequest/bloodrequest'));
// import BloodRequest from '../RaiseRequest/bloodrequest';

class MyRequests extends Component {
    state = { 
        requestOwner: '',
        bloodreqs: [],
        dataPresent: false
     }

     componentDidMount()
     {
       console.log('its here');
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
            if(res.data !== 'none')
            {
              this.setState(
                ()=> { return { bloodreqs: (res.data), dataPresent: true};},
                ()=> { console.log('api fetched');} );
            }
        })
        .catch( err =>{
            console.log(err);
        });
     }
     
    render() 
    { 
      const mapper = this.state.bloodreqs.map((item, key) => <BloodRequest key={key} bldreq={item} id={key}/>)
      const feed = this.state.dataPresent === false ? <small>You don't have any requests..</small> : mapper;
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