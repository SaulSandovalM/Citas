import React, { Component } from 'react'
import '../Tables.css'
import firebaseConf from '../../../Firebase'
import ListComponent from './ListComponent'

export default class TablePachuca extends Component {
  constructor () {
    super()
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth()+1
    var yyyy = today.getFullYear()
    if (dd < 10) {
      dd = '0' + dd
    }
    if(mm < 10){
      mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd
    this.state = {
      nuevo: '',
      lista: [
        {
          id: 1,
          name: 'preuba',
          done: false
        }
      ],
      fecha: today,
      nombre: ''
    }
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = []
      snap.forEach((child) => {
        lista.push({
          nombre: child.val().nombre,
          apellidop: child.val().apellidop,
          apellidom: child.val().apellidom,
          email: child.val().email,
          telefono: child.val().telefono,
          municipio: child.val().municipio,
          sede: child.val().sede,
          fecha: child.val().fecha,
          hora: child.val().hora,
          status: child.val().status,
          folio: child.val().folio,
          id: child.key
        })
      })
      this.setState({
        lista: lista
      })
    })
  }

  componentDidMount () {
    const itemsRef = firebaseConf.database().ref('agenda-cita/').orderByChild('hora')
    this.listenForItems(itemsRef)
  }

  update = (item) => {
    let updates = {}
    updates['agenda-cita/' + item.id] = {
      status: 'Atendido',
      nombre: item.nombre,
      apellidop: item.apellidop,
      apellidom: item.apellidom,
      email: item.email,
      telefono: item.telefono,
      municipio: item.municipio,
      sede: item.sede,
      fecha: item.fecha,
      hora: item.hora,
      folio: item.folio,
    }
    firebaseConf.database().ref().update(updates)
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  render () {
    return (
      <div className='App'>
        <div style={{ display: 'flex' }}>
          <div>
            <p style={{ marginTop: '50px' }}>Selecciona una fecha</p>
            <input
              type='date'
              className='form-control-r'
              id='fecha'
              name='fecha'
              value={this.state.fecha}
              onChange={this.onChange}
              required
            />
          </div>
          <div style={{ marginLeft: '30px', width: '250px' }}>
            <p style={{ marginTop: '50px' }}>Nombre</p>
            <input
              type='text'
              className='form-control-r'
              id='nombre'
              name='nombre'
              value={this.state.nombre}
              onChange={this.onChange}
              required
            />
          </div>
          <div style={{ marginLeft: '30px', width: '250px' }}>
            <p style={{ marginTop: '50px' }}>Apellido P</p>
            <input
              type='text'
              className='form-control-r'
              id='apellidop'
              name='apellidop'
              value={this.state.apellidop}
              onChange={this.onChange}
              required
            />
          </div>
          <div style={{ marginLeft: '30px', width: '250px' }}>
            <p style={{ marginTop: '50px' }}>Apellido M</p>
            <input
              type='text'
              className='form-control-r'
              id='apellidom'
              name='apellidom'
              value={this.state.apellidom}
              onChange={this.onChange}
              required
            />
          </div>
        </div>
        <ListComponent
          lista={this.state.lista}
          update={this.update}
          fecha={this.state.fecha}
          nombre={this.state.nombre}
          apellidop={this.state.apellidop}
          apellidom={this.state.apellidom}
        />
      </div>
    )
  }
}
