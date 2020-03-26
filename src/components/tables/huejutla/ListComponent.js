import React, { Component } from 'react';
import '../Tables.css';
import RowComponent from './RowComponent';

class ListComponent extends Component {
  render() {
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
