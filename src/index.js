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

import './index.css';
import App from './App';

const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com'
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache
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
