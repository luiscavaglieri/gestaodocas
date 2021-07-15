import React from 'react';
import { Route, Switch, HashRouter  } from 'react-router-dom';

import Atendimento from '../Views/Atendimento'
// import AtendimentoGestor from '../Views/AtendimentoGestor'
import LoginResponsive from '../Views/LoginResponsive'
import Home from '../Views/Home'
import Reservas from '../Views/Reservas'
import CadastroCliente from '../Views/CadastroCliente';
import CadastroSala from '../Views/AdicionarSala';
import CadastroAtendente from '../Views/CadastroAtendente';
import EscolherSalaAtendente from '../Views/EscolherSalaAtendente';
import EditarSala from '../Views/EditarSala';
import AdicionarSala from '../Views/AdicionarSala';
import ListaClientes from '../Views/ListaClientes';
import ListaAdmin from '../Views/ListaAdmin';
import ListaAtendentes from '../Views/ListaAtendentes';
import Timer from '../Views/Timer';
import ParametrosSala from '../Views/ParametrosSala';
import AtendimentoDesktopDocas from '../Views/Docas/AtendimentoDesktopDocas';


// import Modal from '../Views/Modal';




function Rotas() {

    return (
        <HashRouter>
            <Switch>
                <Route path="/atendimento" component={Atendimento} />
                {/* <Route path="/atendimento-gestor" component={AtendimentoGestor} /> */}
                <Route path="/login" component={LoginResponsive} />
                <Route path="/reservas" component={Reservas} />
                <Route exact path="/" component={Home} />
                <Route path="/cadastro-cliente" component={CadastroCliente} />
                <Route path="/cadastro-sala/:id" component={CadastroSala} /> 
                <Route path="/cadastro-atendente" component={CadastroAtendente} />
                <Route path="/cadastro-sala-atendente/:id" component={EscolherSalaAtendente} />
                <Route path="/editar-sala" component={EditarSala} />
                <Route path="/adicionar-sala" component={AdicionarSala} />
                <Route path="/lista-clientes" component={ListaClientes} />
                <Route path="/lista-admin" component={ListaAdmin} />
                <Route path="/timer" component={Timer} />
                <Route path="/atendimento-doca" component={AtendimentoDesktopDocas} />
                <Route path="/lista-atendentes" component={ListaAtendentes} />
                {/* <Route path="/modal" component={Modal} /> */}
                <Route path="/parametros-sala" component={ParametrosSala} />




                
        </Switch>
        </HashRouter>

   )
}

export default Rotas;