import React from 'react';

const Login = (props) => {
  console.log(props.usuario);
  return (
    <div style={{display: 'flex', justifyContent: 'center', width: '40%'}}>
    <div className="login">
      <h2>Inicia Sesión</h2>
      <form
        style={{display: 'flex', flexDirection: 'column'}}
        onSubmit={props.onSubmit}>
        <input
          style={{margin: '10px 30px 0px 30px', height: '30px'}}
          name="email"
          required
          floatingLabelText="Email"
          value={props.usuario.email}
          onChange={props.onChange}
          type="email"
          fullWidth={true}
        />
        <input
          style={{margin: '30px 30px 0px 30px', height: '30px'}}
          name="password"
          required
          floatingLabelText="Contraseña"
          value={props.usuario.password}
          onChange={props.onChange}
          type="password"
          fullWidth={true}
        />
        <div className="cta2">
          <button className="boton2-l" type="submit" primary={true} fullWidth={true}>Entrar</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;
