import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App from '../src/components/App/App';
import './index.css';
import combinedReducer from './reducers/combinedReducer';
import * as serviceWorker from './serviceWorker';

function saveToLocalStorage(state)
{
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    }
    catch(e)
    {
        console.log(e);
    }
}

function loadFromLocalStorage(){
    try
    {
        const serializedState = localStorage.getItem('state');
        if (serializedState == null)
        {
            return undefined;
        }
        return JSON.parse(serializedState);
    }
    catch(e)
    {
        console.log(e);
        return undefined;
    }
}

//console.log(React.version);
const persistedState = loadFromLocalStorage();

export let store = createStore(combinedReducer,persistedState, applyMiddleware(thunk));

// console.log(store.getState());

store.subscribe( () => { saveToLocalStorage(store.getState())});

ReactDOM.render(
    <Provider store={store}><App/></Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
