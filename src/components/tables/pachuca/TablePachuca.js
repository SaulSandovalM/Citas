import React, { Component } from 'react';
import '../Tables.css';
import firebaseConf from '../../../Firebase';

class TablePachuca extends Component {
  constructor () {
    super();
    this.state = {
      user: null,
      agendaCita: [],
    };
  }
  
  componentWillMount () {
    firebaseConf.database().ref('agenda-cita').on('child_added', snapshot => {
      this.setState({
        agendaCita: this.state.agendaCita.concat(snapshot.val())
      });
    });
  }

  borrar = (agendaCita) => {
    firebaseConf.database().ref().update('agenda-cita');
  }

  render() {
    return (
      <div className="App">
        <h1>Citas</h1>
        {
          this.state.agendaCita.map(agendaCita => (
            <div className="products-al">
              <div style={{width: '25%', height: '40px', color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>Nombre: {agendaCita.nombre} {agendaCita.apellidop} {agendaCita.apellidom}</div>
              <div style={{width: '25%', height: '40px', color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>Email: {agendaCita.email}</div>
              <div style={{width: '25%', height: '40px', color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>Fecha: {agendaCita.fecha}</div>
              <div style={{width: '25%', height: '40px', color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>Hora: {agendaCita.hora}</div>
            </div>
          )).reverse()
        }
      </div>
    );
  }
}

export default TablePachuca;
