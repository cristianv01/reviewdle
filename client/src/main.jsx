import { StrictMode } from 'react'
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import './styles/index.css'
import App from './components/App.jsx'

const backendUrl = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:4000/'; 

console.log("Using GraphQL Endpoint:", backendUrl); 

const httpLink = createHttpLink({
  uri: backendUrl
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
);
