import React, { Component } from 'react';
import './App.css';
import firebaseConf from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: [],
      alert: false,
      alertData: {},
    };
  }

  showAlert(type, message) {
    this.setState({
      alert: true,
      alertData: {type, message}
    });
    setTimeout(() => {
      this.setState({alert: false});
    }, 4000);
  }

  resetForm() {
    this.refs.contactForm.reset();
  }

  componentWillMount() {
    let formRef = firebaseConf
      .database()
      .ref('inscription-animation')
      .orderByKey()
      .limitToLast(6);
    formRef.on('child_added', snapshot => {
      const {name, ine, photo, age} = snapshot.val();
      const data = {name, ine, photo, age};
      this.setState({form: [data].concat(this.state.form)});
    });
  }

  sendMessage(e) {
    e.preventDefault();
    const params = {
      name: this.inputName.value,
      ine: this.inputEmail.value,
      photo: this.inputPhone.value,
      age: this.inputAge.value
    };
    if (params.name && params.ine && params.photo && params.age) {
      firebaseConf.database().ref('agenda-cita').push(params).then(() => {
        this.showAlert('success', 'Tu solicitud fue enviada');
      }).catch(() => {
        this.showAlert('danger', 'Tu solicitud no puede ser enviada');
      });
      this.resetForm();
    } else {
      this.showAlert('warning', 'Por favor llene el formulario');
    };
  }

  render() {
    return (
      <div style={{width: '100%', justifyContent: 'center', display: 'flex'}}>
      <div style={{width: '65%'}}>
        {/*<div className="container-r">
          <div className="content-r">
            <div className="card-r">
              <div className="space-r">

                <div className="w-r2">
                  <div className="title-r">
                    Agenda tu cita
                  </div>
                  <form onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
                    <div className="form-group-r">
                      <div>
                        <div className="modal-name">
                          <input
                            type='text'
                            className="form-control-r"
                            id='name'
                            placeholder='Nombre Completo'
                            ref={name => this.inputName = name} />
                        </div>
                      </div>
                    </div>
                    <div className="form-group-r">
                      <input
                        className="form-control-r"
                        id='ine'
                        placeholder='Indetificación Oficial'
                        ref={ine => this.inputEmail = ine} />
                    </div>
                    <div className="card-container-r2">
                      <div className='porcent-r'>
                        <input
                          className="cell-r"
                          id='photo'
                          placeholder='Curp'
                          ref={photo => this.inputPhone = photo} />
                      </div>
                      <div className='porcent-r2'>
                        <input
                          type='number'
                          className="cell-r"
                          id='age' placeholder='Edad'
                          ref={age => this.inputAge = age} />
                      </div>
                    </div>
                    <div className="ul-size2">
                      Debes descargar el recibo de pago (F7) de la pagina oficial de gobierno del estado de hidalgo.
                    </div>
                    <div className="presentation-cta">
                      <button type='submit' className="boton-color2">Confirmar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>*/}
        <h1 className="back-title">Agenda tu Cita para Expedición de Constancia de NO Antecedentes Penales</h1>
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
              9. Recibo de pago (formato F-7)
            </p>
          </div>
          <div className="text">
            
          </div>
        </div>













      </div>
      </div>
    );
  }
}

export default App;
