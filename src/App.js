import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import ProtectedRouteP from './ProtectedRouteP'
import ProtectedRouteH from './ProtectedRouteH'
import ProtectedRouteI from './ProtectedRouteI'
import ProtectedRouteTiza from './ProtectedRouteTiza'
import ProtectedRouteTula from './ProtectedRouteTula'
import ProtectedRouteTulan from './ProtectedRouteTulan'
import Login from './components/login/loginpachuca/Login'
import LoginHuejutla from './components/login/loginhuejutla/LoginHuejutla'
import LoginIxmiquilpan from './components/login/loginixmiquilpan/LoginIxmiquilpan'
import LoginTizayuca from './components/login/logintizayuca/LoginTizayuca'
import LoginTula from './components/login/logintula/LoginTula'
import LoginTulancingo from './components/login/logintulancingo/LoginTulancingo'
import Home from './components/home/Home'
import TablaPachuca from './components/tables/pachuca/TablaPachuca'
import FilterPachuca from './components/tables/pachuca/Filter'
import TablaHuejutla from './components/tables/huejutla/TablaHuejutla'
import FilterHuejutla from './components/tables/huejutla/Filter'
import TablaIxmiquilpan from './components/tables/ixmiquilpan/TablaIxmiquilpan'
import FilterIxmiquilpan from './components/tables/ixmiquilpan/Filter'
import TablaTizayuca from './components/tables/tizayuca/TablaTizayuca'
import FilterTizayuca from './components/tables/tizayuca/Filter'
import TablaTula from './components/tables/tula/TablaTula'
import FilterTula from './components/tables/tula/Filter'
import TablaTulancingo from './components/tables/tulancingo/TablaTulancingo'
import FilterTulancingo from './components/tables/tulancingo/Filter'

function App (props) {
  const { isAuthenticated, isVerifying } = props
  return (
    <Switch>
      <Route path='/Login' component={Login} />
      <Route path='/LoginHuejutla' component={LoginHuejutla} />
      <Route path='/LoginIxmiquilpan' component={LoginIxmiquilpan} />
      <Route path='/LoginTizayuca' component={LoginTizayuca} />
      <Route path='/LoginTula' component={LoginTula} />
      <Route path='/LoginTulancingo' component={LoginTulancingo} />
      <ProtectedRouteP
        exact
        path='/CitasPachuca'
        component={TablaPachuca}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRouteP
        exact
        path='/FiltroPachuca'
        component={FilterPachuca}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRouteH
        exact
        path='/CitasHuejutla'
        component={TablaHuejutla}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRouteH
        exact
        path='/FiltroHuejutla'
        component={FilterHuejutla}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRouteI
        exact
        path='/CitasIxmiquilpan'
        component={TablaIxmiquilpan}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRouteI
        exact
        path='/FiltroIxmiquilpan'
        component={FilterIxmiquilpan}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRouteTiza
        exact
        path='/CitasTizayuca'
        component={TablaTizayuca}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRouteTiza
        exact
        path='/FiltroTizayuca'
        component={FilterTizayuca}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRouteTula
        exact
        path='/CitasTula'
        component={TablaTula}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRouteTula
        exact
        path='/FiltroTula'
        component={FilterTula}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRouteTulan
        exact
        path='/CitasTulancingo'
        component={TablaTulancingo}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRouteTulan
        exact
        path='/FiltroTulancingo'
        component={FilterTulancingo}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path='/' component={Home} />
    </Switch>
  )
}
function mapStateToProps (state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  }
}

export default connect(mapStateToProps)(App)
