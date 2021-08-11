import React, { Component } from 'react'
import './Home.css'
import firebaseConf from '../../Firebase'
import ReactToPrint from 'react-to-print'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.handleChangef = this.handleChangef.bind(this)
    this.handleChangeh = this.handleChangeh.bind(this)
    this.handleDayChange = this.handleDayChange.bind(this)
    this.state = {
      form: [],
      alert: false,
      alertData: {},
      nombre: '',
      apellidop: '',
      apellidom: ' ',
      fecha: '',
      hora: '',
      folio: ' ',
      sede: '',
      isHidden: true,
      lista: [
        {
          id: 1,
          name: 'preuba',
          done: false
        }
      ],
      selectedDay: undefined
    }
  }

  handleDayChange(day) {
    this.setState({ selectedDay: day })
  }

  handleChangef (e) {
    this.setState({ fecha: e.target.value })
  }

 handleChangeh (e) {
    this.setState({ hora: e.target.value })
  }

  resetForm () {
    this.refs.contactForm.reset()
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  componentDidMount () {
    const itemsRef = firebaseConf.database().ref('agenda-cita/')
    this.listenForItems(itemsRef)
    var wishRef = firebaseConf.database().ref('folio/acb123')
    wishRef.on('value', (snapshot) => {
      let updatedWish = snapshot.val()
      this.setState({
        folio: updatedWish.folio
      })
      wishRef.set(updatedWish)
    })
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = []
      snap.forEach((child) => {
        lista.push({
          fecha: child.val().fecha,
          hora: child.val().hora
        })
      })
      this.setState({
        lista: lista
      })
    })
  }

  incrementFolio = () => {
    const wishRef = firebaseConf.database().ref('folio/acb123')
    wishRef.once('value').then(snapshot => {
      let updatedWish = snapshot.val()
      this.setState({
        folio: updatedWish.folio
      })
      updatedWish.folio = updatedWish.folio + 1
      wishRef.set(updatedWish)
    })
  }

  sendMessage (e) {
    e.preventDefault()
    const params = {
      nombre: this.inputNombre.value,
      apellidop: this.inputApellidop.value,
      apellidom: this.inputApellidom.value ? this.inputApellidom.value : ' ',
      email: this.inputEmail.value,
      telefono: this.inputTelefono.value,
      municipio: this.inputMunicipio.value,
      sede: this.inputSede.value,
      fecha: this.state.fecha,
      hora: this.inputHora.value,
      status: this.inputStatus.value,
      folio: this.inputFolio.value ? this.inputFolio.value : this.state.folio
    }
    this.setState({
      nombre: this.inputNombre.value,
      apellidop: this.inputApellidop.value,
      apellidom: this.inputApellidom.value,
      fecha: '',
      hora: this.inputHora.value,
      sede: this.inputSede.value,
      folio: this.inputFolio.value
    })
    if (params.nombre && params.apellidop && params.apellidom && params.email &&
      params.telefono && params.municipio && params.sede && params.fecha &&
      params.hora && params.status && params.folio) {
      firebaseConf.database().ref('agenda-cita/').push(params).then(() => {
        alert('Tu solicitud fue enviada.')
      }).catch(() => {
        alert('Tu solicitud no puede ser enviada')
      })
      this.toggleHidden()
      this.incrementFolio()
      this.resetForm()
    } else {
      alert('Por favor llene el formulario')
    }
  }

  render () {
    const dato = this.state.lista
    const fecha = this.state.fecha
    const hora = this.state.hora
    var indice2 = []
    dato.map(item =>
      item.hora === hora && item.fecha === fecha &&
        indice2.push(item)
    )

    let dis
    for (var i = 0; i < dato.length; i++) {
      if (indice2.length >= 3) {
        dis = <p>Se acabaron las citas para estos parametros</p>
      } else {
        dis = <button type='submit' className='boton-color2'>Confirmar</button>
      }
    }

    var f = new Date(this.state.fecha)
    var today = new Date()
    var meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    today = f.getDate() + 1 + '-' + meses[f.getMonth()] + '-' + f.getFullYear()

    const { selectedDay } = this.state
    console.log(selectedDay)
    var newDate = new Date(selectedDay)
    var Dates = new Date()
    Dates = newDate.getFullYear() + '-' + newDate.getMonth() + '-' + newDate.getDate()
    this.state.fecha = Dates

    return (
      <div style={{ width: '100%', justifyContent: 'center', display: 'flex', zIndex: '100', paddingTop: '100px' }}>
        <div style={{width: '65%'}}>
          <div style={{width: '100%', marginBottom: '100px'}}>
            <h1 className='back-title'>Agenda tu cita para el tramite de constancia de no antecedentes penales</h1>
            <div className='row2'>
              <div className='text2'>
                <form onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
                  <div className='form-group-r'>
                    <div className='modal-name'>
                      <label>Nombre:</label>
                      <input
                        type='text'
                        className='form-control-r'
                        id='nombre'
                        required
                        ref={nombre => this.inputNombre = nombre} />
                    </div>
                  </div>
                  <div className='card-container-r2'>
                    <div className='porcent-r'>
                      <label>Apellido Paterno:</label>
                      <input
                        type='text'
                        className='cell-r'
                        id='apellidop'
                        required
                        ref={apellidop => this.inputApellidop = apellidop} />
                    </div>
                    <div className='porcent-r2'>
                      <label>Apellido Materno:</label>
                      <input
                        type='text'
                        className='cell-r'
                        id='apellidom'
                        ref={apellidom => this.inputApellidom = apellidom} />
                    </div>
                  </div>
                  <div className='card-container-r2'>
                    <div className='porcent-r'>
                      <label>Email:</label>
                      <input
                        type='text'
                        className='cell-r'
                        id='email'
                        ref={email => this.inputEmail = email} />
                    </div>
                    <div className='porcent-r2'>
                      <label>Telefono:</label>
                      <input
                        style={{ textTransform: 'uppercase' }}
                        type='text'
                        className='cell-r'
                        id='telefono'
                        maxLength={13}
                        ref={telefono => this.inputTelefono = telefono} />
                    </div>
                  </div>
                  <div className='card-container-r2'>
                    <div className='porcent-r'>
                      <label>Municipio de procedencia:</label>
                      <select className='form-control-r' ref={municipio => this.inputMunicipio = municipio}>
                        <option id='municipio' required>Pachuca de Soto</option>
                        <option id='municipio' required>Acatlán</option>
                        <option id='municipio' required>Acaxochitlán</option>
                        <option id='municipio' required>Actopan</option>
                        <option id='municipio' required>Agua Blanca</option>
                        <option id='municipio' required>Ajacuba</option>
                        <option id='municipio' required>Alfajayucan</option>
                        <option id='municipio' required>Almoloya</option>
                        <option id='municipio' required>Apan</option>
                        <option id='municipio' required>Atitalaquia</option>
                        <option id='municipio' required>Atlapexco</option>
                        <option id='municipio' required>Atotonilco de Tula</option>
                        <option id='municipio' required>Atotonilco el Grande</option>
                        <option id='municipio' required>Calnali</option>
                        <option id='municipio' required>Cardonal</option>
                        <option id='municipio' required>Chapantongo</option>
                        <option id='municipio' required>Chapulhuacán</option>
                        <option id='municipio' required>Chilcuautla</option>
                        <option id='municipio' required>Cuautepec de Hinojosa</option>
                        <option id='municipio' required>El Arenal</option>
                        <option id='municipio' required>Eloxochitlan</option>
                        <option id='municipio' required>Emiliano Zapata</option>
                        <option id='municipio' required>Epazoyucan</option>
                        <option id='municipio' required>Francisco I. Madero</option>
                        <option id='municipio' required>Huasca de Ocampo</option>
                        <option id='municipio' required>Huautlthisa</option>
                        <option id='municipio' required>Huazalingo</option>
                        <option id='municipio' required>Huehuetla</option>
                        <option id='municipio' required>Huejutla de Reyes</option>
                        <option id='municipio' required>Huichapan</option>
                        <option id='municipio' required>Ixmiquilpan</option>
                        <option id='municipio' required>Jacala de Ledezma</option>
                        <option id='municipio' required>Jaltocán</option>
                        <option id='municipio' required>Juárez Hidalgo</option>
                        <option id='municipio' required>La Misión</option>
                        <option id='municipio' required>Lolotla</option>
                        <option id='municipio' required>Metepec</option>
                        <option id='municipio' required>Metztitlán</option>
                        <option id='municipio' required>Mineral de la Reforma</option>
                        <option id='municipio' required>Mineral del Chico</option>
                        <option id='municipio' required>Mineral del Monte</option>
                        <option id='municipio' required>Mixquiahuala de Juárez</option>
                        <option id='municipio' required>Molango</option>
                        <option id='municipio' required>Nicolás Flores</option>
                        <option id='municipio' required>Nopala de Villagrán</option>
                        <option id='municipio' required>Omitlán de Juárez</option>
                        <option id='municipio' required>Pacula</option>
                        <option id='municipio' required>Pisaflores</option>
                        <option id='municipio' required>Progreso de Obregón</option>
                        <option id='municipio' required>San Agustín Metzquititlán</option>
                        <option id='municipio' required>San Agustín Tlaxiaca</option>
                        <option id='municipio' required>San Bartolo Tutotepec</option>
                        <option id='municipio' required>San Felipe Orizatlán</option>
                        <option id='municipio' required>San Salvador</option>
                        <option id='municipio' required>Santiago de Anaya</option>
                        <option id='municipio' required>Santiago Tulantepec de Lugo Guerrero</option>
                        <option id='municipio' required>Singuilucan</option>
                        <option id='municipio' required>Tasquillo</option>
                        <option id='municipio' required>Tecozautla</option>
                        <option id='municipio' required>Tenango de Doria</option>
                        <option id='municipio' required>Tepeapulco</option>
                        <option id='municipio' required>Tepehuacán de Guerrero</option>
                        <option id='municipio' required>Tepeji del Río de Ocampo</option>
                        <option id='municipio' required>Tepetitlán</option>
                        <option id='municipio' required>Tetepango</option>
                        <option id='municipio' required>Tezontepec de Aldama</option>
                        <option id='municipio' required>Tianguistengo</option>
                        <option id='municipio' required>Tizayuca</option>
                        <option id='municipio' required>Tlahuelilpan</option>
                        <option id='municipio' required>Tlahuiltepa</option>
                        <option id='municipio' required>Tlanalapa</option>
                        <option id='municipio' required>Tlanchinol</option>
                        <option id='municipio' required>Tlaxcoapan</option>
                        <option id='municipio' required>Tolcayuca</option>
                        <option id='municipio' required>Tula de Allende</option>
                        <option id='municipio' required>Tulancingo de Bravo</option>
                        <option id='municipio' required>Villa de Tezontepec</option>
                        <option id='municipio' required>Xochiatipan</option>
                        <option id='municipio' required>Xochicoatlán</option>
                        <option id='municipio' required>Yahualica</option>
                        <option id='municipio' required>Zacualtipán de Ángeles</option>
                        <option id='municipio' required>Zapotlán de Juárez</option>
                        <option id='municipio' required>Zempoala</option>
                        <option id='municipio' required>Zimapán</option>
                      </select>
                    </div>
                    <div className='porcent-r2'>
                      <label>Lugar a donde realizara el tramite:</label>
                      <select className='form-control-r' ref={sede => this.inputSede = sede}>
                        <option id='sede'>Pachuca de Soto</option>
                        <option id='sede'>Huejutla</option>
                        <option id='sede'>Tulancingo</option>
                        <option id='sede'>Tizayuca</option>
                        <option id='sede'>Tula de Allende</option>
                        <option id='sede'>Tizayuca</option>
                        <option id='sede'>Ixmiquilpan</option>
                      </select>
                    </div>
                  </div>

                  <div className='card-container-r2'>
                    <div className='porcent-r'>
                      <label>Fecha de la cita:</label>
                        <DayPickerInput
                          onDayChange={this.handleDayChange}
                          dayPickerProps={{
                            modifiers: {
                              disabled: [
                                {
                                  daysOfWeek: [0, 6]
                                },
                                {
                                  before: new Date(2018, 7, 8)
                                }
                              ]
                            }
                          }}
                      />
                    </div>
                    <div className='porcent-r2'>
                      <label>Hora de la cita:</label>
                      <select
                        className='form-control-r'
                        onChange={this.handleChangeh}
                        ref={hora => this.inputHora = hora}
                      >
                        <option id='hora'></option>
                        <option id='hora'>8:30</option>
                        <option id='hora'>8:45</option>
                        <option id='hora'>9:00</option>
                        <option id='hora'>9:15</option>
                        <option id='hora'>9:30</option>
                        <option id='hora'>9:45</option>
                        <option id='hora'>10:00</option>
                        <option id='hora'>10:15</option>
                        <option id='hora'>10:30</option>
                        <option id='hora'>10:45</option>
                        <option id='hora'>11:00</option>
                        <option id='hora'>11:15</option>
                        <option id='hora'>11:30</option>
                        <option id='hora'>11:45</option>
                        <option id='hora'>12:00</option>
                        <option id='hora'>12:15</option>
                        <option id='hora'>12:30</option>
                        <option id='hora'>12:45</option>
                        <option id='hora'>13:00</option>
                        <option id='hora'>13:15</option>
                        <option id='hora'>13:30</option>
                        <option id='hora'>13:45</option>
                        <option id='hora'>14:00</option>
                        <option id='hora'>14:15</option>
                        <option id='hora'>14:30</option>
                        <option id='hora'>14:45</option>
                        <option id='hora'>15:00</option>
                        <option id='hora'>15:15</option>
                        <option id='hora'>15:30</option>
                        <option id='hora'>15:45</option>
                        <option id='hora'>16:00</option>
                        <option id='hora'>16:15</option>
                        <option id='hora'>16:30</option>
                      </select>
                    </div>
                  </div>
                  <div className='form-group-r'>
                    <div className='modal-name'>
                      <label>Folio de Pago:</label>
                      <input
                        type='text'
                        className='form-control-r'
                        id='folio'
                        ref={folio => this.inputFolio = folio} />
                    </div>
                  </div>
                  <div className='form-group-r hidden'>
                    <div className='modal-name'>
                      <input
                        type='text'
                        className='form-control-r'
                        id='status'
                        value='en espera'
                        ref={status => this.inputStatus = status} />
                    </div>
                  </div>
                  <div className='presentation-cta'>
                    {dis}
                  </div>
                  {!this.state.isHidden && <ReactToPrint
                    trigger={() => <button>Imprimir ticket</button>}
                    content={() => this.componentRef}
                    onAfterPrint={this.toggleHidden.bind(this)}
                  />}
                  <div className='print-source' style={{padding: '20px'}} ref={el => (this.componentRef = el)}>
                    <div className='row-ti'>
                      <img src={'https://seeklogo.com/images/G/gobierno-del-estado-de-hidalgo-logo-83001C1D96-seeklogo.com.png'} alt='' className='img-cc'/>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className='column-t'>
                          <p className='name-size'>Folio</p>
                          <p className='name-size2'>DGSP-CNAP-{this.state.folio}-21</p>
                        </div>
                        <div className='column-t'>
                          <p className='name-size'>Cita</p>
                          <p className='name-size2'>{today}, {this.state.hora}</p>
                        </div>
                      </div>
                    </div>
                    <div className='column-t row-ti'>
                      <div className='column-t'>
                        <p className='name-size'>Nombre</p>
                        <p className='name-size2'>{this.state.nombre} {this.state.apellidop}</p>
                      </div>
                      <div className='column-t'>
                        <p className='name-size'>Ubicación</p>
                        <p className='name-size2'>Pachuca de Soto</p>
                      </div>
                      <div className='column-t'>
                        <p className='name-size'>Observaciones</p>
                        <p className='name-size3'>
                          Le recordamos que en el caso de pagar en BBVA y Santander el pago tardara en
                          reflejarse en un tiempo de 48 horas aproximadamente.
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
