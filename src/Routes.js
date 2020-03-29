import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HomeP from './components/home/HomeP';
import HomeH from './components/home/HomeH';
import HomeG from './components/home/vip/HomeG';
import TablaPachuca from "./components/tables/pachuca/TablaPachuca";
import Filter from "./components/tables/pachuca/Filter";
import TablaHuejutla from "./components/tables/huejutla/TablaHuejutla";
import LoginContainerP from "./components/login/loginpachuca/LoginContainer";
import LoginContainerH from "./components/login/loginhuejutla/LoginContainer";

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomeP}/>
    <Route exact path="/HomeHuejutla" component={HomeH}/>
    <Route exact path="/HomeGobierno" component={HomeG}/>
    <Route exact path="/CitasPachuca" component={TablaPachuca} />
    <Route exact path="/Filter" component={Filter} />
    <Route exact path="/CitasHuejutla" component={TablaHuejutla} />
    <Route exact path="/LoginPachuca" component={LoginContainerP} />
    <Route exact path="/LoginHuejutla" component={LoginContainerH} />
  </Switch>
);
