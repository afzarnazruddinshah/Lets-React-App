import React, { Component, Fragment } from 'react';
import Header1 from '../Header1/header1';
import { connect } from 'react-redux'
import DisplayDetails from './displayDetails';
import Sidenavbar from '../Sidenavbar/sidenavbar';


class RequestDetails extends Component {

    state = {
        fname: ''
    }

    constructor(props)
    {
        super(props);
        // console.log(props);
        this.state.fname = this.props.auth.fname;
    }

    render() 
    { 
        return ( 
        <div>
            <div className="App-header">
                <Header1 fname={this.state.fname} />
            </div>

            <Fragment>
                <Sidenavbar fname={this.state.fname}/>
            </Fragment>
               
            <div>
                <DisplayDetails req={this.props}/>
            </div>

        </div> );
    }
}

const mapStateToProps = (state) =>
{
    return state;
}

export default connect(mapStateToProps)(RequestDetails);