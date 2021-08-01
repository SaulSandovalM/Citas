import React, { Component } from 'react'
import '../Tables.css'
import firebaseConf from '../../../Firebase'

export default class RowComponent extends Component {
  constructor (props) {
    super(props)
    var user = firebaseConf.auth().currentUser
    var email
    if (user != null) {
      email = user.email
    }
    let admin
    if (email === ' ixmiquilpan@procuraduria.com') {
      admin = 'Ixmiquilpan'
    } else if (email === 'tula@procuraduria.com') {
      admin = 'Tula'
    } else if (email === 'tulancingo@procuraduria.com') {
      admin = 'Tulancingo'
    } else if (email === 'tizayuca@procuraduria.com') {
      admin = 'Tizayuca'
    } else if (email === 'pachuca@procuraduria.com') {
      admin = 'Pachuca'
    } else if (email === 'huejutla@procuraduria.com') {
      admin = 'Huejutla'
    }
    this.state = {
      done: false,
      item: 'Atendido',
      sedeu: admin
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
    if (mm < 10) {
      mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd
    const fechaC = this.props.item.fecha
    const sedeC = this.props.item.sede
    console.log(this.state.sedeu)

    let table
    if ((fechaC === this.props.fecha && this.props.item.status === 'en espera' && sedeC === this.state.sedeu ) ||
      (this.props.nombre === this.props.item.nombre && this.props.apellidop === this.props.item.apellidop && this.props.apellidom === this.props.item.apellidom)) {
      table =
        <div className='products-al'>
          <div className='data-table'>{this.props.item.nombre} {this.props.item.apellidop} {this.props.item.apellidom}</div>
          <div className='data-table'>{this.props.item.email}</div>
          <div className='data-table'>{this.props.item.folio}</div>
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
