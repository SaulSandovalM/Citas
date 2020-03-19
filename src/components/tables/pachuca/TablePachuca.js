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
          <div className="products-al">
            <div style={{width: '16.6%', height: '40px', color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontWeight: 'bold'}}>Nombre</div>
            <div style={{width: '16.6%', height: '40px', color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontWeight: 'bold'}}>Correo</div>
            <div style={{width: '16.6%', height: '40px', color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontWeight: 'bold'}}>RFC</div>
            <div style={{width: '16.6%', height: '40px', color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontWeight: 'bold'}}>Municipio</div>
            <div style={{width: '16.6%', height: '40px', color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontWeight: 'bold'}}>Colonia</div>
            <div style={{width: '16.6%', height: '40px', color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontWeight: 'bold'}}>Fecha/Hora</div>
          </div>
        {
          this.state.agendaCita.map(agendaCita => (
            <div className="products-al">
              <div style={{width: '16.6%', height: '40px', color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>{agendaCita.nombre} {agendaCita.apellidop} {agendaCita.apellidom}</div>
              <div style={{width: '16.6%', height: '40px', color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>{agendaCita.email}</div>
              <div style={{width: '16.6%', height: '40px', color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>{agendaCita.rfc}</div>
              <div style={{width: '16.6%', height: '40px', color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>{agendaCita.municipio}</div>
              <div style={{width: '16.6%', height: '40px', color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>{agendaCita.colonia}</div>
              <div style={{width: '16.6%', height: '40px', color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>{agendaCita.hora} - {agendaCita.fecha}</div>
            </div>
          )).reverse()
        }
      </div>
    );
  }
}

export default TablePachuca;
