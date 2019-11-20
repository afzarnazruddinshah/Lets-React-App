
const initState = {
    isAuth : false,
    email: 'unknown',
    fname: 'unknown'
}

const authReducer = (state=initState, action) =>
{
    if(action.type === 'login' || action.type === 'logout')
    {
        return action.payload
    }

    return state;
}

export default authReducer

