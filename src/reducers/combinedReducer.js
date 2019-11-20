import authReducer from './authReducer';
import bloodRequest from './bloodrequest';
import { combineReducers } from 'redux';

const combinedReducer = combineReducers({
    auth: authReducer,
    bloodreq: bloodRequest
});

export default combinedReducer