import React from 'react';
import { AuthContext } from '../Main/ProvedorAutenticacao';
import NavbarItem from './NavbarItem';

class Menu extends React.Component {



  state = {
    abrirMenu: false,
  };

  state = {
    abrirMenu: false
  };



  abrirMenu = () => {

    this.setState(state => {
      return {
        abrirMenu: !state.abrirMenu
      };
    });
  };


  handleClickOutside = event => {

    this.setState({
      abrirMenu: false
    });

  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      return
    }
    this.handleClickOutside()
  }

  encerrarSessao = () => {
    console.log("encerrando a esssao")
    this.context.encerrarSessao()
  }
  render() {




    return (
      <div ref={node => this.node = node}>
        <nav className="navbar navbar-expand-lg navbar-dark form-navbar "
        // style = {{backgroundColor: '#8DB1CD'}}
        >
          <a className="navbar-brand" href="#">GEST DOCAS</a>
          <button onClick={this.abrirMenu} className={this.state.abrirMenu ? "navbar-toggler" : "navbar-toggler collapsed"} type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation" >

            <span className="navbar-toggler-icon" />
          </button>
          <div className={this.state.abrirMenu ? "navbar-collapse collapse show" : "navbar-collapse collapse"} id="navbarColor01" >
            <ul className="navbar-nav mr-auto">

              <NavbarItem onClick={this.abrirMenu} render={!this.context.isAuthenticated}
                role={true} href="#/home" label="HOME" />

              <NavbarItem onClick={this.abrirMenu} render={this.context.isAuthenticated}
                role={this.context.autorizado == 1 || this.context.autorizado == 11 ? true : false} href="#/reservas" label="RESERVAS" />

              <NavbarItem onClick={this.abrirMenu} render={this.context.isAuthenticated}
                role={this.context.autorizado == 1 ? true : false} href="#/atendimento" label="ATENDIMENTO" />




              <NavbarItem onClick={this.abrirMenu} render={this.context.isAuthenticated}
                role={this.context.autorizado == 5 ? true : false} href="#/cadastro-atendente1" label="CADASTRO DO ATENDENTE RESPONSÁVEL" />

              <NavbarItem onClick={this.abrirMenu} render={this.context.isAuthenticated}
                role={this.context.autorizado == 5 ? true : false} href="#/cadastro-atendente2" label="CADASTRO DOS ATENDENTES DA FILIAL" />

              <NavbarItem onClick={this.abrirMenu} render={this.context.isAuthenticated}
                role={this.context.autorizado == 5 ? true : false} href="#/cadastro-atendente" label="CADASTRO DOS ATENDENTES DAS DOCAS" />

              <NavbarItem onClick={this.abrirMenu} render={this.context.isAuthenticated}
                role={this.context.autorizado == 5 ? true : false} href="#/lista-atendentes" label="PAINEL GERAL DAS UNIDADES" />

              <NavbarItem onClick={this.abrirMenu} render={this.context.isAuthenticated}
                role={this.context.autorizado == 5 ? true : false} href="#/editar-sala" label="EDITAR DOCAS" />

              {/* <NavbarItem onClick={this.abrirMenu} render={this.context.isAuthenticated}
                role={this.context.autorizado == 5 ? true : false} href="#/atendimento-gestor" label="ATENDIMENTO SALAS" /> */}


              <NavbarItem onClick={this.abrirMenu} render={!this.context.isAuthenticated}
                role={true} href="#/login" label="LOGIN" />

              <NavbarItem onClick={this.abrirMenu} render={this.context.isAuthenticated}
                role={this.context.autorizado == 10 ? true : false} href="#/lista-admin" label="ADMINISTADORES" />

              <NavbarItem onClick={this.abrirMenu} render={this.context.isAuthenticated}
                role={this.context.autorizado == 10 ? true : false} href="#/lista-clientes" label="LISTA DE CLIENTES" />



              <NavbarItem onClick={this.abrirMenu} render={this.context.isAuthenticated}
                role={this.context.autorizado == 11 ? true : false} href="#/atendimento-doca" label="ATENDIMENTO" />



              <NavbarItem onClick={this.abrirMenu} render={this.context.isAuthenticated}
                role={this.context.autorizado == 10 ? true : false} href="#/cadastro-cliente" label="CADASTRAR CLIENTE" />


              <NavbarItem onClick={this.abrirMenu} render={this.context.isAuthenticated}
                role={this.context.autorizado == 10 ? true : false} href="#/adicionar-sala" label="CADASTRO DE UNIDADES" />


              {/* <NavbarItem onClick={this.abrirMenu} render={this.context.isAuthenticated}
                role={this.context.autorizado == 1 ? true : false} href="#/modal" label="MODAL" /> */}

              <NavbarItem onClick={this.abrirMenu} render={this.context.isAuthenticated}
                role={this.context.autorizado == 1 ? true : false} href="#/parametros-sala" label="CONFIGURAÇÕES" />




              <NavbarItem onClick={this.encerrarSessao} render={this.context.isAuthenticated}
                role={true} href="#/login" label="LOGOUT" />
            </ul>

          </div>
        </nav>
      </div>
    )

  }
}

Menu.contextType = AuthContext;

export default Menu;

