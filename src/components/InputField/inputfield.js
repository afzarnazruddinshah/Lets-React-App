import React, { Component } from "react";
import "../MyProfile/myprofile.css";

class InputField extends Component {
  state = {
    name: "input",
    id: "input",
    placeholder: "Input",
    title: ""
  };

  inputChange = e => {
    this.props.onChange(this.props.name, e.target.value);
  };

  render() {
    const type = this.props.type;
    var date = this.props.value;
    var date1 = null;
    if (type === "date") {
      date1 = new Date(date);
      var dd = date1.getDate();
      var mm = date1.getMonth() + 1; //January is 0!
      var yyyy = date1.getFullYear();

      if (dd < 10) {
        dd = "0" + dd; //If Date is between 1-9 - Prefix '0' to it
      }
      if (mm < 10) {
        mm = "0" + mm; //If Month is between 1-9 - Prefix '0' to it
      }
      // date1 = mm+'/'+dd+'/'+yyyy;
      date1 = yyyy + "-" + dd + "-" + mm;
    }

    const value = date1 === null ? this.props.value === 0 ? '' : this.props.value : date1;

    return (
      <div className="card-column">
        <div className="card">
          <small className="font-size-10">{this.props.label}</small>
          <input
            value={value}
            min={this.props.min}
            max={this.props.max}
            pattern={this.props.pattern}
            type={this.props.type}
            name={this.props.name}
            id={this.props.id}
            onChange={this.inputChange}
            placeholder={this.props.placeholder}
            title={this.props.title}
            required={this.props.required === true ? true : false}
            readOnly={this.props.readonly === true ? true : false}
          />
        </div>
      </div>
    );
  }
}

export default InputField;
