import React, { Component } from 'react';
import { Route } from 'react-router';
import { Home } from './screens/Home';
import { Login } from './screens/Login'
import { Registration } from './screens/Registration'
import { Dashboard } from './screens/Dashboard'


export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/registration' component={Registration} />
        <Route exact path='/dashboard' component={Dashboard} />
      </div>
    );
  }
}
