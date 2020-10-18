import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Auth0Provider } from "@auth0/auth0-react";

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-xts3qmn8.auth0.com"
        clientId="PjI5KZlLRSqn1grxAk0kUkiWBHx2j3DL"
        redirectUri="https://realtimerps.com"
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
