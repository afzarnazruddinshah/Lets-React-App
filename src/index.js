//React neccessities
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
//Redux neccessities
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import combinedReducer from "./reducers/combinedReducer";
//Required
import App from "../src/components/App/App";
import "./index.css";

// GraphQL imports
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const clientQL = new ApolloClient({
  uri: "http://localhost:3002/graphql"
});

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState == null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();
export let store = createStore(
  combinedReducer,
  persistedState,
  applyMiddleware(thunk)
);

store.subscribe( () => {
  saveToLocalStorage(store.getState());
});

ReactDOM.render( 
  <Fragment>
    <Provider  store={store} >
      <ApolloProvider client={clientQL}>
        <App />
      </ApolloProvider>
     </Provider>
  </Fragment>,
  document.getElementById("root")
);