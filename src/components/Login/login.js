import React, {Component, Fragment} from 'react';
import {connect } from 'react-redux';
import axios from 'axios';
import { withRouter, Redirect } from "react-router-dom";
import './login.css';
import { LogoutFromApp, LoginToApp } from '../../actions/useraction';
import { removeBloodRequest} from '../../actions/addbloodreq';
class Login extends Component
{
    state = {
        fname: '',
        lname: '',
        username: '',
        email: '',
        pwd: '',
        confirmpwd: '',
        error: null,
        isAuth : false,
        users: [], 
        loginres: [],
        loginerrorvisibility : false,
        signupvalidity : true,
        fnameerr: false,
        lnameerr: false,
        emailerr: false,
        pwderr: false,
        networkerr: false,
        isSignUpAuth: false
    }

    constructor(props)
    {
        super(props);
        this.onLoginToApp = this.onLoginToApp.bind(this);
        this.onLogoutFromApp = this.onLogoutFromApp.bind(this);
        this.onremoveBloodRequest = this.onremoveBloodRequest.bind(this);
    }

    componentDidMount()
    {
        document.title = "LetsReact | Home";
        this.deleteCurrentUser();
        this.props.onLogoutFromApp();   
    }

    componentDidUpdate()
    {

    }

    deleteCurrentUser = () => {
       
        // deleteStateFromLocalStorage();
        axios.post('http://localhost:3001/curuserdel')
        .then(res => {
            //  console.log(res);
            })
        .catch( (err)=> {
            console.log(Object.getOwnPropertyDescriptor(err, 'message').value);
            this.setNetworkError();
        })  
    }

    setNetworkError = () => {
        this.setState( ()=> { return { networkerr: true};})
    }

    onLogoutFromApp(){
        this.props.onLogoutFromApp();
    }

    onremoveBloodRequest(){
        this.props.onremoveBloodRequest();
    }
    
    onLoginToApp(username, fname)
    {
        this.props.onLoginToApp(username, fname);
    }

    updateCurrentUser = (fname) => 
    {
        axios.post('http://localhost:3001/loggeduser', 
        {
            email : this.state.email,
            fname : fname
        })
        .then(res => {
            // console.log(res);
            });
    }

    // To Toggle Between Login and Signup Form
    showDiv = (e) =>
    {
        var login = document.getElementsByClassName("login-form")
        var signup = document.getElementsByClassName("signup-form")

        var logbutton1 = document.getElementById("login-head1");
        var logbutton2 = document.getElementById("login-head2");

        if(e.target.value === "login")
        {
            login[0].style.display = "block";
            signup[0].style.display = "None";
            logbutton1.style.borderBottom = "2px solid white";
            logbutton2.style.borderBottom = "0px solid white";  
        }
        if (e.target.value === "signup")
        {
            login[0].style.display = "None";
            signup[0].style.display = "block";
            logbutton1.style.borderBottom = "0px solid white";
            logbutton2.style.borderBottom = "2px solid white";
        }   
    }
    
    //Update Login Form Email Value
    handleEmail = e => {
        var emailVal = e.target.value
        this.setState(
            () => { return { email: emailVal};}
        )
    }

    //Update Login Form Password
    handlePassword = e => {
        var pwd = e.target.value;
        this.setState(
            ()=> { return { pwd: pwd};}
        )  
    }

    handleSetState = (key, value)=> {
        // switch(key)
        // {
        //     case 'isAuth': { this.setState(()=> { return { key: value};}); break;}

        //     case 'loginerrorvisibility': { this.setState(()=>{ return { key: value};}); break;}

        //     default: return;
        // }

        this.setState(()=> { return { [key]: value};});
    }

    // Handle Login Form Submit Function
    handleSubmit = (event) => {
       
        event.preventDefault();
        // window.location.href = "/landingpage";
        const email = this.state.email;
        // const username = this.state.username;
        const password = this.state.pwd;
        // console.log(email, password);
        //Getting Response from API Call
        axios.get('http://localhost:3001/loginuser?email='+email+'&password='+password)
        .then(res => {
            //Updating the State first
            this.setState((res) => { return { loginres: res.data};});
            const loginres = res.data;
            console.log(res);
            if(loginres !== '')
            {
                this.updateCurrentUser(res.data.fname);
                this.onLoginToApp(email, res.data.fname);
                //this.onUpdateIsAuth();
                // this.setState(
                //     ()=> { return { isAuth: true};}
                // );
                this.handleSetState('isAuth', true);
            }
            else
            {
                // console.log('inside else');
                // this.setState(
                //     ()=> { return { loginerrorvisibility: true};}
                // );
                this.handleSetState('loginerrorvisibility', true);
            }
            })
        .catch( (err)=> {
            // console.log(err);
            // console.log(typeof err);
            // console.log(err.response);
            // console.log(err.type);
            // console.log(err.type);
            // console.log(Object.getOwnPropertyNames(err));//**** */ to know the Properties of an Object ******
            // console.log(Object.getOwnPropertyDescriptor(err, 'stack'));
            // console.log(Object.getOwnPropertyDescriptor(err, 'message'));
            var errmsg = Object.getOwnPropertyDescriptor(err, 'message').value;
            if ( errmsg === 'Network Error')
            {
                // this.setNetworkError();
                this.handleSetState('networkerr', true);
            }
        })
    }

    // Validation Logic for First Name and Last Name fields
    validateInput = e => {
        if(e.target.name === 'fname' || e.target.name === 'lname') 
        {
            var name = e.target.value;
            var id = String(e.target.name)+'err';
            var errorparaid = e.target.name.concat('-error-msg');
            var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            var hasNumber = /\d/;
            if( name === ' ' || format.test(name) || hasNumber.test(name))
            {
                if(e.target.name === 'fname')
                {
                    // this.setState(()=> { return { fnameerr: true};});
                    this.handleSetState('fnameerr', true);
                }
                else
                {
                    // this.setState(()=> { return { lnameerr: true};});
                    this.handleSetState('lnameerr', true);
                }
                
                // document.getElementById(errorparaid).innerHTML = ' Field contains numbers or special characters';
            }
            else
            {
                if(e.target.name === 'fname')
                {
                    // this.setState(()=> { return { fnameerr: false};});
                    this.handleSetState('fnameerr', false);
                }
                else
                {
                    // this.setState(()=> { return { lnameerr: false};});
                    this.handleSetState('lnameerr', false);
                }
                
                // this.setState(()=> { return { id: false};});
                // document.getElementById(errorparaid).innerHTML = ' ';
            }
        }
    }

    //Handling Input Change in Signup Form
    handleInputChange = e => {
        this.setState(
            {
                [e.target.name] : e.target.value
            }
        );
        this.validateInput(e);
    }

    handleSignUpEmail = e => {
        
        var email = e.target.value;
        this.setState(
            ()=> { return { email: email};} );
        // console.log(e.target.value);
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value))
        {
            // this.setState(()=> { return { emailerr: false};});
            this.handleSetState('emailerr', false);
         }
         else
         {
            // this.setState(()=> { return { emailerr: true};});
            this.handleSetState('emailerr', true);
            // document.getElementById('email-signup-error-msg').innerHTML = '  <br /> email Id is invalid';
         }
    }

    handleSignUpPwd = (e) => {
        var pwd = e.target.value;
        this.setState(
            ()=> {return { pwd: pwd};} )
    }

    handlePasswordMatch = e => {
        var confpwd = e.target.value;
        this.setState( () => 
        {return {
            confirmpwd : confpwd
        } } );

    } 

    handleSubmitSignUp = (event) => {

        event.preventDefault();
        const { pwd, confirmpwd, fname, lname, email } = this.state;

        if(pwd !== confirmpwd)
        {   
            this.setState(()=> { return { pwderr: true};});
            return false;
        }
        else
        {
            this.setState(()=> { return { pwderr: false};});

            document.getElementById('password-error-msg').innerHTML = "";
            axios.post('http://localhost:3001/newuser', {
                fname: fname,
                lname: lname,
                email: email,
                pwd: pwd
            })
            .then(res => {
                if(res.data.result.n === 1)
                {
                    //    console.log('success');
                    this.updateCurrentUser(fname);
                        this.onLoginToApp(email,fname);
                    this.setState( () => {
                        return { isSignUpAuth: true}
                    })
                }
            });
        } //else ends here
    
    }  //handleSignUpEvent Ends here

    render()
    {

        if (this.state.isAuth === true) {
                return <Redirect to='/landingpage' /> 
          }
        
          if( this.state.isSignUpAuth === true)
          {
            return <Redirect to='/login' /> 
          }
        const networkerrmsg = <Fragment> &nbsp; Check your server connectivity</Fragment>;
        const loginerrmsg = <Fragment>The username or password is incorrect </Fragment>;
        const loginerrormsg = this.state.loginerrorvisibility=== true?
                                    loginerrmsg : this.state.networkerr === true?
                                        networkerrmsg: null;
        
        const nameerrmsg =<Fragment>Field contains numbers or special characters</Fragment>;
        const fnameerr = this.state.fnameerr === true ? nameerrmsg: null;
        const lnameerr = this.state.lnameerr === true? nameerrmsg: null;

        const emailerrmsg = <Fragment><br /> The email Id is invalid</Fragment>;
        const emailerr = this.state.emailerr === true? emailerrmsg: null;

        const pwderrmsg = <Fragment> <br />Passwords Don't Match</Fragment>;
        const pwderr = this.state.pwderr === true? pwderrmsg: null;

        //console.log(this.state.users);
        // console.log(this.state.isAuth);

        function forgotPassword() 
        {
            alert("Forgot Password Functionality is under construction");
        }
        // const React = require('react');
        // console.log(React.version);

        // const isInvalid = 
        // pwd !== confirmpwd ||
        // username !== ' ' || 
        // fname !== ' ' || 
        // lname !== ' ';
        return(
               <div>
                <button type="button" value="login" id="login-head1" onClick={this.showDiv} >Login</button> <button type="button" value="signup" id="login-head2" onClick={this.showDiv} >Sign Up</button>
                
                    <div className="login-form">

                        <form 
                            method="POST" 
                            onSubmit={this.handleSubmit}
                            >

                            <h2 
                                id="login-title">
                                &nbsp;Login
                            </h2>

                            <label 
                                htmlFor="email" 
                                id="email-error-msg"> 
                                {loginerrormsg}
                            </label>

                            <input 
                                type="email" 
                                name="email" 
                                onChange={this.handleEmail} 
                                placeholder="Email" 
                                required/>

                            <br/> <br/>

                            <input 
                                type="password" 
                                name="password" 
                                onChange={this.handlePassword} 
                                placeholder="Password" 
                                required />

                            <br /> <br />

                            <button 
                                type="submit">
                                    Login
                            </button>

                            <p
                                id="forgot-password-info" 
                                onClick={forgotPassword}>
                                &nbsp;Forgot Password? <u>Click Here</u> 
                            </p>

                        </form> 
                    </div>
                <div className="signup-form">
                    <form method="POST" onSubmit={this.handleSubmitSignUp}>
                        <h2 id="login-title">&nbsp;Sign Up</h2>

                        <label 
                            htmlFor="fname" 
                            id="fname-error-msg">
                                {fnameerr}
                        </label>

                        <input 
                            type="type" 
                            name="fname" 
                            onChange={this.handleInputChange}  
                            placeholder="First Name" 
                            required/>

                        <br  /> <br  />

                        <label 
                            htmlFor="lname" 
                            id="lname-error-msg"
                        >
                            {lnameerr}
                        </label>

                        <input 
                            type="type" 
                            name="lname" 
                            onChange={this.handleInputChange}  
                            placeholder="Last Name" 
                            required/>

                        <br/> <br/>
                        
                        <input 
                            type="email" 
                            name="email" 
                            onChange={this.handleSignUpEmail} 
                            placeholder="Email" 
                            required/>
                       
                        <small 
                            id="email-signup-error-msg">
                                {emailerr}
                        </small>

                        <br/> <br/>

                        <input 
                            type="password" 
                            name="pwd"  
                            onChange={this.handleSignUpPwd} 
                            placeholder="Password" 
                            required />

                        <br /> <br />

                        <input 
                            type="password" 
                            name="confirmpwd" 
                            onKeyUp={(event) => this.handlePasswordMatch(event)} 
                            placeholder="Confirm Password" 
                            required />

                        <small 
                            id="password-error-msg"> 
                            {pwderr}
                        </small>

                        <br />

                        <button 
                            type="submit">
                            Sign Up
                        </button>
                        <br />
                    </form>    
                </div>
            </div>
        )
    }
}   
const mapStateToProps = (state) =>
{
    return state;
}

const mapActionsToProps = {
    onLogoutFromApp : LogoutFromApp,
    onLoginToApp : LoginToApp,
    onremoveBloodRequest: removeBloodRequest
}

export default connect(mapStateToProps, mapActionsToProps) (withRouter(Login))

