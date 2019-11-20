
const initState = {
    ptntname: '',
    ptntage: null,
    ptntgender: '',
    reqreason: '',
    ptntblgrp: '',
    unitsreq: null,
    dateofreq: '',
    hospname: '',
    hosploc: '',
    attendeename: '',
    cntctno1: '',
    cntctno2: ''
}

const bloodRequest = (state=initState, action) =>
{
    if(action.type === 'addReq')
    {
        return action.payload;
    }

    if(action.type === 'removeReq')
    {
        return action.payload;
    }

    return state;
}

export default bloodRequest

