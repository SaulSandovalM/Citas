import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/home/Home';
import TablePachuca from "./components/tables/pachuca/TablePachuca";

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/TablePachuca" component={TablePachuca} />
  </Switch>
);
