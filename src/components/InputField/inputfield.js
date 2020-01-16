import React, { Component, Fragment } from 'react';
import '../MyProfile/myprofile.css';

class InputField extends Component {
    state = { 
        name: 'input',
        id: 'input',
        placeholder: 'Input',
        title: ''
      }

      inputChange = e =>
      {
          this.props.onChange(e.target.name, e.target.value);
      }

    render() 
    {
        const type = this.props.type;
        var date = this.props.value;
        var date1 = null;
        if( type === 'date')
        {
            var date1 = new Date(date);
            var dd = date1.getDate();
            var mm = date1.getMonth()+1; //January is 0!
            var yyyy = date1.getFullYear();

            if(dd<10)
            {
                dd='0'+dd  //If Date is between 1-9 - Prefix '0' to it
            } 
            if(mm<10)
            {
                mm='0'+mm  //If Month is between 1-9 - Prefix '0' to it
            }
            // date1 = mm+'/'+dd+'/'+yyyy;
            date1 = yyyy+'-'+mm+'-'+dd;
        }

        const value = date1 === null ? this.props.value : date1;
        
        return( 
            <div className="card-column">
                <div className="card">
                    <small className="font-size-10">{this.props.label}</small>
                    <input
                        value={value}
                        pattern={this.props.pattern}
                        type={this.props.type}
                        name={this.props.name}
                        id={this.props.id}
                        onChange={this.inputChange}
                        placeholder={this.props.placeholder}
                        title={this.props.title}
                        />
                </div>
            </div>
         );
    }
}
 
export default InputField;