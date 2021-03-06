        const express = require('express'); //for creating APIs
        const bodyParser = require('body-parser'); //middleware to parse request bodies
        const cors = require('cors'); // to enable CORS (Cross-Origin-Resource-Sharing)

        const app = express(); // App to create API's
        app.use(bodyParser.urlencoded({ extended: false })); 
        app.use(bodyParser.json());
        app.use(cors());

        app.get('/api/message', (request, response)=> {

            //Handling your request and Responding appropriately
            response.send('This is the welcome message');
        });

        app.post('/api/loginUser', (req, res)=> {
            console.log(req.body);
            res.send('received');
        });

        app.listen(3001, () => {
            console.log('listening on 3001')
            });


            var userCredentials = { username: 'Livingstone', password: 'livingstonepw'};
            axios.post('http://localhost:3001/api/loginUser',userCredentials)
            .then( (response)=> 
            {
                console.log(response);
            });

            //General setState method
            this.setState( 
                { stateKey: 'stateValue'}
            );
            
            //Return a function that returns the object, along with a call-back function
            this.setState( 
                () => { return  { stateKey: 'stateValue'} },
                () => { console.log('updated');}
            );
            
            handleBtnClick = e =>{
                console.log('Say hello');
            }

            <button onClick={ (e) => this.handleBtnClick(e) } >Submit </button>

            //Binding in the constructor
            constructor(props)
            {
                super(props);
                this.handleBtnClick = this.handleBtnClick.bind(this);
            }

            //Binding this in render
            <button onClick={this.handleChange.bind(this)} >Submit </button>

              
        