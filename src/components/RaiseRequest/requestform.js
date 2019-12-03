import React, { Component , Fragment} from 'react';
import axios from 'axios';
// import $ from 'jquery'; 
import './request.css';
//Material UI
// import TextField from '@material-ui/core/TextField';
// import { withStyles } from '@material-ui/core/styles';

// import { Redirect } from 'react-router-dom';

class RequestForm extends Component {

    state = {
        ptntname: '',
        ptntage: '',
        ptntgender: '',
        ptntblgrp: '',
        unitsreq: '',
        reqreason: '',
        dateofreq: '',
        hospname: '',
        hosploc: '',
        attendeename: '',
        cntctno1: '',
        cntctno2: '',
        today: '',
        infomsg: 'Blood Request Submitted',
        infomsgvisibility: true,
        bloodgroups: [
            'A+', 'A-', 
            'B+', 'B-',
            'O+', 'O-',
            'AB+', 'AB-'
        ],
        genders:[ 'Male','Female', 'Others'],
        isFormValid: true,
        genderErr: false,
        blgrpErr: false,
        requestOwner: ''
    }

    constructor(props)
    {
        super(props);
        this.textInput = React.createRef();
        this.genderRef = React.createRef();
        this.blgrpRef = React.createRef();
        // this.state.requestOwner = this.props.requestOwner;
        // console.log(this.state.requestOwner);
        
    }


    getRequestOwner = () => {
        console.log('getRequestOwner');
        var stateProps = JSON.parse(localStorage.getItem('state'));
        var requestOwner = String(stateProps.auth.email);
        this.setState(
            () => { return { requestOwner: requestOwner};}, 
            ()=> { console.log('requestOwner Updated');}
        );

    }
    componentDidMount()
    {
        this.setMinDate();
        this.textInput.current.focus();
        this.getRequestOwner();
        // console.log(this.genderRef);
    }
    
    setMinDate = () =>   //To set Minimum Date for Date of Requirement
    {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10)
        {
            dd='0'+dd  //If Date is between 1-9 - Prefix '0' to it
        } 
        if(mm<10)
        {
            mm='0'+mm  //If Month is between 1-9 - Prefix '0' to it
        }

        today = yyyy+'-'+mm+'-'+dd;
        var datefield = document.getElementById('dateofreq');
        datefield.setAttribute('min', today);
        datefield.setAttribute('defaultValue', today);
        this.setState(
            ()=> { return { today: today}; }
            )
    }

    handleInput = (event) =>
    {
        this.setState({ 
            [event.target.name]: event.target.value
        }, ()=> { console.log('forms getting filled..');});

        if(event.target.name === 'ptntgender')
        {
            console.log('ptntgender changing..');
            this.setState( ()=> { return { genderErr: false};})
        }
        if(event.target.name === 'ptntblgrp')
        {
            console.log('ptntblgrp changing..');
            this.setState( ()=> { return { blgrpErr: false};})
        }
    }

    handleDropDowns = () =>
    {
        if(this.state.ptntgender === '' && this.state.ptntblgrp === '')
        {
            this.genderRef.current.focus();
            this.setState( ()=> { return { genderErr: true, blgrpErr: true};});
            return false;
        }
        if( this.state.ptntgender === '' || this.state.ptntgender === 'null')
        {
            this.genderRef.current.focus();
            this.setState( ()=> { return { genderErr: true};});
            return false;
        }
        else
        {
            this.setState( ()=> { return { genderErr: false};})
        }

        if( this.state.ptntblgrp === '' || this.state.ptntblgrp === 'null')
        {
            this.blgrpRef.current.focus();  
            this.setState( ()=> { return {blgrpErr: true};} );
            return false;
        }
        else
        {
            this.setState( ()=> { return { blgrpErr: false};})
        }

        return true;
    }

    callAPI = () =>
    {
        var token = localStorage.getItem('token');
        console.log(this.state);
        axios({
            method: 'post',
            url: 'http://localhost:3001/newbloodreq',
            data: {
                ptntname: this.state.ptntname,
                ptntage: this.state.ptntage,
                ptntgender: this.state.ptntgender,
                ptntblgrp : this.state.ptntblgrp,
                unitsreq: this.state.unitsreq,
                reqreason: this.state.reqreason,
                dateofreq: this.state.dateofreq,
                hospname: this.state.hospname,
                hosploc: this.state.hosploc,
                attendeename: this.state.attendeename,
                cntctno1: this.state.cntctno1,
                cntctno2: this.state.cntctno2,
                requestOwner: this.state.requestOwner
            },
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
        axios.post('http://localhost:3001/newbloodreq', 
        {
            ptntname: this.state.ptntname,
            ptntage: this.state.ptntage,
            ptntgender: this.state.ptntgender,
            ptntblgrp : this.state.ptntblgrp,
            unitsreq: this.state.unitsreq,
            reqreason: this.state.reqreason,
            dateofreq: this.state.dateofreq,
            hospname: this.state.hospname,
            hosploc: this.state.hosploc,
            attendeename: this.state.attendeename,
            cntctno1: this.state.cntctno1,
            cntctno2: this.state.cntctno2,
            requestOwner: this.state.requestOwner
        })
        .then(res => {
            console.log(res);
            });
    }
    handleRequest = (event) =>
    {
        event.preventDefault();
        if(this.handleDropDowns())
        {
            console.log(this.state);
            setTimeout(this.callAPI(), 1000);
            document.getElementById('requestform').reset();
            alert('Your Blood Request has been Submitted'); 
        }
    }
    render() 
    {
        const dateofBirth = this.state.bloodgroups.map((item, key)=> <option key={key} value={item}>{item}</option> );
        const genders = this.state.genders.map((item, key)=> <option key={key} value={item}>{item}</option>)
        
        return (   
        <div className="reqform">

         <p id="bloodrequest-title">Raise Blood Request : </p>

        <form 
            id="requestform" 
            onSubmit={this.handleRequest}>

            <p> Patient Details: </p>

            <input 
                ref={this.textInput} 
                type="text" 
                name="ptntname" 
                onChange={this.handleInput} 
                placeholder="Patient Name" 
                required
                />
            <input 
                type="number" 
                min="0" 
                name="ptntage" 
                onChange={this.handleInput} 
                placeholder="Patient Age" 
                required/>

        
            <select 
                name="ptntgender" 
                id="ptntgender"
                onChange={this.handleInput}
                ref={this.genderRef}
                className={this.state.genderErr===true?'error-field':null}
                required>
                <option value="null">Select Gender</option>
                {genders}
            </select>

            
            <br />
            <p> Blood Requirement Details:</p>
            <select 
                name="ptntblgrp" 
                id="ptntblgrp"
                onChange={this.handleInput}
                ref={this.blgrpRef}
                className={this.state.blgrpErr===true?'error-field':null}
                required>
                    <option value='null'> Select Blood Group </option>
                {dateofBirth}
            </select>

            <input 
                type="text" 
                name="unitsreq" 
                onChange={this.handleInput} 
                placeholder="No of Units Required" 
                required/>

            <input 
                type="text" 
                name="reqreason" 
                onChange={this.handleInput} 
                placeholder="Reason for Blood Requirement" 
                required/>

            <input 
                type="date" 
                name="dateofreq" 
                id="dateofreq" 
                onChange={this.handleInput}
                // defaultValue={this.state.today}  
                min='2019-09-12' 
                max='2022-12-12' 
                placeholder="Date of Requirement" 
                title="Date of Blood Requirement" 
                required/>

            <br />
            <p> Hospital Information:</p>

            <input 
                type="text" 
                name="hospname" 
                onChange={this.handleInput} 
                placeholder="Hospital Name" 
                required/>

            <input 
                type="text" 
                name="hosploc" 
                onChange={this.handleInput} 
                placeholder="Hospital Location" 
                required/>

            <br />
            <p> Contact Information:</p>

            <input 
                type="text" 
                name="attendeename" 
                onChange={this.handleInput} 
                placeholder="Attendee Name" 
                required/>

            <input 
                type="tel" 
                name="cntctno1" 
                onChange={this.handleInput} 
                placeholder="Contact Number" 
                pattern="[0-9]{10}" 
                title="Please enter a valid Phone Number. Ex: 8248200614" 
                required/>

            <input 
                type="tel" 
                name="cntctno2" 
                onChange={this.handleInput} 
                placeholder="Contact Number 2" 
                pattern="[0-9]{10}" 
                title="Please enter a valid Phone Number. Ex: 8248200614" 
                required/>

            <button 
                type="submit"
                >
                Submit Request
            </button>

        </form>
         </div> );
    }
}

export default RequestForm;