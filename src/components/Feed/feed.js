import React, { Component , lazy} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Spinner from '../Spinner/spinner';
import { Redirect } from 'react-router-dom';
const BloodRequest = lazy(()=> import('../RaiseRequest/bloodrequest'));

class Feed extends Component {

    state = { 
        fname : 'UnKnownThisTime',
        username: 'unknown', isAuth : false,
        token: 'none',
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

    constructor(props)
    {
        super(props);
        this.state.fname = this.props.auth.fname;
        this.state.username = this.props.auth.username;
        this.state.isAuth = this.props.auth.isAuth;
        this.state.token = this.props.auth.token;
    }

    componentDidMount()
    {
        this.getBloodReqs();
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
                this.setState(
                ()=> { return { bloodreqs: (res.data)};}
                );

            })
            .catch((err)=> {
                this.setState(
                    ()=> { return {isAuth: false}},
                    ()=> { console.log(this.state.isAuth);}
                );
            });
        }
    }

    render() { 
        if (this.state.isAuth === false) {
            return <Redirect to='/login' /> 
        }

        const mapper = this.state.bloodreqs.map((item, key) => <BloodRequest key={key} bldreq={item} id={key}/>)
        const feed = this.state.bloodreqs[0].dateofreq === null ? <Spinner /> : mapper;


        return (  
        <div className="bloodrequest">
            <p>Blood Requirements:</p>
            
            <div>
                {feed}
            </div>

        </div> );
    }
}

const mapStateToProps = (state) =>
{
    return state;
}
 
export default connect(mapStateToProps)(Feed);