//! It is import that we use a single library to manage state: this is because we want a single source of truth to manage the unidirectional flow of data
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
//? Apollo is used by the client to query data from the database (graphQL) 
import {ApolloProvider} from 'react-apollo'; //* Similar to Redux provider and React-Provider
import {createHttpLink} from 'apollo-link-http';
import {ApolloClient, gql} from 'apollo-boost'; //* This library  provides functions which make it easy tp use apollo
import {InMemoryCache} from 'apollo-cache-inmemory'; //* Similar to redux persist or see it as a local storage for the application

import { store, persistor } from './redux/store';
import {resolvers, typeDefs} from './gql/resolver';

import './index.css';
import App from './App';

const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com'
});

const cache = new InMemoryCache();

//!Note that these object keys of the ApolloClient hace specific names 
//# https://www.apollographql.com/docs/react/api/apollo-client/#gatsby-focus-wrapper

const client = new ApolloClient({
  link: httpLink,
  cache,
  resolvers,
  typeDefs
})

client.query({
  query: gql`
  {
    getCollectionsByTitle(title: "hats"){
    title
      id
      items{
        name
        id
        imageUrl
        price
      }
    }
  }
  `
}).then(res => console.log(`res: ${res}`))

//! We want to instantiate some local value for our state e.g. cartHidden here
//? This sis done in the index.js because when the app initiates, we want to immediately write this data to the local storage. 
//* Local States are changed using mutations
//# We Have to create a folder that holds the code for these mutations 

client.writeData({
  data: {
    cartHidden: true, //* This is now a local state
    cartItems: [] //* This is similar to what we had for the reducer
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
