import React, { Component} from 'react';
import {Link} from 'react-router-dom';

class ErrorBoundary extends Component {

    constructor(props) 
    {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) 
      {
        return (
            <div className="error-block">
                <p>
                    <span>Something went wrong. </span>
                    <Link to="/">Go To Login Page</Link> 
                </p>
            </div>
        );
      }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary;