import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRouteTula = ({
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
            pathname: '/LoginTula',
            state: { from: props.location }
          }}
        />)}
  />
)

export default ProtectedRouteTula
