import React from 'react';
import './spinner.css';
class Spinner extends React.Component
{
    render()
    {
       return <React.Fragment>
           <i className="fa fa-circle-o-notch fa-spin"></i>
        </React.Fragment> 
    }
    
    
}

export default Spinner; 


