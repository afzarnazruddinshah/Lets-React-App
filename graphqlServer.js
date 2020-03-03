const express = require('express'); //for creating APIs
const bodyParser = require('body-parser'); //middleware to parse request bodies
const cors = require('cors'); // to enable CORS (Cross-Origin-Resource-Sharing)

//GraphQL imports
const graphqlHTTP = require('express-graphql');

const PORT =3002;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.listen(PORT, () => {
    console.log('********************************************');
    console.log('  Server Started; Running on Port: '+PORT+' ');
    console.log('********************************************');
});

app.get('/', (req, res)=> {
    res.send('Welcome to GraphQL Web API Server');
});

app.use('/graphql', graphqlHTTP({
    
}))