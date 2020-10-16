import React, { Component } from 'react'
import { Route } from 'react-router'
import { Home } from './screens/Home'
import { Login } from './screens/Login'
import { Registration } from './screens/Registration'
import { Dashboard } from './screens/Dashboard'
import { Transactions } from './screens/Transactions'
import { Jars } from './screens/Jars'
import { ShoppingList } from './screens/ShoppingList'
import { EditCategories } from './screens/EditCategories'
import { Reports } from './screens/Reports'
import { EditProfile } from './screens/EditProfile'

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/registration' component={Registration} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/transactions' component={Transactions} />
        <Route exact path='/jars' component={Jars} />
        <Route exact path='/shopinglist' component={ShoppingList} />
        <Route exact path='/editCategories' component={EditCategories} />
        <Route exact path='/reports' component={Reports} />
        <Route exact path='/editProfile' component={EditProfile} />
      </div>
    )
  }
}
