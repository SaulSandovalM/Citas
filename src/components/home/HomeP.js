import React, { Component } from 'react';
import './Home.css';
import firebaseConf from '../../Firebase';
import ReactToPrint from 'react-to-print';

class HomeP extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      form: [],
      alert: false,
      alertData: {},
      nombre: '',
      apellidop: '',
      apellidom: '',
      fecha: '',
      hora: '',
      isHidden: true
    };
  }

  handleChange(e) {
    this.setState({fecha: e.target.value});
  }

  showAlert(type, message) {
    this.setState({
      alert: true,
      alertData: {type, message}
    });
    setTimeout(() => {
      this.setState({alert: false});
    }, 6000);
  }

  resetForm() {
    this.refs.contactForm.reset();
  }

  toggleHidden() {
   this.setState({
     isHidden: !this.state.isHidden
   })
 }

  componentWillMount() {
    let formRef = firebaseConf
      .database()
      .ref('agenda-cita/pachuca')
      .orderByKey()
      .limitToLast(6);
    formRef.on('child_added', snapshot => {
      const {nombre, apellidop, apellidom, municipio, colonia, fecha, hora, status, email, rfc} = snapshot.val();
      const data = {nombre, apellidop, apellidom, municipio, colonia, fecha, hora, status, email, rfc};
      this.setState({form: [data].concat(this.state.form)});
    });
  }

  sendMessage(e) {
    e.preventDefault();
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
      status: this.inputStatus.value
    };
    this.setState({
      nombre: this.inputNombre.value,
      apellidop: this.inputApellidop.value,
      apellidom: this.inputApellidom.value,
      fecha: this.inputFecha.value,
      hora: this.inputHora.value,
    })
    if (params.nombre && params.apellidop && params.apellidom && params.municipio && params.email
      && params.colonia && params.fecha && params.hora && params.status && params.rfc) {
      firebaseConf.database().ref('agenda-cita/pachuca').push(params).then(() => {
        this.showAlert('success', 'Tu solicitud fue enviada, no olvides realizar tu pago antes de ir a tu cita.');
      }).catch(() => {
        this.showAlert('danger', 'Tu solicitud no puede ser enviada');
      });
      this.resetForm();
      this.toggleHidden();
    } else {
      this.showAlert('warning', 'Por favor llene el formulario');
    };
  }

  render() {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
     if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }

    today = yyyy + '-' + mm + '-' + dd;

    const fecha = this.state.fecha;
    console.log(fecha)

    var d = new Date();
    var n = d.getHours();
    var tf8 = false;
    var tf9 = false;
    var tf10 = false;
    var tf11 = false;
    var tf12 = false;
    var tf13 = false;
    var tf14 = false;
    var tf15 = false;
    var tf16 = false;
    var tf17 = false;

    if (today && n > 7) {
      tf8 = true;
      console.log('primer if ' + tf8)
      if (fecha && n > 7 && fecha !== today) {
        tf8 = false;
        console.log(tf8)
      }
    }
    if (today && n > 8) {
      tf9 = true;
      console.log('primer if ' + tf9)
      if (fecha && n > 8 && fecha !== today) {
        tf9 = false;
        console.log(tf9)
      }
    }
    if (today && n > 9) {
      tf10 = true;
      console.log('primer if ' + tf10)
      if (fecha && n > 9 && fecha !== today) {
        tf10 = false;
        console.log(tf10)
      }
    }
    if (today && n > 10) {
      tf11 = true;
      console.log('primer if ' + tf11)
      if (fecha && n > 10 && fecha !== today) {
        tf11 = false;
        console.log(tf11)
      }
    }
    if (today && n > 11) {
      tf12 = true;
      console.log('primer if ' + tf12)
      if (fecha && n > 11 && fecha !== today) {
        tf12 = false;
        console.log(tf12)
      }
    }
    if (today && n > 12) {
      tf13 = true;
      console.log('primer if ' + tf13)
      if (fecha && n > 12 && fecha !== today) {
        tf13 = false;
        console.log(tf13)
      }
    }
    if (today && n > 13) {
      tf14 = true;
      console.log('primer if ' + tf14)
      if (fecha && n > 13 && fecha !== today) {
        tf14 = false;
        console.log(tf14)
      }
    }
    if (today && n > 14) {
      tf15 = true;
      console.log('primer if ' + tf15)
      if (fecha && n > 14 && fecha !== today) {
        tf15 = false;
        console.log(tf15)
      }
    }
    if (today && n > 15) {
      tf16 = true;
      console.log('primer if ' + tf16)
      if (fecha && n > 15 && fecha !== today) {
        tf16 = false;
        console.log(tf16)
      }
    }
    if (today && n > 16) {
      tf17 = true;
      console.log('primer if ' + tf17)
      if (fecha && n > 16 && fecha !== today) {
        tf17 = false;
        console.log(tf17)
      }
    }

    return (
      <div style={{width: '100%', justifyContent: 'center', display: 'flex', zIndex: '100', paddingTop: '100px'}}>
        <div style={{justifyContent: 'left', zIndex: '200'}}>
          {this.state.alert && <div className={`alert alert-${this.state.alertData.type}`} role='alert'>
            <div className='container'>
              {this.state.alertData.message}
            </div>
          </div>}
        </div>
        <div style={{width: '65%'}}>
          <h1 className="back-title">Expedición de Constancia de NO Antecedentes Penales</h1>
          <div className="row">
            <div className="text">
              <h5 className="title-r">Requisitos</h5>
              <p className="size">
                Si Usted Radica en México.
                <br></br><br></br>
                1.- Recibo de pago (formato F-7)
                <br></br>
                2.- Una Copia de constancia de la  Clave Única de Registro de Población (CURP) actualizada (código QR)
                <br></br>
                3.- Una Copia de Identificación Oficial (INE)
                <br></br>
                4.- Una Fotografía a color tamaño pasaporte fondo blanco.
                <br></br><br></br>
                Si Usted radica en el Extranjero
                <br></br><br></br>
                1. Oficio del consulado dirigido a la  Procuraduría General de Justicia del Estado de Hidalgo
                <br></br>
                2. Toma de Huellas por el Consulado
                <br></br>
                3. Copia de identificación oficial (INE, Cartilla, Pasaporte o Matricula)
                <br></br>
                4. Una Copia de constancia de la  Clave Única de Registro de Población (CURP) actualizada (código QR)
                <br></br>
                5. 2 fotografías tamaño credencial a color de frente
                <br></br>
                6. Comprobante de Domicilio donde radica el interesado
                <br></br>
                7. Carta poder
                <br></br>
                8. Credencial original y copia de la persona que realiza el tramite
                <br></br>
                9. Recibo de pago (formato F-7) <a href="https://ruts.hidalgo.gob.mx/tramite/572">Desacargar formato de pago</a>
              </p>
            </div>
            <div className="text">
              <h5 className="title-r">Ubicación</h5>
              <p>Servicios Periciales Pachuca</p>
              <a href="https://www.google.com.mx/maps/place/Servicios+Periciales/@20.0645574,-98.7844438,18z/data=!4m5!3m4!1s0x0:0x3c9746ad18bdeb6d!8m2!3d20.065287!4d-98.7853584">Abrir ubicación Google Maps</a>
              <h5 className="title-r">Informes</h5>
              <p>Para mas informacion favor de llamar al numero: <br></br>+52 (771) 71 79000 Ext. 9217</p>
            </div>
          </div>

          <div style={{width: '100%', marginBottom: '100px'}}>
            <h1 className="back-title">Agenda tu Cita</h1>
            <div className="row2">
              <div className="text2">
                <form onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
                  <div className="form-group-r">
                    <div className="modal-name">
                      <input
                        type='text'
                        className="form-control-r"
                        id='nombre'
                        placeholder='Nombre(s)'
                        required
                        ref={nombre => this.inputNombre = nombre} />
                    </div>
                  </div>
                  <div className="card-container-r2">
                    <div className='porcent-r'>
                      <input
                        type='text'
                        className="cell-r"
                        id='apellidop'
                        placeholder='Apellido Paterno'
                        required
                        ref={apellidop => this.inputApellidop = apellidop} />
                    </div>
                    <div className='porcent-r2'>
                      <input
                        type='text'
                        className="cell-r"
                        id='apellidom'
                        placeholder='Apellido Materno'
                        required
                        ref={apellidom => this.inputApellidom = apellidom} />
                    </div>
                  </div>
                  <div className="card-container-r2">
                    <div className='porcent-r'>
                      <input
                        type="text"
                        className="cell-r"
                        id='email'
                        placeholder='Email'
                        ref={email => this.inputEmail = email} />
                    </div>
                    <div className='porcent-r2'>
                      <input
                        type='text'
                        className="cell-r"
                        id='rfc'
                        placeholder='RFC'
                        maxLength={13}
                        ref={rfc => this.inputRfc = rfc} />
                    </div>
                  </div>
                  <div className="form-group-r">
                    <div className="modal-name">
                      <select className="form-control-r" ref={municipio => this.inputMunicipio = municipio}>
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
                  </div>
                  <div className="form-group-r">
                    <div className="modal-name">
                      <input
                        type='text'
                        className="form-control-r"
                        id='colonia'
                        placeholder='Colonia'
                        required
                        ref={colonia => this.inputColonia = colonia} />
                    </div>
                  </div>
                  <div className="card-container-r2">
                    <div className='porcent-r'>
                      <input
                        min={today}
                        max="2020-06-26"
                        type="date"
                        className="cell-r"
                        id='fecha'
                        placeholder='Fecha'
                        required
                        value={fecha}
                        onChange={this.handleChange}
                        ref={fecha => this.inputFecha = fecha} />
                    </div>
                    <div className='porcent-r2'>
                      <select className="form-control-r" ref={hora => this.inputHora = hora}>
                        <option id='hora' disabled={tf8}>8:00</option>
                        <option id='hora' disabled={tf9}>9:00</option>
                        <option id='hora' disabled={tf10}>10:00</option>
                        <option id='hora' disabled={tf11}>11:00</option>
                        <option id='hora' disabled={tf12}>12:00</option>
                        <option id='hora' disabled={tf13}>13:00</option>
                        <option id='hora' disabled={tf14}>14:00</option>
                        <option id='hora' disabled={tf15}>15:00</option>
                        <option id='hora' disabled={tf16}>16:00</option>
                        <option id='hora' disabled={tf17}>17:00</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group-r hidden">
                    <div className="modal-name">
                      <input
                        type='text'
                        className="form-control-r"
                        id='status'
                        value="en espera"
                        ref={status => this.inputStatus = status} />
                    </div>
                  </div>
                  <div className="presentation-cta">
                    <button type='submit' className="boton-color2">Confirmar</button>
                  </div>
                  {!this.state.isHidden && <ReactToPrint
                    trigger={() => <a href="/#">Imprimie aqui tu Ticket</a>}
                    content={() => this.componentRef}
                  />}
                  <div className='print-source' style={{padding: '20px'}} ref={el => (this.componentRef = el)}>
                    <div className="row-ti">
                      <img src={'https://firebasestorage.googleapis.com/v0/b/citas-f171e.appspot.com/o/5e74eab95d5a0_1584720603_5e74eab95d53b%20(1).png?alt=media&token=08fc00ea-9814-4419-a6d0-549e03bbcb00'} alt='' className='img-cc'/>
                      <div className="column-t">
                        <p className="name-size">Cita</p>
                        <p className="name-size2">{this.state.fecha}, {this.state.hora}</p>
                      </div>
                    </div>
                    <div className="column-t row-ti">
                      <div className="column-t">
                        <p className="name-size">Nombre</p>
                        <p className="name-size2">{this.state.nombre} {this.state.apellidop}</p>
                      </div>
                      <div className="column-t">
                        <p className="name-size">Ubicación</p>
                        <p className="name-size2">Pachuca de Soto</p>
                      </div>
                      <div className="column-t">
                        <p className="name-size">Observaciones</p>
                        <p className="name-size3">
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
        <div>

      </div>
      </div>
    );
  }
}

export default HomeP;
