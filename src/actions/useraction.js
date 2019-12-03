
export function LoginToApp(email, fname, token)
{
    return {
        type: 'login',
        payload: {
            email: email,
            fname : fname,
            isAuth : true,
            token: token
        }
    }
}

export function LogoutFromApp()
{
    return {
        type: 'logout',
        payload: {
            isAuth : false,
            email: 'unknown',
            fname: 'unknown',
            token: 'none'
        }
    }
}

