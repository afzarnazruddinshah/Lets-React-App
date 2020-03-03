const graphql = require("graphql");

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLInt, 
    GraphQLSchema,
    GraphQLList
} = graphql;

const data = [
  { id: "hello121", fname: "hello1", lname: "hello1", age: 13 },
  { id: "hello122", fname: "hello2", lname: "hello2", age: 12 }
];


const users = [
    { email :'livingstone.it@gmail.com', password: 'lesley123', id:'123'},
    { email :'livingstone1.it@gmail.com', password: 'lesley1231', id:'124'}
]
const LoginType = new GraphQLObjectType({
    name: "Login",
    fields: () => ({
        id: { type: GraphQLString},
        email: { type: GraphQLString},
        password: { type: GraphQLString}
    })
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    isAuth: {
      type: LoginType,
      args: {
        email: { type: GraphQLString},
        password: { type: GraphQLString}
      },
      resolve(parent, args){
        if(args.email === 'livingstone.it@gmail.com' && args.password === 'lesley123'){
          return data[0]
        }
        else
        {
          return data[1]
        }
      }
    }
  }
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    fname: { type: GraphQLString },
    lname: { type: GraphQLString },
    age: { type: GraphQLInt },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    bloodgroup: { type: GraphQLString },
    city: { type: GraphQLString },
    contact: { type: GraphQLString },
    dob: { type: GraphQLString },
    gender: { type: GraphQLString },
    landmark: { type: GraphQLString },
    state: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        //Data fetch logic here - either from Database or any Data source
        var user = data.filter( item => item.id === args.id)[0]
        return user
      }
    },
    users: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLString}},
      resolve(parent, args){
        return data
      }
    },
    login: {
        type: LoginType,
        args: { email: { type: GraphQLString}, password: { type: GraphQLString}},
        resolve(parent, args)
        {
            //Actual Data fetch Happens - Db or Any other Data source
            return users.filter( item => item.email === args.email && item.password === args.password)[0];
        }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
