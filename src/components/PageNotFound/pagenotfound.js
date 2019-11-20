import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import Header1 from '../Header1/header1';
import { Link } from 'react-router-dom';

function PageNotFound(props)
{
    const fname = props.auth.fname;
    return(
        <Fragment>

            <div className="App-header">
                <Header1 fname={fname}/>
            </div>

            <div className="pagenotfound">
                <h1> 404 Error. Page Not Found </h1>
                <Link className="link" to={'/landingpage'}>Click Here to go Home</Link>
            </div>

        </Fragment>
    );
}

const mapStateToProps = (state) =>
{
    return state;
}

export default connect(mapStateToProps)(PageNotFound);