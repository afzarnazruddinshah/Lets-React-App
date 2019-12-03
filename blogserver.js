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

    app.listen(3001, () => {
        console.log('listening on 3001')
     });
              