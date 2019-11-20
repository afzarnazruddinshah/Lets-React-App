export function addBloodRequest(props)
{
    return {
        type: 'addReq',
        payload: {
            ptntname: props.ptntname,
            ptntage: props.ptntage,
            ptntgender: props.ptntgender,
            reqreason: props.reqreason,
            ptntblgrp: props.ptntblgrp,
            unitsreq: props.unitsreq,
            dateofreq: props.dateofreq,
            hospname: props.hospname,
            hosploc: props.hosploc,
            attendeename: props.attendeename,
            cntctno1: props.cntctno1,
            cntctno2: props.cntctno2
        }
    }
}
export function removeBloodRequest()
{
    return {
        type: 'removeReq',
        payload: {
            null: null
        }
    }
}