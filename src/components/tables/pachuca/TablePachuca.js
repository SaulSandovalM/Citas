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
            <div className="col-table">Nombre</div>
            <div className="col-table">Correo</div>
            <div className="col-table">RFC</div>
            <div className="col-table">Municipio</div>
            <div className="col-table">Colonia</div>
            <div className="col-table">Fecha/Hora</div>
          </div>
        {
          this.state.agendaCita.map(agendaCita => (
            <div className="products-al">
              <div className="data-table">{agendaCita.nombre} {agendaCita.apellidop} {agendaCita.apellidom}</div>
              <div className="data-table">{agendaCita.email}</div>
              <div className="data-table">{agendaCita.rfc}</div>
              <div className="data-table">{agendaCita.municipio}</div>
              <div className="data-table">{agendaCita.colonia}</div>
              <div className="data-table">{agendaCita.hora} - {agendaCita.fecha}</div>
            </div>
          )).reverse()
        }
      </div>
    );
  }
}

export default TablePachuca;
