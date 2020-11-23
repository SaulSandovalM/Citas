import React, { Component } from 'react'
import '../Tables.css'
import firebaseConf from '../../../Firebase'

export default class Filter extends Component {
  constructor () {
    super()
    this.state = {
      agendaCita: []
    }
  }

  componentWillMount () {
    firebaseConf.database().ref('agenda-cita/tizayuca').on('child_added', snapshot => {
      this.setState({
        agendaCita: this.state.agendaCita.concat(snapshot.val())
      })
    })
  }

  updateSearch (event) {
    this.setState({ search: event.target.value.substr(0, 20) })
  }

  render () {
    const filterData = this.state.agendaCita.filter(
      (agendaCita) => {
        return agendaCita.nombre.indexOf(this.state.search) !== -1
      }
    )

    return (
      <div className='app-f'>
        <div className='app-f'>
          <h1>Citas</h1>
          <input value={this.state.search} onChange={this.updateSearch.bind(this)} />
          <div className='products-al'>
            <div className='col-table2'><b>Nombre</b></div>
            <div className='col-table2'><b>Correo</b></div>
            <div className='col-table2'><b>RFC</b></div>
            <div className='col-table2'><b>Municipio</b></div>
            <div className='col-table2'><b>Fecha/Hora</b></div>
            <div className='col-table2'><b>Estatus</b></div>
          </div>
          {
            filterData.map(agendaCita => (
              <div className='products-al'>
                <div className='col-table2'>{agendaCita.nombre} {agendaCita.apellidop} {agendaCita.apellidom}</div>
                <div className='col-table2'>{agendaCita.email}</div>
                <div className='col-table2'>{agendaCita.rfc}</div>
                <div className='col-table2'>{agendaCita.municipio}</div>
                <div className='col-table2'>{agendaCita.fecha} / {agendaCita.hora}</div>
                <div className='col-table2'>{agendaCita.status}</div>
              </div>
            )).reverse()
          }
        </div>
      </div>
    )
  }
}
