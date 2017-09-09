import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/home';
import NotFound from './components/not-found';

export default () => (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route component={NotFound} status="404"/>
  </Switch>
);
