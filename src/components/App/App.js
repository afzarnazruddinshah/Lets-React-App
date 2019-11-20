import React, { Component} from 'react';
import { connect } from 'react-redux'
import './App.css';
import Routes from '../Routes/routes';

class App extends Component {
  state = {
    email: 'Livi@gmail.com',
    fname : 'Livi1',
    lname : 'Lesley'
  };
  
  render()
  {
    return(
      <div className="App">
        <Routes />       
      </div>
    );
    }
}

const mapStateToProps = (state) => {
  return state.auth;
}

export default connect(mapStateToProps) (App);
