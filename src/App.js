import React from 'react';
import logo from './logo.svg';

import 'bootswatch/dist/lux/bootstrap.css'; // Added this :boom:
import './App.css';
import Rotas from './Main/Rotas'
import Menu from './Components/Menu'

import AuthService from './Service/AuthService';
import ProvedorAutenticacao from './Main/ProvedorAutenticacao';
 
function App() {
  return (
    <div>
      <ProvedorAutenticacao>
        <Menu></Menu>

        <Rotas></Rotas>
      </ProvedorAutenticacao>


    </div>
  );
}

export default App;
