import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRouteI = ({
  component: Component,
  isAuthenticated,
  isVerifying,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isVerifying ? (
        <div />
      ) : isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/LoginIxmiquilpan',
            state: { from: props.location }
          }}
        />)}
  />
)

export default ProtectedRouteI
