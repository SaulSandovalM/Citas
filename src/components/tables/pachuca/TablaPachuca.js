import React, { Component } from 'react';
import '../Tables.css';
import firebaseConf from '../../../Firebase';

class TablePachuca extends Component {
  constructor () {
    super();
    this.state = {
      agendaCita: [],
    };
  }

  componentWillMount () {
    firebaseConf.database().ref('agenda-cita/pachuca').on('child_added', snapshot => {
      this.setState({
        agendaCita: this.state.agendaCita.concat(snapshot.val())
      });
    });
  }

  update() {
    //var currentUser = firebaseConf.auth().key;
    //firebaseConf.database().ref("agenda-cita/pachuca/" + currentUser).update({ status: "Perro"});


    //firebaseConf.database().ref('agenda-cita/pachuca/').on('child_added', snapshot => {
      //firebaseConf.database().ref('agenda-cita/pachuca/'+snapshot.key).update({status: 'No Atendido'});
    //});

    const deedRef = firebaseConf.database().ref('agenda-cita/pachuca/');
    deedRef.limitToLast(2).once("value", (snapshot) => {
        snapshot.forEach((deedSnapshot) =>{
             deedSnapshot.ref.update({ status: "Perro"});
        })
    })
  }

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
                <button style={{background: 'grey', color: 'white'}} onClick={this.update}>Atendido</button>
              </div>
            </div>
          )).reverse()
        }
      </div>
    );
  }
}

export default TablePachuca;
