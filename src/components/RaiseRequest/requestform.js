import React, { Component } from "react";
import axios from "axios";
// import $ from 'jquery';
import "./request.css";
import InputField from "../InputField/inputfield";
import {
  NEW_REQUEST_API,
  genderDDOptions,
  bloodgroupsDDOptions
} from "../ConstDataRepo/constants";
import DropDown from "../DropDown/dropdown";
//Material UI
// import TextField from '@material-ui/core/TextField';
// import { withStyles } from '@material-ui/core/styles';
// import { Redirect } from 'react-router-dom';

class RequestForm extends Component {
  state = {
    ptntname: "",
    ptntage: "",
    ptntgender: "",
    ptntblgrp: "",
    unitsreq: "",
    reqreason: "",
    dateofreq: "",
    hospname: "",
    hosploc: "",
    attendeename: "",
    cntctno1: "",
    cntctno2: "",
    today: "",
    infomsg: "Blood Request Submitted",
    infomsgvisibility: true,
    bloodgroups: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    genders: ["Male", "Female", "Others"],
    isFormValid: true,
    requestOwner: "",
    dbUpdated: "none",
    ptntblgrpErr: false,
    ptntgenderErr: false
  };

  getRequestOwner = () => {
    var stateProps = JSON.parse(localStorage.getItem("state"));
    var requestOwner = String(stateProps.auth.email);
    this.setState(
      () => {
        return { requestOwner: requestOwner };
      },
      () => {
        console.log("requestOwner Updated");
      }
    );
  };

  componentDidMount() {
    document.title = "LetsReact | Raise Request";
    this.setMinDate();
    // this.textInput.current.focus();
    this.getRequestOwner();
  }

  setMinDate = () =>
    //To set Minimum Date for `Date of Requirement`
    {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();

      if (dd < 10) {
        dd = "0" + dd; //If Date is between 1-9 - Prefix '0' to it
      }
      if (mm < 10) {
        mm = "0" + mm; //If Month is between 1-9 - Prefix '0' to it
      }

      today = yyyy + "-" + mm + "-" + dd;
      this.setState(() => {
        return { today: today };
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

  validateStrInput = (key, value) => {
    var hasNumber = /\d/;
    var hasSpecialChars = /[ !~`@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (!hasNumber.test(value) && !hasSpecialChars.test(value)) {
      this.handleSetState(key, value);
    }
  };

  validateDropDown = (key, value) => {
    if ((key === "ptntblgrp" || key === "ptntgender") && value !== "null") {
      this.handleSetState(key, value);
      var keyErr = key + "Err";
      this.handleSetState(keyErr, false);
    }
  };

  finalDropDownValidate = () => {
    if (this.state.ptntgender === "" || this.state.ptntgender === "null") {
      this.handleSetState("ptntgenderErr", true);
      return false;
    } else if (this.state.ptntblgrp === "" || this.state.ptntblgrp === "null") {
      this.handleSetState("ptntblgrpErr", true);
      return false;
    } else {
      return true;
    }
  };

  callAPI = () => {
    var token = localStorage.getItem("token");
    console.log(this.state);
    axios({
      method: "post",
      url: NEW_REQUEST_API,
      data: {
        ptntname: this.state.ptntname,
        ptntage: this.state.ptntage,
        ptntgender: this.state.ptntgender,
        ptntblgrp: this.state.ptntblgrp,
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
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      if (res.data.error === false && res.data.payload.result === "dpUpdated") {
        this.handleSetState("dbUpdated", true);
      } else if (res.data.error === true && res.data.payload.result === null) {
        this.handleSetState("dbUpdated", false);
      }
    });
  };

  handleRequest = event => {
    event.preventDefault();
    if (this.finalDropDownValidate()) {
      setTimeout(this.callAPI(), 1000);
      document.getElementById("requestform").reset();
      alert("Your Blood Request has been Submitted");
    }
  };

  render() {
    return (
      <div className="reqform">
        <p id="bloodrequest-title">Raise Blood Request : </p>

        <form id="requestform" onSubmit={this.handleRequest}>
          <p id="title"> Patient Details: </p>

          <div className="card-row">
            <InputField
              type="text"
              name="ptntname"
              label="Patient Name"
              placeholder="Ex. Livingstone"
              onChange={this.validateStrInput}
              required={true}
            />

            <InputField
              type="number"
              placeholder="Ex. 24"
              name="ptntage"
              min="1"
              max="99"
              label="Patient Age"
              onChange={this.handleSetState}
              required={true}
            />

            <DropDown
              name="ptntgender"
              label="Gender"
              required={true}
              options={genderDDOptions}
              onChange={this.validateDropDown}
            />

            <DropDown
              name="ptntblgrp"
              label="Blood Group"
              options={bloodgroupsDDOptions}
              required={true}
              onChange={this.validateDropDown}
            />
          </div>

          <div className="card-row">
            <p id="title"> Requirement Details: </p>
            <InputField
              type="number"
              onChange={this.handleSetState}
              min="1"
              max="20"
              name="unitsreq"
              label="No of Units Required"
              placeholder="Ex. 3"
              required={true}
            />

            <InputField
              type="text"
              name="reqreason"
              label="Reason for Request"
              placeholder="Ex. Dengue Fever"
              onChange={this.handleSetState}
              required={true}
            />

            <InputField
              type="date"
              name="dateofreq"
              min="2019-09-12"
              max="2022-12-12"
              label="Date of Req."
              onChange={this.handleSetState}
              required={true}
            />
          </div>

          <div className="card-row">
            <p id="title"> Patient Details: </p>
            <InputField
              type="text"
              name="hospname"
              placeholder="Ex. Medicover Hospital"
              label="Hospital Admitted"
              onChange={this.handleSetState}
              required={true}
            />

            <InputField
              type="text"
              name="hosploc"
              label="Hospital Location"
              placeholder="Ex. Madhapur"
              onChange={this.handleSetState}
              required={true}
            />
          </div>

          <p> Contact Information:</p>
          <div className="card-row">
            <InputField
              type="text"
              name="attendeename"
              onChange={this.validateStrInput}
              label="Attendee Name"
              placeholder="Ex. Livingstone"
              required={true}
            />

            <InputField
              type="tel"
              name="cntctno1"
              placeholder="Ex. 8248200614"
              pattern="[1-9]{1}[0-9]{9}"
              label="Contact No"
              title="Format: 8248200613"
              onChange={this.handleSetState}
              required={true}
            />

            <InputField
              type="tel"
              name="cntctno2"
              placeholder="Contact Number 2"
              pattern="[1-9]{1}[0-9]{9}"
              title="Format: 8248200613"
              label="Contact No.2 (Optional)"
              onChange={this.handleSetState}
            />

            <div className="card-column">
              <div className="card">
                <small className="font-size-10">Period..</small>
                <button type="submit">Submit Request</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default RequestForm;
