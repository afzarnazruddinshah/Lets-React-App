import React, { Component }from 'react';
import '../LandingPage/landingpage.css';
// import { Link } from 'react-router-dom';
import {addBloodRequest} from './../../actions/addbloodreq';
import {connect } from 'react-redux';
import './request.css';
import { Redirect } from "react-router-dom";

class BloodRequest extends Component {
    state = { 
        redirect: false
     }

    onAddBloodRequest = () =>
    {
        console.log("Displaying Request Details..");
        // console.log(this.props);
        this.props.onAddBloodRequest(this.props.bldreq);
        this.setState(
            ()=> { return { redirect: true};}
        );   
    }

    render() 
    {
        if (this.state.redirect === true) 
        {
            return <Redirect to='/bloodreq' /> 
        }

        return (
            <React.Fragment>
                <div className="bloodreqblock">
                    <p id="request-title">
                        #{this.props.id+1}  &nbsp;
                        Req: {this.props.bldreq.ptntblgrp} &nbsp; for &nbsp;
                        {this.props.bldreq.reqreason} &nbsp; Case
                    </p>
                    <p id="request-body"> 
                        Required on/before : 
                        {this.props.bldreq.dateofreq} <br/>
                        Hospital : {this.props.bldreq.hospname}, 
                        {this.props.bldreq.hosploc} &nbsp;
                        <span id="knowmore" onClick={()=> this.onAddBloodRequest()}>...know more </span> </p>
                 
                </div>
                <br />
            </React.Fragment>
          );
    }
}

const mapStateToProps = (state) =>
{
    return state.bloodreq;
}

const mapActionsToProps = {
    onAddBloodRequest : addBloodRequest
}
export default connect(mapStateToProps,mapActionsToProps)(BloodRequest);