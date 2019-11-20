export function deleteStateFromLocalStorage()
{
    try{
        const initState = {
            email: 'Unknown User',
            isAuth : null,
            fname: 'UnKnownThisTime'
        }
        localStorage.setItem('state', initState);
        console.log('deleteLocalStorage Attempted');

    }
    catch(e)
    {
        console.log('Error: During Delete Local Storage', e);
        }
}