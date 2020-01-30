import React, { Component } from "react";
import "../RaiseRequest/request.css";
import InputField from "../InputField/inputfield";
import "./myprofile.css";
import DropDown from "../DropDown/dropdown";
import axios from "axios";
import { connect } from "react-redux";
import Spinner from "../Spinner/spinner";
import {
  MY_PROFILE_API,
  genderDDOptions,
  bloodgroupsDDOptions,
  MY_PROFILE_UPDATE_API
} from "../ConstDataRepo/constants";
import Snackbar from '@material-ui/core/Snackbar';
import {Alert} from '@material-ui/lab';


class MyProfile extends Component {
  state = {
    openSnackBar: false,
    fname: "",
    lname: "",
    age: 0,
    gender: "",
    dob: "",
    bloodgroup: "",
    email: "",
    contact: "",
    city: "",
    state: "",
    landmark: "",
    myprofile: [
      {
        fname: "",
        lname: "",
        email: "",
        contact: "",
        age: "",
        gender: "",
        dob: "",
        bloodgroup: "",
        city: "",
        state: "",
        landmark: ""
      }
    ],
    data: "none",
    genderErr: false,
    bloodgroupErr: false
  };

  constructor(props)
  {
    super(props);
    this.getProfile = this.getProfile.bind(this);
  }

  componentDidMount() {
    document.title = "LetsReact | My Profile";
    this.getProfile();
  }

  async getProfile(){
    //Fetching Variables for Ajax Calls
    var token = String(localStorage.getItem("token"));
    await axios({
      method: "post",
      url: MY_PROFILE_API,
      data: {
        email: String(this.props.auth.email)
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        console.log(res);
        if (res.data.error === false) {
          this.setState(
            () => {
              return {
                fname: res.data.payload.result[0].fname,
                lname: res.data.payload.result[0].lname,
                age: res.data.payload.result[0].age === null ? 0: res.data.payload.result[0].age,
                gender: res.data.payload.result[0].gender,
                dob: res.data.payload.result[0].dob,
                bloodgroup: res.data.payload.result[0].bloodgroup,
                email: res.data.payload.result[0].email,
                contact: res.data.payload.result[0].contact,
                city: res.data.payload.result[0].city,
                state: res.data.payload.result[0].state,
                landmark: res.data.payload.result[0].landmark,
                data: "true"
              };
            },
            () => {
              console.log(this.state);
            }
          );
        } else if (res.data.error === true) {
          this.setState(
            () => {
              return { data: "false" };
            },
            () => {
              console.log("no-profile-found");
            }
          );
        }
      })
      .catch(err => {
        console.log(err);
        this.setState(
          () => {
            return { isAuth: false };
          },
          () => {
            console.log(this.state.isAuth);
          }
        );
      });
  };

  
  handleSetState = (key, value) => {
    this.setState(
      () => {
        return { [key]: value };
      },
      () => {
        console.log();
      }
    );
  };

  handleSnackBar = e => {
    this.handleSetState('openSnackBar', false);
  }

  validateDropDown = (key, value) => {
    if ((key === "gender" || key === "bloodgroup") && value !== "null") {
      this.handleSetState(key, value);
      var keyErr = key + "Err";
      this.handleSetState(keyErr, false);
    }
  };

  validateStrInput = (key, value) => {
    console.log('triggered');
    var hasNumber = /\d/;
    var hasSpecialChars = /[ !~`@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (!hasNumber.test(value) && !hasSpecialChars.test(value)) {
      this.handleSetState(key, value);
    }
  };

  finalDropDownValidate = () => {
    if (this.state.gender === "" || this.state.gender === "null") {
      this.handleSetState("genderErr", true);
      return false;
    } else if (
      this.state.bloodgroup === "" ||
      this.state.bloodgroup === "null"
    ) {
      this.handleSetState("bloodgroupErr", true);
      return false;
    } else {
      return true;
    }
  };

  updateProfile = e => {
    e.preventDefault();
    var token = String(localStorage.getItem('token'));
    if (this.finalDropDownValidate()) {
      axios({
        method: "post",
        url: MY_PROFILE_UPDATE_API,
        data: {
          email: String(this.props.auth.email),
          fname: this.state.fname,
          lname: this.state.lname,
          age: this.state.age,
          gender: this.state.gender,
          dob: this.state.dob,
          bloodgroup: this.state.bloodgroup,
          contact: this.state.contact,
          city: this.state.city,
          state: this.state.state,
          landmark: this.state.landmark
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      .then( res=> {
        // console.log(res);
        if( res.data.payload.result.matchedCount === 1 && res.data.payload.result.modifiedCount === 1)
        {
          this.handleSetState('openSnackBar', true);
          // setTimeout(() => {
          //   this.handleSetState('openSnackBar', false);
          // }, 3000);
          // alert('Your Profile has been successfully updated');
        }
      })
      .catch( err=> {
        console.log(err);
      })
    }
  };

  render() {
    return (
      <div className="reqform">
        <p id="title">
          My Profile : {this.state.data === false ? <Spinner /> : null}
        </p>
        <form id="requestform" onSubmit={this.updateProfile}>
          <div className="card-row">
            <InputField
              label="First Name"
              type="text"
              value={this.state.fname}
              name="fname"
              id="fname"
              placeholder="Ex. Livingstone"
              onChange={this.validateStrInput}
              required={true}
            />

            <InputField
              label="Last Name"
              type="text"
              value={this.state.lname}
              name="lname"
              id="lname"
              placeholder="Ex. Lesley, P"
              onChange={this.validateStrInput}
              required={true}
            />

            <InputField
              label="Age of User"
              value={this.state.age === undefined ? 0: this.state.age}
              type="number"
              name="age"
              id="age"
              min="1"
              max="99"
              placeholder="Ex., 19, 24, "
              title="Ex. 19, 24"
              onChange={this.handleSetState}
              required={true}
            />

            <DropDown
              name="gender"
              label="Gender"
              className={this.state.genderErr === true ? "error-focus" : null}
              value={this.state.gender}
              options={genderDDOptions}
              onChange={this.validateDropDown}
              required={true}
            />
          </div>

          <div className="card-row">
            <InputField
              type="date"
              id="dob"
              name="dob"
              label="Date of Birth"
              value={this.state.dob}
              onChange={this.handleSetState}
            />

            <DropDown
              name="bloodgroup"
              id="bloodgroup"
              value={this.state.bloodgroup}
              label="Blood Group"
              className={
                this.state.bloodgroupErr === true ? "error-focus" : null
              }
              options={bloodgroupsDDOptions}
              onChange={this.validateDropDown}
              required={true}
            />

            <InputField
              type="email"
              label="Email ID"
              value={this.state.email}
              id="email"
              name="email"
              placeholder="Ex. livi@gmail.com"
              readonly={true}
            />

            <InputField
              label="Contact Number"
              value={this.state.contact === undefined ? '' : this.state.contact}
              type="tel"
              name="contact"
              placeholder="Ex. 8248200614"
              pattern="[1-9]{1}[0-9]{9}"
              title="Format: 8248200614"
              onChange={this.handleSetState}
              required={true}
            />
          </div>

          <div className="card-row">
            <InputField
              label="City"
              type="text"
              value={this.state.city === undefined ? '' : this.state.city}
              name="city"
              id="city"
              placeholder="Ex. Madurai"
              onChange={this.validateStrInput}
              required={true}
            />

            <InputField
              label="State"
              type="text"
              value={this.state.state === undefined ? ''  : this.state.state}
              name="state"
              id="state"
              placeholder="Ex. Tamilnadu"
              onChange={this.validateStrInput}
              required={true}
            />

            <InputField
              type="text"
              label="Residence Landmark"
              value={this.state.landmark === undefined ? '' : this.state.landmark}
              name="landmark"
              id="landmark"
              placeholder="Ex. Kakatiya Hospital"
              onChange={this.handleSetState}
            />

            <div className="card-column">
              <div className="card">
                <small className="font-size-10">Period..</small>
                <button type="submit">Update Profile</button>
              </div>
            </div>
          </div>
        </form>
        {/* Snack Bar Here */}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.openSnackBar}
          onClose={this.handleSnackBar}
          autoHideDuration={4000}
        >
         <Alert 
            onClose={this.handleSnackBar} 
            severity="success"
            variant="filled">
          Your Profile has been Updated Successfully !
        </Alert>
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(MyProfile);
