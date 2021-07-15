import React from 'react';
import axios from 'axios';
import { AuthContext } from '../Main/ProvedorAutenticacao';
import { Redirect } from 'react-router';

class Login extends React.Component {

    state = { usuario: null, senha: null }

    imprimirValores = () => {
        console.log("Nome do usuário: ", this.state.usuario)
        console.log("Senha do usuário: ", this.state.senha)


    }

 

    consultarAutorizacoes = (id) => {
        console.log("entoru consultar autorizaçoes")
    
        fetch(`https://banco-gestao.herokuapp.com/login/${id}?username=${id}`)
          .then(res => res.json())
          .then(
            (result) => { 
            if (id == 'doca_1' || id == 'doca_2' || id == 'doca_3' || id == 'doca_4' || id == 'doca_5' ){
      
                { this.context.defineUser(11) }
          
                { this.context.pegarAutorizacoes(11) }
                localStorage.setItem('app-token-admin', 11)
            } else {
                         
              console.log("resultado", result)
              { this.context.defineUser(result.id) }
              console.log("resultado do id", result.id)
              console.log("result aprovado", result.aprovado)
              { this.context.pegarAutorizacoes(result.aprovado) }
              localStorage.setItem('app-token-admin', result.aprovado)
    
              // this.setState({
              //   user: result.id
    
              // });
              console.log("Nome do usuário: ", this.state.usuario)
              console.log("Senha do usuário: ", this.state.senha)
            }
            }
    

          )

        axios.get(`https://banco-gestao.herokuapp.com/sala-do-atendente/${id}`).then(response => {
           
             
            localStorage.setItem('app-token-sala', response.data.nomeSala)


            console.log("Valor do nome da sala" , )


        }).catch(erroResposta => {
           console.log("deu erro")
    
        })
    
      }


autenticar = () => {
    axios.post('https://banco-gestao.herokuapp.com/authenticate', {
        username: this.state.usuario,
        senha: this.state.senha



    }).then(response => {
         this.consultarAutorizacoes(this.state.usuario)
        console.log("token", response.data.token)
        localStorage.setItem('app-token', response.data.token)
        localStorage.setItem('app-id', this.state.usuario)
        this.context.iniciarSessao()

        this.setState({
            redirect: true
          })

    }).catch(erroResposta => {
        this.setState({
            erro: erroResposta.response.data.error
        })


    })

}

handleUsuario = (e) => {
    this.setState({ usuario: e.target.value })

}

handleSenha = (e) => {
    this.setState({ senha: e.target.value })

}
  
foiEnter = (e) =>{
    if (e.key == 'Enter') {
       this.autenticar()
        }
  }

render() {


    if (this.state.redirect) {
        return <Redirect to="/home" />
  
  
      } else {
  
  



    return (

        // 
        <div className="intro"
            style={{

                // border: '1px solid yellow'
            }}
        >


            <div className="jumbotron caixa-login" style={{
                // backgroundColor: '#E6EBFE',
                padding: '1rem 1rem', marginRight: '25%', marginLeft: '25%', marginTop: '0%', marginBottom: '5%'
            }} >
                <h4 style={{
                    color: '#19296B',
                    textAlign: 'center'
                }}>Acesso restrito</h4>
                <p className="lead"></p>
                <hr className="my-2" />
                <div
                // style = {{paddingLeft: '5%', paddingRight: '5%'}}
                >
                    <div className="form-group">
                        <label style={{ fontWeight: 'bold', color: '#19296B', fontSize: '20px', }} htmlFor="exampleInputEmail1"> <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg> Usuário</label>
                        <input onKeyPress={(e) => this.foiEnter(e)}  onChange={(e) => { this.handleUsuario(e) }} style={{
                            fontSize: '80px',
                            borderRadius: '20px',
                            //   ,border: '1px solid black'
                        }} type="email" className="form-control form-usuario" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />
                    </div>

                    <div className="form-group">
                        <label style={{ fontWeight: 'bold', color: '#19296B', fontSize: '20px' }} htmlFor="exampleInputPassword1">
                            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-key" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
                                <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                            </svg> Senha</label>
                        <input  onKeyPress={(e) => this.foiEnter(e)}  onChange={(e) => { this.handleSenha(e) }} style={{
                            borderRadius: '20px'
                            //   , border: '1px solid black'
                        }} type="password" className="form-control form-usuario" id="exampleInputPassword1" placeholder="" />

                    </div>
                </div>


                {this.state.erro ?
                    <div className="alert alert-dismissible alert-danger">
                        <button type="button" className="close" data-dismiss="alert">×</button>
                        {this.state.erro}
                    </div> : false}


                <p className="lead fundo-centralizado">

                    <button onClick={this.autenticar} style={{
                        fontWeight: 'bold',
                        color: '#19296B',
                        backgroundColor: '#9599a8', borderRadius: '10px', fontSize: '18px', width: '100%', marginTop: '6%'
                    }} type="submit" className="btn btn-primary">Entrar
              </button>
                </p>

            </div>

        </div>

    )
                }

}
}

Login.contextType = AuthContext;

export default Login;

