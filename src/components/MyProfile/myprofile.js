import React, { Component } from 'react';
import '../RaiseRequest/request.css';
import InputField from '../InputField/inputfield';
import './myprofile.css';
import DropDown from '../DropDown/dropdown';
import axios from 'axios';
import { connect } from 'react-redux'
import Spinner from '../Spinner/spinner';

class MyProfile extends Component {
    state = {  
        bloodgroups: [
            { id: 1, label: 'A+', value: 'a+'},
            { id: 2, label: 'B+', value: 'b+'},
            { id: 3,label: 'O+', value: 'o+'},
            { id: 4,label: 'AB+', value: 'ab+'},
            { id: 5,label: 'A-', value: 'a-'},
            { id: 6,label: 'B-', value: 'b-'},
            { id: 7,label: 'O-', value: 'o-'},
            { id: 8,label: 'AB-', value: 'ab-'},
        ],
        fname: '',
        lname: '',
        age: '',
        date: '',
        gender: [ 
        {id: 1,label: 'Male', value: 'male'},
        {id: 2,label: 'Female', value: 'female'},
        {id: 3,label: 'Other', value: 'other'},],
        myprofile :[
            {fname: '', lname: '', email: '', 'contact': '', age: '', gender: '', dob:'', bloodgroup: '',
            city: '', state: '', landmark: ''}
        ],
        data: 'none'
    }

    componentDidMount()
    {
        document.title = "LetsReact | My Profile";
        this.getProfile();
    }

    getProfile = () => {

        var token = String(localStorage.getItem('token'));
        console.log(token);
        var email = String(this.props.auth.email);
        console.log(email);
        axios({
            method: 'post',
            url: 'http://localhost:3001/api/myprofile',
            data: {
                email: email
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
                ()=> { return { myprofile: (res.data.payload.result), data: 'true'};},
                () => { console.log(this.state.myprofile[0]);}
                );
            }
            else if(res.data.error === true)
            {
                this.setState(
                    ()=> { return {data: 'false' }},
                    ()=> { console.log('no-profile-found');}
                );
            }

        })
        .catch((err)=> {
            console.log(err);
            this.setState(
                ()=> { return {isAuth: false}},
                ()=> { console.log(this.state.isAuth);}
            );
        });
    }
    handleSetState = (key, value) =>
    {
        this.setState(
            ()=> { return { [key]: value }},
            ()=> { console.log('key updated');}
        );
    }

    render() 
    { 
        return ( 
        <div className="reqform">

            <p id="title">My Profile : { this.state.data === false ? <Spinner /> : null}</p>
            <form 
                id="requestform" >
                    <div className="card-row">

                    <InputField
                        label="First Name"
                        type="text"
                        value={this.state.myprofile[0].fname}
                        name='fname'
                        id="fname"
                        placeholder="Ex. Livingstone"
                        onChange={this.handleSetState}
                    />

                    <InputField
                        label="Last Name"
                        type="text"
                        value={this.state.myprofile[0].lname}
                        name="lname"
                        id="lname"
                        placeholder="Ex. Lesley, P"
                        onChange={this.handleSetState} />

                    <InputField
                        label="Age"
                        value={this.state.myprofile[0].age}
                        type="number"
                        name="age"
                        id="age"
                        placeholder="Ex., 18, 24, " 
                        onChange={this.handleSetState}
                        />

                    <DropDown
                        name="gender"
                        label="Gender"
                        value={this.state.myprofile[0].gender}
                        options={this.state.gender}
                        />
                    </div>
                   
                    <div className="card-row">
                    
                    <InputField
                        label="Date of Birth"
                        type="date"
                        value={this.state.myprofile[0].dob}
                        id="dob"
                        name="dob"
                        onChange={this.handleSetState} />

                    <DropDown
                        name="ptntblgrp"
                        id="ptntblgrp"
                        value={this.state.myprofile[0].bloodgroup}
                        label="Blood Group"
                        options={this.state.bloodgroups} />

                    <InputField
                        type="email"
                        label="Email ID"
                        value={this.state.myprofile[0].email}
                        id="email"
                        name="email"
                        placeholder="Ex. livi@gmail.com" />
                    
                    <InputField
                        label="Contact Number"
                        value={this.state.myprofile[0].contact}
                        type="tel"
                        name="contact"
                        placeholder="Ex. 8248200614"
                        pattern="[0-9]{10}"
                        title="Please enter a valid phone number"
                        />
                        </div>

                    <div className="card-row">

                    <InputField
                        label="City"
                        type="text"
                        value={this.state.myprofile[0].city}
                        name="city"
                        id="city"
                        placeholder="Ex. Madurai" />
                    
                    <InputField
                        label="State"
                        type="text"
                        value={this.state.myprofile[0].state}
                        name="state"
                        id="state"
                        placeholder="Ex. Tamilnadu" />
                    
                    <InputField
                        type="text"
                        label="Residence Landmark"
                        value={this.state.myprofile[0].landmark}
                        name="landmark"
                        id="landmark"
                        placeholder="Ex. Kakatiya Hospital" />

                    <div className="card-column">
                        <div className="card">
                            <small className="font-size-10">Period..</small>
                            <button 
                                type="submit" >
                                Update Profile
                            </button>  
                        </div>
                    </div>
                       
                    </div>
                   
                </form>
        </div> );
    }
}
 
const mapStateToProps = (state) =>
{
    return state;
}

export default connect(mapStateToProps)(MyProfile);