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
          colonia: child.val().colonia,
          email: child.val().email,
          fecha: child.val().fecha,
          hora: child.val().hora,
          municipio: child.val().municipio,
          rfc: child.val().rfc,
          status: child.val().status,
          done: child.val().done,
          sede: child.val().sede,
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
      colonia: item.colonia,
      email: item.email,
      fecha: item.fecha,
      hora: item.hora,
      municipio: item.municipio,
      rfc: item.rfc,
      sede: item.sede,
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
        <div>
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
          <div>
            <p style={{ marginTop: '50px' }}>Nombre a buscar</p>
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
        </div>
        <ListComponent
          lista={this.state.lista}
          update={this.update}
          fecha={this.state.fecha}
          nombre={this.state.nombre}
        />
      </div>
    )
  }
}
