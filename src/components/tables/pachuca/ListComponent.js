import React, { Component } from 'react';
import '../Tables.css';
import RowComponent from './RowComponent';
import firebaseConf from '../../../Firebase';

class ListComponent extends Component {
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
        <div className="products-al">
          <div className="col-table">Nombre</div>
          <div className="col-table">Correo</div>
          <div className="col-table">RFC</div>
          <div className="col-table">Municipio</div>
          <div className="col-table">Fecha/Hora</div>
          <div className="col-table">Estatus</div>
        </div>
        {
          this.props.lista.map(item =>
            <RowComponent
              key={item.id}
              item={item}
              update={this.props.update}
            />
          )
        }
      </div>
    );
  }
}

export default ListComponent;
