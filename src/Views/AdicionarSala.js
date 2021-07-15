import React from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format'
import qs from 'qs'

class AdicionarSala extends React.Component {

    state = {

        usuario: "",
        sucesso: false,
        erro: null,
        painelnomeSala: false,
        clientes: [],
        valueclienteEscolhido: '',
        painelDeEdicao: null

    }

    componentDidMount() {
        const idAtendenteParametro = this.props.match.params.id;


        this.setState({
            idAtendente: idAtendenteParametro,


        }, () => {
            this.atualizar()
        })
    }

    atualizar = () => {
        fetch(`https://banco-gestao.herokuapp.com/cliente`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        clientes: result
                    })
                    console.log("slas do gestor:", this.state.clientes)

                }
            )


    }


    consultarSalasDoCliente = () => {
        fetch(`https://banco-gestao.herokuapp.com/sala/${this.state.clienteEscolhido}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        salasDoCliente: result
                    }, () => {
                        this.setState({
                            painelDeEdicao: true
                        })
                    })
                    console.log("slas do gestor:", this.state.clientes)

                }
            )


    }

    deletar = (idDeletarSala) => {
        axios.post('https://banco-gestao.herokuapp.com/sala/deletar', {
            id: idDeletarSala,



        }).then(response => {

            this.consultarSalasDoCliente()
        }).catch(erroResposta => {
            this.setState({
                erroDelecao: erroResposta.response.data.error
            })

        })
    }


    cadastrar = () => {
        axios.post('https://banco-gestao.herokuapp.com/sala', {
            nomeSala: this.state.nomeSala,
            mensagemBoasVindas: "Padrão",
            mensagemNotificacao: "Padrão",
            username: this.state.clienteEscolhido,
            mensagemOcupacao: "Padrão",
            tempo: 0,
            quantidadeVagas: 0,
            saltoPrioridade: 0,


        }).then(response => {
            this.setState({
                sucessoSala: "Alterado!"
            })
            this.consultarSalasDoCliente()
        }).catch(erroResposta => {
            this.setState({
                erroSala: erroResposta.response.data.error
            })

        })


    }


    handleCliente = (e) => {
        this.setState({
            painelDeEdicao: false,
            nomeSala: '',
            sucesso: null,
            erro: null

        })

        console.log("entriy")
        this.setState({
            clienteEscolhido: e.target.value
        }, () => {
            this.setState({

                valueclienteEscolhido: this.state.clienteEscolhido
            }, () => {
                // this.informacoesCliente(this.state.clienteEscolhido)
                this.consultarSalasDoCliente()
            })
        }
        )


    }

    // verificacaoAlteracaoVagas = () => {
    //     axios.post('https://banco-gestao.herokuapp.com/atendimento/quantidade-vagas-disponiveis', {
    //         nomeSala: this.state.nomeSala,

    //     }).then(response => {

    //         this.setState({ disponiveis: response.data }, () => {

    //             axios.post('https://banco-gestao.herokuapp.com/atendimento/quantidade-vagas-totais', {
    //                 nomeSala: this.state.nomeSala,

    //             }).then(response => {

    //                 this.setState({ totais: response.data, }, () => {
    //                     let validado = true;
    //                     if (this.state.quantidadeVagas != this.state.totais) {
    //                         console.log("entoru1")
    //                         if (this.state.quantidadeVagas > this.state.totais) {
    //                             this.atualizarDetalhes()
    //                             console.log("entoru2")

    //                         } else if (this.state.quantidadeVagas < this.state.totais - this.state.disponiveis) {
    //                             console.log("entoru3")

    //                             validado = false;
    //                             this.setState({
    //                                 erro: "Não é possível alterar a quantidade de vagas! "

    //                             })

    //                         } else {
    //                             console.log("entoru4")

    //                             this.atualizarDetalhes()
    //                         }
    //                     } else {
    //                         console.log("entoru5")

    //                         this.atualizarDetalhes()
    //                     }

    //                 })

    //             }).catch(erroResposta => {
    //                 this.setState({
    //                     erro: "Não é possivel alterar por indisponibilidade do servidor!"
    //                 })

    //             })

    //         })

    //     }).catch(erroResposta => {
    //         this.setState({
    //             erro: "Não é possivel alterar por indisponibilidade do servidor!"
    //         })

    //     })

    // }

    // atualizarDetalhes = () => {
    //     axios.put('https://banco-gestao.herokuapp.com/sala/atualizar', {
    //         id: this.state.id,
    //         nomeSala: this.state.nomeSala,
    //         mensagemBoasVindas: this.state.mensagemBoasVindas,
    //         mensagemOcupacao: this.state.mensagemOcupacao,
    //         saltoPrioridade: this.state.saltoPrioridade,
    //         mensagemNotificacao: this.state.mensagemNotificacao,
    //         quantidadeVagas: this.state.quantidadeVagas,
    //         saltoPrioridade: this.state.saltoPrioridade,
    //         username: this.state.username,
    //         tempo: this.state.tempo

    //     }).then(response => {
    //         this.setState({
    //             sucesso: "Alterado!"
    //         })
    //         this.atualizar()
    //     }).catch(erroResposta => {
    //         this.setState({
    //             erro: erroResposta.response.data.error
    //         })

    //     })
    // }

    informacoesCliente = (e) => {
        axios.get(`https://banco-gestao.herokuapp.com/sala/detalhes/${e}`).then(response => {
            this.setState({
                id: response.data.id,
                nomeSala: response.data.nomeSala,
                mensagemBoasVindas: response.data.mensagemBoasVindas,
                mensagemOcupacao: response.data.mensagemOcupacao,
                saltoPrioridade: response.data.saltoPrioridade,
                mensagemNotificacao: response.data.mensagemNotificacao,
                quantidadeVagas: response.data.quantidadeVagas,
                username: response.data.username,
                tempo: response.data.tempo
            }, () => {
                this.setState({
                    painelDeEdicao: true
                })
            })
        }).catch(erroResposta => {


        })

    }


    handlePainelnomeSala = () => {
        this.setState({
            painelnomeSala: !this.state.painelnomeSala
        })
    }
    // handleMensagemDeBoasVindas = (e) => {
    //     this.setState({ mensagemBoasVindas: e.target.value })
    // }
    // handleMensagemDeOcupacao = (e) => {
    //     this.setState({ mensagemOcupacao: e.target.value })
    // }
    // handleMensagemDeNotificacao = (e) => {
    //     this.setState({ mensagemNotificacao: e.target.value })
    // }




    // handleTempo = (e) => {
    //     this.setState({
    //         tempo: e.target.value
    //     })
    // }

    // handleQuantidadeVagas = (e) => {
    //     this.setState({
    //         quantidadeVagas: e.target.value
    //     })
    // }

    // handleSaltoPrioridade = (e) => {
    //     this.setState({
    //         saltoPrioridade: e.target.value
    //     })
    // }
    handleNomeSala = (e) => {
        this.setState({
            nomeSala: e.target.value
        })
    }



    render() {



        return (

            
            <div className="col-lg-12 margen-pagina intro" style={{

            }}>

                {/* <p className="estilo-titulo">PARÂMETROS DE CONFIGURAÇÃO DA SALA</p> */}

                {/* <p className="estilo-titulo">tela adicionar salas - CADASTRO DE SALAS DO CLIENTE {this.state.valueclienteEscolhido}</p> */}
                <h5 style={{ textAlign: 'center', paddingTop: '0%', paddingBottom: '2%', color: '#132577' }}>CADASTRO DE UNIDADES DO CLIENTE </h5>
                <hr></hr>


                <div class="form-group estilo-formulario body-atendimento" style={{  padding: '3%', paddingBottom: '0%' }}>
                    <label for="exampleSelect1">Selecione o nome do Cliente</label>
                    <select style={{ width: '100%' }} value={this.state.valueclienteEscolhido} onChange={(e) => this.handleCliente(e)} className="form-control" id="exampleSelect1">
                        <option value="">Selecione</option>
                        {this.state.clientes.map(sala => (
                            sala.aprovado == 5 ?
                                <option value={sala.username}>{sala.username}</option>
                                : false
                        ))}
                    </select>
                </div>
                
                {this.state.painelDeEdicao ?


                    <div>

                        <div className="col-lg-12 body-atendimento" style={{

                        }}>

                            <br></br>


                            <div className="col-lg-12" style={{ padding: '0%', border: '1p solid black' }}>
                                <h5 style={{ textAlign: 'center', color: '#292285' }}> Cadastrar uma nova unidade para o cliente "{this.state.valueclienteEscolhido}" </h5>

                                <div className="form- estilo-formulario">
                                    <label htmlFor="exampleInputnomeSala1">Digite um nome para cadastrar uma nova unidade</label>
                                    <input value={this.state.nomeSala} onChange={(e) => { this.handleNomeSala(e) }}
                                        type="text" rows="5" className="form-control" id="nomeSalaClienteId"
                                        aria-describedby="nomeSalaHelp" placeholder="Digite o nome da unidade" />
                                </div>

                                <button style={{ paddingTop: '3%' , }} onClick={this.cadastrar}
                                    type="button" className="btn btn-success botao-cadastro"><h5>CADASTRAR </h5></button>

                            </div>

                            {this.state.sucessoSala ?
                                <div className="alert alert-dismissible alert-success ">
                                    <button onClick={this.handleSucess} type="button" className="close" data-dismiss="alert">×</button>
                                    <strong>Sucesso!</strong> Nova unidade cadastrada!
   </div> 
   : false}

                            {this.state.erroSala ?
                                <div className="alert alert-dismissible alert-danger ">
                                    <button type="button" className="close" data-dismiss="alert">×</button>
                                    {this.state.erroSala}
                                </div> : false}


                            <h5 style={{ textAlign: 'center', padding: ' 3%', color: '#292285'  }}>Unidades do cliente "{this.state.valueclienteEscolhido}" já cadastradas</h5>
                            <div className="scroll-box " style={{ maxHeight: '500px', overflowX: 'auto', height: '100%' }}>
                                <form id="form-veiculos" onReset={this.handleFormReset}>


                                    <table class="table table-hover" >

                                        <thead style={{ color: '#141A7F', fontSize: '60%' ,
                                        //  border: '2px solid red'
                                          }}>
                                            <tr style={{ color: '#21077C', fontSize: '60%' , 
                                            // border: '2px solid red' 
                                            }}>

                                                <th  style={{  paddingLeft: '30px' }} scope="col">NOME DA UNIDADE</th>

                                                {/* <th scope="col">ATÉ CEP</th> */}
                                                <th style={{  color: 'blue', fontSize: '300%' , textAlign: 'center' }} scope="col">DELETAR</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.state.salasDoCliente.map(salas => (
                                                <tr class="sala-cadastrada" style={{ }}>

                                                    <td style={{  color: '#0D1386', fontSize: '130%', paddingLeft: '40px' }}>{salas.nomeSala}</td>

                                                

                                                    <td>
                                                        <div className="c-loader-tabela" style={{ textAlign: 'center'  }}>
                                                         <svg style={{ color: '#0D1386', fontSize: '90%',  }} onClick={(e) => { this.deletar(salas.id) }} width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
                                                            <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
                                                        </svg>
                                                        </div>

                                                    </td>
                                                </tr>
                                            ))}





                                        </tbody>
                                    </table>

                                </form>

                                {this.state.erroDelecao ?
                                    <div className="alert alert-dismissible alert-danger">
                                        <button type="button" className="close" data-dismiss="alert">×</button>
                                        {this.state.erroDelecao}
                                    </div> : false}
                            </div>
                            <br></br>





                        </div>





                    </div>




                    : false}

                {this.state.sucesso ?
                    <div className="alert alert-dismissible alert-success">
                        <button onClick={this.handleSucess} type="button" className="close" data-dismiss="alert">×</button>
                        <strong>Sucesso!</strong> Nova sala cadastrada!
               </div> : false}

                {this.state.erroDelecao ?
                    <div className="alert alert-dismissible alert-danger">
                        <button type="button" className="close" data-dismiss="alert">×</button>
                        {this.state.erroDelecao}
                    </div> : false}


                <br></br>





            </div>



        )


    }


}







export default AdicionarSala;