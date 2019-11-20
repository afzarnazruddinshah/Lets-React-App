import React, {Fragment} from 'react';
import './header.css'
import blood_drop from './../../../src/blood_drop2.png'

function Header()
{
    
    return <Fragment>

                <p id="logo-header"> &nbsp; &nbsp; Let's React
                <img id='logo-image' src={blood_drop} width="42" height="42" alt="blood drop"/>

                <span id="menubar">
                    <a href="##">Emergency Blood Request</a>
                    <a href="#emergency-contact-leads"> Emergency Contact Leads</a>
                </span>
                </p>  
            </Fragment>  
}
export default Header;