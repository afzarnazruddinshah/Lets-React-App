import React, {Component, Fragment} from 'react';
import {connect } from 'react-redux';
import axios from 'axios';
import { withRouter, Redirect } from "react-router-dom";
import './login.css';
import { LogoutFromApp, LoginToApp } from '../../actions/loginActions';
import { removeBloodRequest} from '../../actions/bloodReqActions';
import { AUTH_API } from '../ConstDataRepo/constants';
// import { loginForm } from './loginForm';
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
        isSignUpAuth: false,
        showLogin: true,
        emailAlreadyPresent: false
    }

    componentDidMount()
    {
        document.title = "LetsReact | Home";
        //Logging out the state
        this.props.onLogoutFromApp();  
        this.onremoveBloodRequest();
        //Checking Server
        this.checkServer();
    }

    componentDidUpdate() {}

    checkServer = () => 
    {
        axios.get('http://localhost:3001')
        .catch( (err)=> {
            console.log(err);
             console.log(Object.getOwnPropertyNames(err));//**** */ to know the Properties of an Error-Object ******
            // console.log(Object.getOwnPropertyDescriptor(err, 'stack'));
            console.log(Object.getOwnPropertyDescriptor(err, 'message'));
            // console.log(Object.getOwnPropertyDescriptor(err, 'response'));
            // console.log(Object.getOwnPropertyDescriptor(err, 'toJSON'));
            // console.log(Object.getOwnPropertyDescriptor(err, 'isAxiosError'));
            // console.log(Object.getOwnPropertyDescriptor(err, 'config'));
            if(Object.getOwnPropertyDescriptor(err, 'message').value === 'Network Error')
            {
                this.handleSetState('networkerr', true);
            }
        })
    }

    onLogoutFromApp = () => {
        this.props.onLogoutFromApp();
    }

    onremoveBloodRequest = () => {
        this.props.onremoveBloodRequest();
    }
    
    onLoginToApp = (username, fname, token) =>
    {
        localStorage.setItem('token', token);
        this.props.onLoginToApp(username, fname, token);
    }

    // To Toggle Between Login and Signup Form
    showDiv = (e) =>
    {
        e.persist();
        var value = e.target.value === 'login'? true : false;
        this.handleSetState('showLogin', value);
    }
    
    //Update Login Form Email Value
    handleEmail = e => {
        var emailVal = e.target.value
        this.handleSetState('email', emailVal);
    }

    //Update Login Form Password
    handlePassword = e => {
        var pwd = e.target.value;
        this.handleSetState('pwd', pwd);
    }

    handleSetState = (key, value)=> {

        this.setState(()=> { return { [key]: value};},
        ()=> { console.log('key changed');}
        );
    }

    // Handle Login Form Submit Function
    handleSubmit = (event) => 
    {
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.pwd;
        //Getting Response from API Call
        axios({
            method: 'post',
            url: AUTH_API,
            data: {
                email: email,
                password: password
            },
            headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
            }
        })
        .then(res => {
            if(res.data.error === false)
            {
                //Login to Application and Redux Store update
                this.onLoginToApp(email, String(res.data.payload.result.fname), String(res.data.payload.token));
                this.handleSetState('isAuth', true);
            }
            else if(res.data.error === true && res.data.payload.errormsg === 'exception')
            {
                this.handleSetState('networkerr', true);
            }
            else if(res.data.error === true && res.data.payload.errormsg === 'notfound')
            {
                this.handleSetState('loginerrorvisibility', true);
            }
            })
            .catch( (err)=> {
                //console.log(Object.getOwnPropertyNames(err));//**** */ to know the Properties of an Error-Object ******
                //console.log(Object.getOwnPropertyDescriptor(err, 'stack'));
                //console.log(Object.getOwnPropertyDescriptor(err, 'message'));
                var errmsg = Object.getOwnPropertyDescriptor(err, 'message').value;
                console.log(err);
                if ( errmsg === 'Network Error')
                {
                    this.handleSetState('networkerr', true);
                }
            });
    }

    // Validation Logic for First Name and Last Name fields
    validateInput = e => {
        if(e.target.name === 'fname' || e.target.name === 'lname') 
        {
            var name = e.target.value;
            var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            var hasNumber = /\d/;
            if( name === ' ' || format.test(name) || hasNumber.test(name))
            {
                if(e.target.name === 'fname')
                {
                    this.handleSetState('fnameerr', true);
                }
                else
                {
                    this.handleSetState('lnameerr', true);
                }
            }
            else
            {
                if(e.target.name === 'fname')
                {
                    this.handleSetState('fnameerr', false);
                }
                else
                {
                    this.handleSetState('lnameerr', false);
                }
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
        this.handleSetState('email', email);
        // console.log(e.target.value);
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value))
        {
            this.handleSetState('emailerr', false);
         }
         else
         {
            this.handleSetState('emailerr', true);
         }
    }

    handleSignUpPwd = (e) => {
        var pwd = e.target.value;
        this.handleSetState('pwd', pwd);
    }

    handlePasswordMatch = e => {
        var confpwd = e.target.value;
        this.handleSetState('confirmpwd', confpwd );
    } 

    handleSubmitSignUp = (event) => {

        event.preventDefault();
        const { pwd, confirmpwd, fname, lname, email } = this.state;

        if(pwd !== confirmpwd)
        {   
            this.handleSetState('pwderr', true);
            return false;
        }
        else
        {
            this.handleSetState('pwderr', false);
            axios.post('http://localhost:3001/newuser', {
                fname: fname,
                lname: lname,
                email: email,
                pwd: pwd
            })
            .then(res => {
                console.log(res);
                if(res.data.error === true)
                {
                    this.handleSetState('networkerr', true);
                }
                if(res.data.error === false && res.data.payload.result === 'alreadyPresent')
                {
                    this.handleSetState('emailAlreadyPresent', true);
                }
                if( res.data.payload.result.n === 1)
                {
                    // this.props.history.push('/');
                    // this.onLoginToApp(email,fname);
                    // this.handleSetState('isSignUpAuth', true);
                }
            });
        } //else ends here
    }  //handleSignUpEvent Ends here

    render()
    {

        if (this.state.isAuth === true) 
        {
            return <Redirect to='/landingpage' /> 
        }
        
        if( this.state.isSignUpAuth === true)
        {
            return <Redirect to='/login' /> 
        }

        const networkerrmsg = <Fragment> &nbsp; &nbsp; &nbsp; Couldn't reach servers</Fragment>;
        const loginerrmsg = <Fragment>The username or password is incorrect </Fragment>;
        const loginerrormsg = this.state.loginerrorvisibility=== true?
                                    loginerrmsg : this.state.networkerr === true?
                                        networkerrmsg: null;
        const nameerrmsg =<Fragment>Field contains numbers or special characters</Fragment>;
        const fnameerr = this.state.fnameerr === true ? nameerrmsg: null;
        const lnameerr = this.state.lnameerr === true? nameerrmsg: null;

        const emailAlreadyPresent = <Fragment> <br/>This email already has an account</Fragment>
        const emailerrmsg = <Fragment><br /> The email Id is invalid</Fragment>;
        const emailerr = this.state.emailerr === true? emailerrmsg: this.state.emailAlreadyPresent === true ? emailAlreadyPresent: null;

        const pwderrmsg = <Fragment> <br />Passwords Don't Match</Fragment>;
        const pwderr = this.state.pwderr === true? pwderrmsg: null;
        
        const LoginClassName = this.state.showLogin === true ?'login-form d-block': 'login-form d-none';
        const SignupClassName = this.state.showLogin === true ?'signup-form d-none': 'signup-form d-block';

        const loginForm = 
        <div 
            className={LoginClassName} >

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
                    id="login-error-msg"> 
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

            const signupForm = 
            <div 
                className={SignupClassName}>

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

        const displayDiv = this.state.showLogin === true? loginForm : signupForm;
        function forgotPassword() 
        {
            alert("Forgot Password Functionality is under construction");
        }

        return(
               <div>
                <button 
                    type="button" 
                    value="login" 
                    id="login-head1" 
                    onClick={(e)=> this.showDiv(e)} 
                    className={this.state.showLogin === true? '.border-bottom-present': '.border-bottom-absent'}>
                    Login
                </button>
                &nbsp;
                 <button 
                    type="button" 
                    value="signup" 
                    id="login-head2" 
                    onClick={(e)=> this.showDiv(e)} 
                    className={this.state.showLogin === true? '.border-bottom-absent': '.border-bottom-present'}>
                    Sign Up
                    </button>

                    {displayDiv}
                
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

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Login))

