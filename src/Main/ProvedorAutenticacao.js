import React from 'react';

import AuthService from '../Service/AuthService';
export const AuthContext = React.createContext({});

export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = AuthContext.Provider;


class ProvedorAutenticacao extends React.Component{

    
    state = {
         isAuthenticated: AuthService.isUsuarioAutenticado(),
            user :AuthService.userId(),
    }

    componentDidMount = () => {
        this.iniciarSessao()

    }



     iniciarSessao = () => {
         console.log("BBBBBBBBBBBBBBBB")
        this.setState({ isAuthenticated : AuthService.isUsuarioAutenticado()})
        this.setState({ autorizado : AuthService.isUsuarioAutorizado()})

        this.setState({ user: AuthService.userId()}, () =>{
            console.log("tesmos:", this.state.user.id)
        })
     }

     encerrarSessao = () => {
         console.log("uéeeeeeeeee")
        localStorage.clear();
        this.setState({ isAuthenticated : AuthService.isUsuarioAutenticado()})
    
     }

     pegarAutorizacoes = (id) => {
        console.log("autorizacao")

        if (id == 10){
            console.log("deveria ser um aturorizado")
        this.setState({ autorizado : 10})
         } else if (id == 11) {
            console.log("não deveria ser atuorizado")

        this.setState({ autorizado : 11})
        
        } else if (id == 5) {
            console.log("não deveria ser atuorizado")

        this.setState({ autorizado : 5})
        } else if (id == 1 ){
            console.log("não deveria ser atuorizado 2")

        this.setState({ autorizado : 1})

        }

     }

     defineUser = (e) => {
         
      this.setState({
          user: e
      })

     }



    render(){
        const contexto = {
            iniciarSessao : this.iniciarSessao,
            encerrarSessao : this.encerrarSessao,
            pegarAutorizacoes: this.pegarAutorizacoes,
            defineUser: this.defineUser,
            isAuthenticated : this.state.isAuthenticated,
            autorizado : this.state.autorizado,
            user : this.state.user,

        }
        return (
            <AuthProvider value = {contexto}>
                {this.props.children}
            </AuthProvider>

        )
    }

}

export default ProvedorAutenticacao;