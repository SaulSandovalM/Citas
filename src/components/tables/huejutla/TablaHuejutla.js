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
    firebaseConf.database().ref('agenda-cita/huejutla').on('child_added', snapshot => {
      this.setState({
        agendaCita: this.state.agendaCita.concat(snapshot.val())
      });
    });
  }

  borrar = (agendaCita) => {
    firebaseConf.database().ref().child('/agenda-cita/')
        .set({ status: "New title"});
  }

//  update = (data) {
  //  firebaseConf.database().ref('agenda-cita').update(
    //  {
      //  status: 'atendido',
      //},
    //);
  //}

  updateSearch(event) {
    this.setState({search: event.target.value.substr(0,20)});
  }

  render() {

    let filterData = this.state.agendaCita.filter(
      (agendaCita) => {
        return agendaCita.hora.indexOf(this.state.search) !== -1;
      }
    );

    return (
      <div className="App" style={{height: '100vh'}}>
        <h1>Citas</h1>
        <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
          <div className="products-al">
            <div className="col-table">Nombre</div>
            <div className="col-table">Correo</div>
            <div className="col-table">RFC</div>
            <div className="col-table">Municipio</div>
            <div className="col-table">Fecha/Hora</div>
            <div className="col-table">Estatus</div>
          </div>
        {
          filterData.map(agendaCita => (
            <div className="products-al">
              <div className="data-table">{agendaCita.nombre} {agendaCita.apellidop} {agendaCita.apellidom}</div>
              <div className="data-table">{agendaCita.email}</div>
              <div className="data-table">{agendaCita.rfc}</div>
              <div className="data-table">{agendaCita.municipio}</div>
              <div className="data-table">{agendaCita.fecha} - {agendaCita.hora}</div>
              <div className="data-table">
                {agendaCita.status}
                <button style={{background: 'grey', color: 'white'}} borrar={this.borrar}>Atendido</button>
              </div>
            </div>
          )).reverse()
        }
      </div>
    );
  }
}

export default TablePachuca;
