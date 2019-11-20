import React, { Fragment } from 'react';
import blood_drop from '../../../src/blood_drop2.png'

function Sidebar(props) {

    return  <Fragment>
                <h1>You Don't Have To Be Doctor To Save Lives</h1>
                <h1> Just Donate Blood &nbsp;
                <img src={blood_drop} width="20" height="20" alt="blood drop"/>
                </h1>
                <h1>And Live as a Life Saver</h1>
            </Fragment>;
  }


export default Sidebar