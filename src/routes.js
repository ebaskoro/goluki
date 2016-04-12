/**
 * routes.js
 *
 */

import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/homePage';
import Login from './components/loginPage';
import Register from './components/register/registerPage';
import Verify from './components/verify/verifyPage';
import Orders from './components/orders/orderPage';

export default (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route path="register" component={Register} />
      <Route path="verify" component={Verify} />
      <Route path="orders" component={Orders} />
    </Route>
  </Router>
);
