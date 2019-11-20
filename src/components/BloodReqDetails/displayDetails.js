import React from 'react';
import './reqdetails.css';

function DisplayDetails(props)
{
    // console.log(props);
    return (
        <div className="bloodreq-details">
            
            <h2 id="req-title">Blood Request Details:</h2>
                <div id="heading">
                    <p> Patient Details</p>
                </div>
                <p>Case: {props.req.bloodreq.reqreason}</p>
                <p> Patient Name: {props.req.bloodreq.ptntname} </p>
                <p> Patient Gender: {props.req.bloodreq.ptntgender}</p>
                <p> Patient Age: {props.req.bloodreq.ptntage}</p>

                <div id="heading">
                    <p>Blood Requirement:</p>
                </div>
                <p>Blood Grp Needed: {props.req.bloodreq.ptntblgrp}</p>
                <p>Units Required: {props.req.bloodreq.unitsreq} units</p>
                <p>Date of Requirement: on/before {props.req.bloodreq.dateofreq}</p>

                <div id="heading">
                    <p> Hospital Details</p>
                </div>
                <p>Hospital Name: {props.req.bloodreq.hospname}</p>
                <p>Hospital Location: {props.req.bloodreq.hosploc}</p>
                
                <div id="heading">
                    <p> Contact Details</p>
                </div>
                <p> Attendee Name: {props.req.bloodreq.attendeename}</p>
                <p>Contact no1: {props.req.bloodreq.cntctno1}</p>
                <p>Contact no2: {props.req.bloodreq.cntctno2}</p>

           
        </div>
    )
}

export default DisplayDetails