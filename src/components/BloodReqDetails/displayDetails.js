import React from 'react';
import './reqdetails.css';

class DisplayDetails extends React.Component
{
   render()
   {
       return (
        <div className="bloodreq-details">
            
            <p id="req-title">Blood Request Details:</p>
                <div id="heading">
                    <p> Patient Details</p>
                </div>
                <p>Case: {this.props.req.bloodreq.reqreason}</p>
                <p> Patient Name: {this.props.req.bloodreq.ptntname} </p>
                <p> Patient Gender: {this.props.req.bloodreq.ptntgender}</p>
                <p> Patient Age: {this.props.req.bloodreq.ptntage}</p>

                <div id="heading">
                    <p>Blood Requirement:</p>
                </div>
                <p>Blood Grp Needed: {this.props.req.bloodreq.ptntblgrp}</p>
                <p>Units Required: {this.props.req.bloodreq.unitsreq} units</p>
                <p>Date of Requirement: on/before {this.props.req.bloodreq.dateofreq}</p>

                <div id="heading">
                    <p> Hospital Details</p>
                </div>
                <p>Hospital Name: {this.props.req.bloodreq.hospname}</p>
                <p>Hospital Location: {this.props.req.bloodreq.hosploc}</p>
                
                <div id="heading">
                    <p> Contact Details</p>
                </div>
                <p> Attendee Name: {this.props.req.bloodreq.attendeename}</p>
                <p>Contact no1: {this.props.req.bloodreq.cntctno1}</p>
                <p>Contact no2: {this.props.req.bloodreq.cntctno2}</p>    
        </div>
        );
   }
    
}

export default DisplayDetails