import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
  } from '@material-ui/core/styles';
  import InputBase from '@material-ui/core/InputBase';
  import InputLabel from '@material-ui/core/InputLabel';
  import FormControl from '@material-ui/core/FormControl';
  import { green } from '@material-ui/core/colors';

class DevComp extends Component {
    state = {  }

    
    render() { 

        const CssTextField = withStyles({
            root: {
              '& label.Mui-focused': {
                color: 'green',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'green',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'yellow',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'green',
                },
              },
            },
          })(TextField);

       

        
        return (
            <React.Fragment>

        

            <CssTextField
                    
                    label="Custom CSS"
                    variant="outlined"
                    id="custom-css-outlined-input"
                />

                    <p> Hey hi</p>

            </React.Fragment>
          );
    }
}
 
export default DevComp;