import React, { Component } from 'react';
import '../Tables.css';

class RowComponent extends Component {
  constructor(props){
     super(props);
     this.state = {
       done: false,
       item: 'Atendido'
     };
   }

   update = () => {
     this.props.update(this.props.item);
   }

  render() {
    return (
      <div className="products-al">
        <div className="data-table">{this.props.item.nombre} {this.props.item.apellidop} {this.props.item.apellidom}</div>
        <div className="data-table">{this.props.item.email}</div>
        <div className="data-table">{this.props.item.rfc}</div>
        <div className="data-table">{this.props.item.municipio}</div>
        <div className="data-table">{this.props.item.fecha} / {this.props.item.hora}</div>
        <div className="data-table">
          {this.props.item.status}
          <button onClick={this.update}>Atendido</button>
        </div>
      </div>
    );
  }
}

export default RowComponent;
