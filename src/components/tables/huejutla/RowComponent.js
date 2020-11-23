import React, { Component } from 'react'
import '../Tables.css'

export default class RowComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      item: 'Atendido'
    }
  }

   update = () => {
     this.props.update(this.props.item)
   }

  render () {
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
    var d = new Date()
    var n = d.getHours()
    const fechaC = this.props.item.fecha
    const horaC = this.props.item.hora
    const sedeC = this.props.item.sede
    var trans = parseInt(horaC)
    let table
    if (fechaC === today && trans === n && sedeC === 'Huejutla') {
      table =
        <div className='products-al'>
          <div className='data-table'>{this.props.item.nombre} {this.props.item.apellidop} {this.props.item.apellidom}</div>
          <div className='data-table'>{this.props.item.email}</div>
          <div className='data-table'>{this.props.item.rfc}</div>
          <div className='data-table'>{this.props.item.municipio}</div>
          <div className='data-table'>{this.props.item.fecha} / {this.props.item.hora}</div>
          <div className='data-table'>{this.props.item.status}</div>
          <div className='data-table'><button onClick={this.update}>Atendido</button></div>
        </div>
    }
    return (
      <div>
        {table}
      </div>
    )
  }
}
