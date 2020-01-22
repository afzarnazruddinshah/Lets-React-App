import React, { Component } from 'react';
import './dropdown.css';
class DropDown extends Component {
    state = { 
        value: ''
    }

    handleChange = e => {
        this.props.onChange(String(e.target.name), String(e.target.value));
    }
    render() {
        const options = this.props.options.map( 
            (option) => <option key={option.id} value={option.value} >{option.label}</option> );
        return(
            <div className="card-column">
                <div className="card">
                    <small className="font-size-10">{this.props.label}</small>
                    <select 
                        className={this.props.className}
                        name={this.props.name} 
                        value={ this.state.value === '' ? this.props.value : this.state.value } 
                        onChange={this.handleChange}>
                        <option value="null">Select an option</option>
                        {options}
                   </select> 
                </div>
            </div>
         );
    }
}
 
export default DropDown;