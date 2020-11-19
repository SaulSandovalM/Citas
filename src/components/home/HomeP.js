import React, { Component } from 'react'
import './Home.css'
import firebaseConf from '../../Firebase'
import ReactToPrint from 'react-to-print'

export default class HomeP extends Component {
  constructor (props) {
    super(props)
    this.handleChangef = this.handleChangef.bind(this)
    this.handleChangeh = this.handleChangeh.bind(this)
    this.state = {
      form: [],
      alert: false,
      alertData: {},
      nombre: '',
      apellidop: '',
      apellidom: '',
      fecha: '',
      hora: '',
      folio: '',
      sede: '',
      isHidden: true,
      lista: [
        {
          id: 1,
          name: 'preuba',
          done: false
        }
      ]
    }
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
    const itemsRef = firebaseConf.database().ref('agenda-cita/pachuca')
    this.listenForItems(itemsRef)
  }

  componentWillMount () {
    const formRef = firebaseConf.database().ref('agenda-cita').orderByKey().limitToLast(6)
    formRef.on('child_added', snapshot => {
      const { nombre, apellidop, apellidom, municipio, colonia, fecha, hora, status, email, rfc, folio, sede } = snapshot.val()
      const data = { nombre, apellidop, apellidom, municipio, colonia, fecha, hora, status, email, rfc, folio, sede }
      this.setState({ form: [data].concat(this.state.form) })
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

  sendMessage (e) {
    e.preventDefault()
    const params = {
      nombre: this.inputNombre.value,
      apellidop: this.inputApellidop.value,
      apellidom: this.inputApellidom.value,
      municipio: this.inputMunicipio.value,
      colonia: this.inputColonia.value,
      fecha: this.inputFecha.value,
      hora: this.inputHora.value,
      email: this.inputEmail.value,
      rfc: this.inputRfc.value,
      status: this.inputStatus.value,
      sede: this.inputSede.value
    }
    this.setState({
      nombre: this.inputNombre.value,
      apellidop: this.inputApellidop.value,
      apellidom: this.inputApellidom.value,
      fecha: this.inputFecha.value,
      hora: this.inputHora.value,
      sede: this.inputSede.value,
    })
    if (params.nombre && params.apellidop && params.apellidom && params.municipio && params.email && params.sede
      && params.colonia && params.fecha && params.hora && params.status && params.rfc) {
      firebaseConf.database().ref('agenda-cita/pachuca').push(params).then(() => {
        alert('Tu solicitud fue enviada, no olvides realizar tu pago antes de ir a tu cita.')
      }).catch(() => {
        alert('Tu solicitud no puede ser enviada')
      })
      this.resetForm()
      this.toggleHidden()
    } else {
      alert('Por favor llene el formulario')
    }
  }

  render () {
    const dato = this.state.lista
    const fecha = this.state.fecha
    const hora = this.state.hora
    var indices = []
    let dis
    for (var i = 0; i < dato.length; i++) {
      if (dato[i].hora === hora && fecha === dato[i].fecha && indices.push(i) === 10) {
        dis = <p>Se acabaron las citas para estos parametros</p>
      } else {
        dis = <button type='submit' className='boton-color2'>Confirmar</button>
      }
    }

    return (
      <div style={{ width: '100%', justifyContent: 'center', display: 'flex', zIndex: '100', paddingTop: '100px' }}>
        <div style={{width: '65%'}}>
          <h1 className='back-title'>Expedición de Constancia de NO Antecedentes Penales</h1>
          <div className='row'>
            <div className='text'>
              <h5 className='title-r'>Requisitos</h5>
              <p className='size'>
                Si Usted Radica en México.
                <br></br><br></br>
                1.- Recibo de pago (formato F-7)
                <br></br>
                2.- Una Copia de constancia de la  Clave Única de Registro de Población (CURP) actualizada (código QR)
                <br></br>
                3.- Una Copia de Identificación Oficial (INE)
                <br></br>
                4.- Una Fotografía a color tamaño pasaporte fondo blanco.
                <br></br>
                5. Recibo de pago (formato F-7) <a href='https://ruts.hidalgo.gob.mx/tramite/572'>Desacargar formato de pago</a>
                <br></br><br></br>
                Si Usted radica en el Extranjero
                <br></br><br></br>
                1. Oficio del consulado dirigido a la  Procuraduría General de Justicia del Estado de Hidalgo
                <br></br>
                2. Toma de Huellas por el Consulado
                <br></br>
                3. Copia de identificación oficial (INE, Cartilla, Pasaporte o Matrícula)
                <br></br>
                4. Una Copia de constancia de la  Clave Única de Registro de Población (CURP) actualizada (código QR)
                <br></br>
                5. 2 fotografías tamaño credencial a color de frente
                <br></br>
                6. Comprobante de Domicilio donde radica el interesado
                <br></br>
                7. Carta poder
                <br></br>
                8. Credencial original y copia de la persona que realiza el trámite
                <br></br>
                9. Recibo de pago (formato F-7) <a href='https://ruts.hidalgo.gob.mx/tramite/572'>Desacargar formato de pago</a>
              </p>
            </div>
            <div className='text2-res'>
              <h5 className='title-r'>Ubicación</h5>
              <p className='size'>Servicios Periciales Pachuca</p>
              <p className='size'><i>Impulsor Sector Primario 202, Plaza las Torres, 42082 Pachuca de Soto, Hgo.</i></p>
              <a href='https://www.google.com.mx/maps/place/Servicios+Periciales/@20.0645574,-98.7844438,18z/data=!4m5!3m4!1s0x0:0x3c9746ad18bdeb6d!8m2!3d20.065287!4d-98.7853584'>Abrir ubicación Google Maps</a>
              <p className='size'>Servicios Periciales Huejutla</p>
              <p className='size'><i>Olimpia, 43000 Huejutla, Hgo.</i></p>
              <a href='https://www.google.com.mx/maps/place/Agencia+del+Ministerio+Publico/@21.1496548,-98.4171,18z/data=!4m8!1m2!2m1!1sAgencia+de+Ministerio+P%C3%BAblico!3m4!1s0x85d727a12b89e037:0xb4b27e217d3f0a5e!8m2!3d21.1495294!4d-98.4171117'>Abrir ubicación Google Maps</a>
              <h5 className='title-r'>Informes</h5>
              <p className='size'>Para más información favor de llamar al numero: <br></br>+52 (771) 71 79000 Ext. 9217</p>
            </div>
          </div>
          <div style={{width: '100%', marginBottom: '100px'}}>
            <h1 className='back-title'>Agenda tu Cita</h1>
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
                        required
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
                      <label>RFC:</label>
                      <input
                        type='text'
                        className='cell-r'
                        id='rfc'
                        maxLength={13}
                        ref={rfc => this.inputRfc = rfc} />
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
                        <option id='municipio' required>Huautla</option>
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
                      </select>
                    </div>
                  </div>
                  <div className='form-group-r'>
                    <div className='modal-name'>
                      <label>Colonia:</label>
                      <input
                        type='text'
                        className='form-control-r'
                        id='colonia'
                        required
                        ref={colonia => this.inputColonia = colonia} />
                    </div>
                  </div>
                  <div className='card-container-r2'>
                    <div className='porcent-r'>
                      <label>Fecha de la cita:</label>
                      <input
                        type='date'
                        className='cell-r'
                        id='fecha'
                        required
                        onChange={this.handleChangef}
                        ref={fecha => this.inputFecha = fecha} />
                    </div>
                    <div className='porcent-r2'>
                      <label>Hora de la cita:</label>
                      <select
                        className='form-control-r'
                        onChange={this.handleChangeh}
                        ref={hora => this.inputHora = hora}
                      >
                        <option id='hora'></option>
                        <option id='hora'>8:00</option>
                        <option id='hora'>9:00</option>
                        <option id='hora'>10:00</option>
                        <option id='hora'>11:00</option>
                        <option id='hora'>12:00</option>
                        <option id='hora'>13:00</option>
                        <option id='hora'>14:00</option>
                        <option id='hora'>15:00</option>
                        <option id='hora'>16:00</option>
                        <option id='hora'>17:00</option>
                      </select>
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
                  <div className='form-group-r hidden'>
                    <div className='modal-name'>
                      <input
                        type='numeric'
                        className='form-control-r'
                        id='folio'
                        ref={folio => this.inputFolio = folio} />
                    </div>
                  </div>
                  <div className='presentation-cta'>
                    {dis}
                  </div>
                  {!this.state.isHidden && <ReactToPrint
                    trigger={() => <button>Imprimie aqui tu Ticket</button>}
                    content={() => this.componentRef}
                    onAfterPrint={this.toggleHidden.bind(this)}
                  />}
                  <div className='print-source' style={{padding: '20px'}} ref={el => (this.componentRef = el)}>
                    <div className='row-ti'>
                      <img src={'https://seeklogo.com/images/G/gobierno-del-estado-de-hidalgo-logo-83001C1D96-seeklogo.com.png'} alt='' className='img-cc'/>
                      <div className='column-t'>
                        <p className='name-size'>Folio de Atención</p>
                        <p className='name-size'>Cita</p>
                        <p className='name-size2'>{this.state.fecha}, {this.state.hora}</p>
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
