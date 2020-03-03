import { gql } from 'apollo-boost';

export const getUsersQuery = gql`
{
  users{
    id
    fname
    age
  }
}
`

export const isAuthQuery = gql`
{
  mutation
  {
    isAuth(email: "", password: "")
    {
      id
    }
  }
  
}
`

