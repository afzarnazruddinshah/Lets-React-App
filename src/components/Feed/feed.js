import React, { Component , lazy} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './feed.css';
import Spinner from '../Spinner/spinner';
import { Redirect } from 'react-router-dom';
import { FEED_API } from '../ConstDataRepo/constants';
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
          ],
          dataError: false
    }

    constructor(props)
    {
        super(props);
        this.state.fname = this.props.auth.fname;
        this.state.username = this.props.auth.username;
        this.state.isAuth = this.props.auth.isAuth;
        this.state.token = this.props.auth.token;
        //Function Binding to this
        this.getBloodReqs = this.getBloodReqs.bind(this);
    }

    componentDidMount()
    {
        document.title = "LetsReact | Home";
        this.getBloodReqs();
    }

    async getBloodReqs() 
    {
        var token = String(this.state.token);
        if(token !== 'none')
        {
            await axios({
                method: 'get',
                url: FEED_API,
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
                        ()=> { return { bloodreqs: (res.data.payload.result)};},
                        ()=> { console.log(this.state.bloodreqs);}
                    );
                }
                else if(res.data.error === true)
                {
                    this.setState(
                        ()=> { return { dataError: true}},
                        ()=> { console.log('dataError Happened');}
                    );
                }
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
        </div>);
    }
}

const mapStateToProps = (state) =>
{
    return state;
}
 
export default connect(mapStateToProps)(Feed);