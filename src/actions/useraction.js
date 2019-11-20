
export function LoginToApp(email, fname)
{
    return {
        type: 'login',
        payload: {
            email: email,
            fname : fname,
            isAuth : true
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
            fname: 'unknown'
        }
    }
}

