import React from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format'
import qs from 'qs'
import { Redirect } from 'react-router';

class CadastroAtendente extends React.Component {

    state = {
        nome: '',
        telefone: '',
        CPF: "",
        endereco: '',
        numero: '',
        CEP: '',
        email: '',
        usuario: "",
        senha: '',
        senhaConfirmacao: '',
        sucesso: false,
        erro: null,
        redirect:false

    }

    componentDidMount() {
        this.setState({
            nome: localStorage.getItem('cliente-nome'),
            telefone: localStorage.getItem('cliente-telefone'),
            CPF: localStorage.getItem('cliente-CPF'),
            endereco: localStorage.getItem('cliente-endereco'),
            numero: localStorage.getItem('cliente-numero'),
            CEP: localStorage.getItem('cliente-CEP'),
            email: localStorage.getItem('cliente-email'),
            usuario: localStorage.getItem('cliente-usuario'),


        })
    }

    cadastrar = () => {
        console.log("chamando a api", this.state.CPF)
        axios.post('https://banco-gestao.herokuapp.com/cliente', {
            username: this.state.usuario,
            nome: this.state.nome,
            telefone: this.state.telefone,
            senha: this.state.senha,
            identificacao: this.state.CPF,
            senhaConfirmacao: this.state.senhaConfirmacao,
            email: this.state.email,
            cep: this.state.CEP,
            endereco: this.state.endereco,
            numero: this.state.numero,
            aprovado: 1



        }).then(response => {
            this.setState({
                sucesso: true
            })
            localStorage.removeItem('cliente-telefone');

            localStorage.removeItem('cliente-telefone');
            localStorage.removeItem('cliente-email');


        }).catch(erroResposta => {
            console.log("estrutura de erro", erroResposta.response.data.error)
            this.setState({
                erro: erroResposta.response.data.error
            })

        })


    }



    handleTelefone = (e) => {
        this.setState({
            telefone: e.target.value
        }, () => {
            localStorage.setItem('cliente-telefone', this.state.telefone)
        })
    }

    handleNome = (e) => {
        this.setState({
            nome: e.target.value
        }, () => {
            localStorage.setItem('cliente-nome', this.state.nome)

        })
    }

    handleCPF = (e) => {

        this.setState({
            CPF: e.target.value
        }, () => {
            localStorage.setItem('cliente-CPF', this.state.CPF)
            console.log("conolaujsdf:", this.state.CPF)
        })
    }

    handleEndereco = (e) => {
        this.setState({
            endereco: e.target.value
        }, () => {
            localStorage.setItem('cliente-endereco', this.state.endereco)
        })
    }

    handleNumero = (e) => {
        this.setState({
            numero: e.target.value
        }, () => {
            localStorage.setItem('cliente-numero', this.state.numero)
        })
    }

    handleCEP = (e) => {
        this.setState({
            CEP: e.target.value
        }, () => {
            localStorage.setItem('cliente-CEP', this.state.CEP)
        })
    }

    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        }, () => {
            localStorage.setItem('cliente-email', this.state.email)
        })
    }

    handleUsuario = (e) => {
        this.setState({
            usuario: e.target.value
        }, () => {
            localStorage.setItem('cliente-usuario', this.state.usuario)
        })
    }

    handleSenha = (e) => {
        this.setState({
            senha: e.target.value
        }, () => {
        })
    }


    handleSenhaConfirmacao = (e) => {
        this.setState({
            senhaConfirmacao: e.target.value
        }, () => {
        })
    }

    handleSucess = () => {
        this.setState({
            sucesso: !this.state.sucesso
        })
    }

    consultarCep = () => {
        console.log("entoru na api")
        axios.get(`https://viacep.com.br/ws/${this.state.CEP}/json/`)
            .then(response => {
                if (!(response.data.erro == true)) {

                    console.log("sucesso", response.data)
                    this.setState({
                        consultaCep: response.data,


                    }, () => {
                        this.setState({
                            endereco: `${this.state.consultaCep.logradouro}, ${this.state.consultaCep.bairro} - ${this.state.consultaCep.localidade} / ${this.state.consultaCep.uf} `





                        }, () => {
                            localStorage.setItem('cliente-endereco', this.state.endereco)


                        })

                    })
                }

            }).catch(erro => {
                console.log(erro)




            })
    }


    enviar = () => {
        
        this.setState({
            nome: '',
            telefone: '',
            CPF: "",
            endereco: '',
            numero: '',
            CEP: '',
            email: '',
            usuario: "",
            senha: '',
            senhaConfirmacao: '',


        })

    }


    render() {


        if (this.state.redirect) {
            return <Redirect to={`/cadastro-sala-atendente/${this.state.usuario}`} />
      
      
          } else {
      
      

        return (
            <div className="col-lg-12 margen-pagina intro" style={{

            }}>

                <p className="estilo-titulo">CADASTRO DE ATENDENTE PARA A FILIAL GUERDAUSJC</p>



                <div className="form-group estilo-formulario" >
                    <label htmlFor="exampleInputNome1">Nome</label>
                    <input value={this.state.nome} onChange={(e) => { this.handleNome(e) }} type="text" className="form-control" id="NomeClienteId" aria-describedby="NomeHelp" placeholder="Digite o Nome" />
                </div>

                <div className="form-group estilo-formulario">
                    <label htmlFor="exampleInputCPF1">CPF</label>
                    <NumberFormat value={this.state.CPF} format="###.###.###-##" onChange={(e) => { this.handleCPF(e) }} type="text" className="form-control" id="CPFClienteId" aria-describedby="CPFHelp" placeholder="Digite o CPF" />
                </div>

                <div className="form-group estilo-formulario">
                    <label htmlFor="exampleInputCEP1">CEP</label>
                    <NumberFormat value={this.state.CEP} format="#####-###" onBlur={this.consultarCep} onChange={(e) => { this.handleCEP(e) }} type="text" className="form-control" id="CEPClienteId" aria-describedby="CEPHelp" placeholder="Digite o CEP" />
                </div>

                <div className="form-group estilo-formulario">
                    <label htmlFor="exampleInputEndere??o1">Endere??o</label>
                    <input value={this.state.endereco} onChange={(e) => { this.handleEndereco(e) }} type="text" className="form-control" id="Endere??oClienteId" aria-describedby="Endere??oHelp" placeholder="Digite o Endere??o" />
                </div>

                <div className="form-group estilo-formulario">
                    <label htmlFor="exampleInputEndere??o1">N??mero</label>
                    <input value={this.state.numero} onChange={(e) => { this.handleNumero(e) }} type="text" className="form-control" id="NumeroClienteId" aria-describedby="NumeroHelp" placeholder="Digite o N??mero" />
                </div>

                <div className="form-group estilo-formulario">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input value={this.state.email} onChange={(e) => { this.handleEmail(e) }} type="text" className="form-control" id="emailClienteId" aria-describedby="emailHelp" placeholder="Digite o email" />
                </div>

                <div className="form-group estilo-formulario">
                    <label htmlFor="exampleInputTelefone1">Telefone</label>
                    <NumberFormat value={this.state.telefone} format="(##) #####-####" onChange={(e) => { this.handleTelefone(e) }} type="text" className="form-control" id="TelefoneClienteId" aria-describedby="TelefoneHelp" placeholder="Digite o Telefone" />
                </div>

                <div className="form-group estilo-formulario">
                    <label htmlFor="exampleInputUsu??rio1">Usu??rio</label>
                    <input value={this.state.usuario} onChange={(e) => { this.handleUsuario(e) }} type="text" className="form-control" id="Usu??rioClienteId" aria-describedby="Usu??rioHelp" placeholder="Digite o Usu??rio" />
                </div>

                <div className="form-group estilo-formulario">
                    <label htmlFor="insirirSenha">Senha</label>
                    <input value={this.state.senha} onChange={(e) => { this.handleSenha(e) }} type="password" className="form-control" id="SenhaClienteId" aria-describedby="inserirSenha" placeholder="Digite a Senha" />
                </div>

                <div className="form-group estilo-formulario" style ={{marginBottom:'5%'}}>
                    <label htmlFor="exampleInputConfirma????odesenha1">Confirma????o de senha</label>
                    <input value={this.state.senhaConfirmacao} onChange={(e) => { this.handleSenhaConfirmacao(e) }} type="password" className="form-control" id="ConfirmacaoDSenhaClienteId" aria-describedby="Confirma????o de senhaHelp" placeholder="Digite a Confirma????o de senha" />
                </div>

                
                {this.state.sucesso ?
                    <div className="alert alert-dismissible alert-success">
                        <button onClick={this.handleSucess} type="button" className="close" data-dismiss="alert">??</button>
                        <strong>Efetuado!</strong> Cliente cadastrado!
               </div> : false}

                {this.state.erro ?
                    <div className="alert alert-dismissible alert-danger">
                        <button type="button" className="close" data-dismiss="alert">??</button>
                        {this.state.erro}
                    </div> : false}

                <button style={{ paddingTop: '3%' }} onClick={this.cadastrar}
                    type="button" className="btn btn-success botao-cadastro fundo-painel"><h5>CADASTRAR</h5></button>

{this.state.sucesso?
<button style={{ paddingTop: '3%' }} onClick={ this.setState({redirect: true})}
                    type="button" className="btn btn-success botao-cadastro fundo-painel"><h5>CADASTRAR DOCA</h5></button>
                    :false}
            </div>
        )


    }
    }

}







export default CadastroAtendente;