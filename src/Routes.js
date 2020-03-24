import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HomeP from './components/home/HomeP';
import HomeH from './components/home/HomeH';
import Tablas from './components/tables/Tables';
import TablaPachuca from "./components/tables/pachuca/TablaPachuca";
import TablaHuejutla from "./components/tables/huejutla/TablaHuejutla";
import LoginContainerP from "./components/login/loginpachuca/LoginContainer";
import LoginContainerH from "./components/login/loginhuejutla/LoginContainer";

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={Tablas}/>
    <Route exact path="/HomePachuca" component={HomeP}/>
    <Route exact path="/HomeHuejutla" component={HomeH}/>
    <Route exact path="/CitasPachuca" component={TablaPachuca} />
    <Route exact path="/CitasHuejutla" component={TablaHuejutla} />
    <Route exact path="/LoginPachuca" component={LoginContainerP} />
    <Route exact path="/LoginHuejutla" component={LoginContainerH} />
  </Switch>
);
