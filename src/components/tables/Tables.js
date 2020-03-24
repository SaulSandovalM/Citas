import React, { Component, useState } from 'react';
import './Tables.css';
import {Link} from 'react-router-dom';

class Tablas extends Component {
  render() {
    return (
      <div className="options-sede" style={{paddingTop: '100px'}}>
        <h1 className="back-title" style={{width: '100%', textAlign: 'center'}}>
          Seleccione el municipio a donde realizara el tramite de su Constancia de NO Antecedentes Penales
        </h1>
        <br></br>
        <div style={{width: '100%', justifyContent: 'center', display: 'flex'}}>
          <div style={{justifyContent: 'center', display: 'flex', zIndex: '999', position: 'absolute', alignItems: 'center'}}>
            <img src={'https://upload.wikimedia.org/wikipedia/commons/4/4e/Escudo_de_Armas_Oficial_del_Estado_de_Hidalgo.png'} style={{width: '300px'}}/>
          </div>
        </div>
        <div className="row-options">
          <Link to="/HomePachuca" className="pachuca">
            <div style={{flexDirection: 'row', display: 'flex', height: '100%', width: '100%', justifyContent: 'space-between'}}>
              <h1 className="text-pt">
                Servicios Periciales <br></br> Pachuca
              </h1>
              {/*<div className="background-service-1"></div>*/}
            </div>
          </Link>
          <Link to="/HomeHuejutla" className="huejutla">
            <div style={{flexDirection: 'row', display: 'flex', height: '100%', width: '100%', justifyContent: 'flex-end'}}>
              {/*<div className="background-service-2"></div>*/}
              <h1 className="text-ht">
                Servicios Periciales <br></br> Huejutla
              </h1>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Tablas;
