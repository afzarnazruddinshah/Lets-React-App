import React, { Component } from 'react';

class DropDown extends Component {
    state = { 
        value: ''
     }

    handleChange = e => {
        var value = e.target.value;
        this.setState(
            ()=> { return { value : value};},
            ()=> { console.log(this.state.value);}
        )
    }
    render() { 
        console.log(this.props.value);
        console.log(this.props.options);
        console.log(this.state.value);
        const options = this.props.options.map( 
            (option) => <option key={option.id} value={option.value} >{option.label}</option> );
        return(
            <div className="card-column">
                <div className="card">
                    <small className="font-size-10">{this.props.label}</small>
                    <select name={this.props.name} value={this.state.value === '' ? this.props.value : this.state.value} onChange={this.handleChange}>
                        <option value="null">Select an option</option>
                        {options}
                   </select> 
                </div>
            </div>
         );
    }
}
 
export default DropDown;