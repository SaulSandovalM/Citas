import React, { Component } from 'react'
import '../Tables.css'
import RowComponent from './RowComponent'
import firebaseConf from '../../../Firebase'
import { Link } from 'react-router-dom'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      agendaCita: []
    }
  }

  componentWillMount () {
    firebaseConf.database().ref('agenda-cita/').on('child_added', snapshot => {
      this.setState({
        agendaCita: this.state.agendaCita.concat(snapshot.val())
      })
    })
  }

  render () {
    return (
      <div className='App'>
        <h1>Citas</h1>
        <div className='row-cit'>
          <Link to='/Home' className='nolink'>
            <p>Agendar Cita</p>
          </Link>
        </div>
        <div className='products-al'>
          <div className='col-table'>Nombre</div>
          <div className='col-table'>Correo</div>
          <div className='col-table'>Folio</div>
          <div className='col-table'>Municipio</div>
          <div className='col-table'>Fecha/Hora</div>
          <div className='col-table'>Estatus</div>
          <div className='col-table'>Actualizar</div>
        </div>
        {
          this.props.lista.map(item =>
            <RowComponent
              key={item.id}
              item={item}
              update={this.props.update}
              fecha={this.props.fecha}
              nombre={this.props.nombre}
              apellidop={this.props.apellidop}
              apellidom={this.props.apellidom}
            />
          )
        }
      </div>
    )
  }
}
