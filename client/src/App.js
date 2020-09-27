import React from 'react';
import { Switch, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Home from './routes/home';
import Login from './routes/login';
import Logout from './routes/logout';
import Room from './routes/room';

function App() {
  return (
    <main>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/login' component={Login} />
        <Route path='/logout' component={Logout} />
        <Route path='/room' component={Room} />
        <Route component={Error} />
      </Switch>
    </main>

  );
}

export default App;
