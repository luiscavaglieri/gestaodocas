import React from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format'
import qs from 'qs'
import { AuthContext } from '../Main/ProvedorAutenticacao';


class ListaAtendentes extends React.Component {


    state = {
        username: false,
        nomeSala: null,
        ListaDeAtendentes: [],


        usuario: "",
        sucesso: false,
        erro: null,
        painelnomeSala: false,
        salas: [],
        valueSalaEscolhida: '',
        painelDeEdicao: null


    }





    componentDidMount() {
        const idAtendenteParametro = this.props.match.params.id;
        const idAnuncio = this.props.match.params.id;

        this.listarAtendentes()

        this.setState({
            idAtendente: idAtendenteParametro,
            idCliente: idAnuncio


        }, () => {
            this.atualizar()


        })
    }






    listarAtendentes = () => {

        axios.post(`https://banco-gestao.herokuapp.com/cliente/atendentes`, {
            username: localStorage.getItem('app-id')
        }

        ).then(response => {
            this.setState({
                ListaDeAtendentes: response.data
            })
            console.log("Valor do campo username", this.state.username)


        }).catch(erroResposta => {
            console.log("deu algum erro na api exluir")

        })

    }


    atualizar = () => {
        fetch(`https://banco-gestao.herokuapp.com/sala/${localStorage.getItem('app-id')}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        salas: result
                    })
                    console.log("Salas do gestor das Salas:", this.state.salas.length)

                }
            )
    }





    deletar = (idDeletarSala) => {
        axios.post('https://banco-gestao.herokuapp.com/sala/deletar', {
            id: idDeletarSala,



        }).then(response => {

            this.atualizar()
        }).catch(erroResposta => {
            this.setState({
                erroDelecao: erroResposta.response.data.error
            })

        })
    }


    cadastrarSala = () => {
        console.log("slasd", this.state.valueSalaEscolhida)
        axios.post('https://banco-gestao.herokuapp.com/sala-do-atendente', {
            nomeSala: this.state.valueSalaEscolhida,
            atendente: this.state.idAtendente


        }).then(response => {
            this.setState({
                sucesso: "Alterado com sucesso!"
            })
            this.atualizar()
        }).catch(erroResposta => {
            this.setState({
                erro: erroResposta.response.data.error
            })

        })


    }

    handleNomeSala = (e) => {

        console.log("entriy")

        this.setState({
            salaEscolhida: this.state.salaEscolhida


        }, () => {
            localStorage.setItem('app-token-sala', this.state.salaEscolhida)
            this.setState({

                valueSalaEscolhida: this.state.salaEscolhida
            }, () => {
                this.informacoesSala(this.state.salaEscolhida)
            })
            console.log("sala Escolhida", this.state.salaEscolhida)
        }
        )


    }


    localStorageTokenSala = (e) => {

        console.log("entriy")

        this.setState({
            salaEscolhida: e


        }, () => {
            localStorage.setItem('app-token-sala', this.state.salaEscolhida)
            this.setState({

                valueSalaEscolhida: this.state.salaEscolhida
            }, () => {
                this.informacoesSala(this.state.salaEscolhida)
            })
            console.log("sala Escolhida", this.state.salaEscolhida)
        }
        )


    }




    verificacaoAlteracaoVagas = () => {
        this.atualizarDetalhes()

    }

    atualizarDetalhes = () => {
        axios.put('https://banco-gestao.herokuapp.com/sala/atualizar', {
            id: this.state.id,
            nomeSala: this.state.nomeSala,
            mensagemBoasVindas: this.state.mensagemBoasVindas,
            mensagemOcupacao: this.state.mensagemOcupacao,
            saltoPrioridade: this.state.saltoPrioridade,
            mensagemNotificacao: this.state.mensagemNotificacao,
            quantidadeVagas: this.state.quantidadeVagas,
            username: this.state.username,
            tempo: this.state.tempo

        }).then(response => {
            this.setState({
                sucesso: "Alterado corretamente!"
            })
            this.atualizar()
        }).catch(erroResposta => {
            this.setState({
                erro: erroResposta.response.data.error
            })

        })

    }

    informacoesSala = (e) => {
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
    handleMensagemDeBoasVindas = (e) => {
        this.setState({ mensagemBoasVindas: e.target.value })
    }
    handleMensagemDeOcupacao = (e) => {
        this.setState({ mensagemOcupacao: e.target.value })
    }
    handleMensagemDeNotificacao = (e) => {
        this.setState({ mensagemNotificacao: e.target.value })
    }




    handleTempo = (e) => {
        this.setState({
            tempo: e.target.value
        })
    }

    handleQuantidadeVagas = (e) => {
        this.setState({
            quantidadeVagas: e.target.value
        })
    }

    handleSaltoPrioridade = (e) => {
        this.setState({
            saltoPrioridade: e.target.value
        })
    }

    handleSucesso = () => {
        this.setState({
            sucesso: null
        })
    }
    handleErro = () => {
        this.setState({
            erro: null
        })
    }





    // componentDidMount() {

    //     this.listarAtendentes()
    //     const idAnuncio = this.props.match.params.id;


    //     this.setState({
    //         idCliente: idAnuncio

    //     }, () => {
    //         this.atualizar()

    //     })

    // }


    consultarAutorizacoes = (id) => {
        console.log("entoru consultar autorizaçoes")

        fetch(`https://banco-gestao.herokuapp.com/login/${id}?username=${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("resultado", result)
                    { this.context.defineUser(result.id) }
                    console.log("resultado do id", result.id)
                    console.log("result aprovado", result.aprovado)
                    { this.context.pegarAutorizacoes(result.aprovado) }
                    localStorage.setItem('app-token-admin', result.aprovado)

                    // this.setState({
                    //   user: result.id

                    // });
                }

            )

        axios.get(`https://banco-gestao.herokuapp.com/sala-do-atendente/${id}`).then(response => {


            localStorage.setItem('app-token-sala', response.data.nomeSala)

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

    // atualizar = () => {
    //     fetch(`https://banco-gestao.herokuapp.com/sala/${this.state.idCliente}`)
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 this.setState({
    //                     salas: result
    //                 })
    //                 console.log("Valor do campo gestor", this.state.idCliente)


    //             }
    //         )

    // }







    deletar = (username) => {
        axios.post(`https://banco-gestao.herokuapp.com/cliente/atendentes`,
            {
                username: username
            }

        ).then(response => {
            this.atualizar()
            this.setState({
                mostrarModalDeletar: false
            })

        }).catch(erroResposta => {

        })

    }

    handleModalDeletar = (e, username) => {
        this.setState({
            mostrarModalDeletar: !this.state.mostrarModalDeletar,
            textoModal: e,
            // username: username,
            idDeletar: username
        })
    }

    deletar = (atendente) => {
        axios.post(`https://banco-gestao.herokuapp.com/cliente/excluir-atendente`,
            {
                username: this.state.idDeletar

            }

        ).then(response => {
            this.listarAtendentes()
            this.setState({
                mostrarModalDeletar: false
            })

        }).catch(erroResposta => {

        })

    }


    render() {

        var data = new Date();


        var d = "31/08/2020 19:33:01";
        var d1 = d.split(" ");
        var date = d1[0].split("/");
        var time = d1[1].split(":");
        var dd = date[0];
        var mm = date[1] - 1;
        var yy = date[2];
        var hh = time[0];
        var min = time[1];
        var ss = time[2];
        var fromdt = new Date("20" + yy, mm - 1, dd, hh, min, ss);

        var hourDiff = data - d;
        var diffHrs = Math.round((hourDiff % 86400000) / 3600000);
        var diffMins = Math.round(((hourDiff % 86400000) % 3600000) / 60000);
        diffMins = diffMins + (diffHrs * 60);
        console.log("dife", hourDiff)
        //var DataAtual = `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}-${data.getHours()}_${data.getMinutes()}:${data.getSeconds()}:${data.getMilliseconds()}`;

        console.log("datas", data,
        );




        return (






            <div
                className="intro"
                style={{
                    paddingLeft: '3%', paddingRight: '3%'
                }}
            >

                <div className={this.state.mostrarModal ? "modal-open" : "modal"}>
                    <div className="modal-dialog" role="document">
                        <div style={{ backgroundColor: '#AEAEC0', borderRadius: '20px' }} className="modal-content">
                            <div className="modal-header">
                                <h3 className="form-control " style={{ fontSize: '30px', color: 'red', textAlign: 'center' }}>Atenção</h3>
                                {/* <button type="button" onClick={(e) => this.handleModal(1)} className="close" data-dismiss="modal" aria-label="Close">
                                     <span aria-hidden="true">×</span>
                                     </button> */}
                            </div>
                            <div className="modal-body" style={{ fontSize: '20px', textAlign: 'center', color: '#19296B' }}>

                                {this.state.textoModal}
                            </div>
                            <div className="modal-footer">
                                <button onClick={(e) => this.handleModal(1)} type="button" className="btn btn-primary " style={{ fontSize: '15px', backgroundColor: '#DE0B0B', borderRadius: '10px' }}>Ok</button>
                                {/* <button type="button" onClick={(e) => this.handleModal(1)} className="btn btn-secondary" data-dismiss="modal"></button> */}
                            </div>
                        </div>
                    </div>
                </div>


                <div className={this.state.mostrarModalDeletar ? "modal-open" : "modal"}>
                    <div className="modal-dialog" role="document">
                        <div style={{ backgroundColor: '#AEAEC0', borderRadius: '20px' }} className="modal-content">
                            <div className="modal-header">
                                <h3 className="form-control" style={{ color: 'red', textAlign: 'center' }}>Atenção</h3>
                                {/* <button type="button" onClick={(e) => this.handleModalDeletar(1)} className="close" data-dismiss="modal" aria-label="Close">
                                     <span aria-hidden="true">×</span>
                                     </button> */}
                            </div>
                            <div className="modal-body" style={{ textAlign: 'center', color: '#19296B', fontSize: '20px' }}>

                                {this.state.textoModal}
                            </div>
                            <div className="modal-footer">
                                <button onClick={(e) => this.deletar(this.state.idDeletar)} type="button" className="btn btn-primary" style={{ width: '47%', marginLeft: '1%', marginRight: '4%', fontSize: '15px', backgroundColor: '#E32A2A', borderRadius: '10px' }}>Confirmar Exclusão</button>
                                <button type="button" onClick={(e) => this.handleModalDeletar(1)} className="btn btn-secondary" style={{ width: '47%', marginLeft: '0%', marginRight: '1%', fontSize: '15px', color: 'white', backgroundColor: '#037B1F', borderRadius: '10px' }} data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>



                {/* <p className="estilo-titulo">LISTA DE ATENDENTES DO GETOR {localStorage.getItem('app-id')}</p> */}
                <h5 style={{ textAlign: 'center', paddingTop: '0%', paddingBottom: '2%', color: '#132577' }}>PAINEL GERAL DAS FILIAIS DA {localStorage.getItem('app-id')}</h5>

                <h5 style={{ textAlign: 'center', paddingTop: '0%', paddingBottom: '2%', color: '#132577' }}>TOTAL DE FILIAIS: { this.state.salas.length} </h5>

                {/* <h5 style={{ textAlign: 'center', paddingTop: '0%', paddingBottom: '2%', color: '#132577' }}>ATENDENTE RESPONSÁVEL: { this.state.ListaDeAtendentes.length} </h5> */}


                {/* <div className="" style={{ textAlign: 'center', color: '#19296B', fontSize: '20px' }}>

                { this.state.salas.length}

                </div> */}


                {/* <h5 style={{ textAlign: 'center', paddingTop: '0%', paddingBottom: '2%', color: '#19296B' }}>LISTA DE ATENDENTES</h5> */}


                <div class="">
                    <div class="" >

                        {/* <table class="table table-striped table-bordered  borda-na-tabela">
                            <thead style={{ textAlign: 'center'}}>
                                <tr>
                                <th scope="col">Nome do(a) Atendente</th>
                                    <th scope="col">Usuário Login do Atendente</th>
                                    <th scope="col">Gestor chefe</th>
                                    <th scope="col">Sala do Atendente</th>

                                    <th scope="col">Excluir Atendente</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.state.ListaDeAtendentes.map(blocoAtual => (
                                    blocoAtual.cliente.aprovado == 1 ?
                                        <tr>

                                            <td>{blocoAtual.cliente.nome}</td>
                                            <th scope="row">{blocoAtual.cliente.username}</th>
                                            <td>{blocoAtual.nomeSala}</td>
                                            <td>{blocoAtual.nomeSala}</td>


                                            <td>  <button
                                                onClick={(e) => this.handleModalDeletar(`Exluindo o atendente  ${blocoAtual.cliente.nome} e Login de usuário ${blocoAtual.cliente.username}`, blocoAtual.cliente.username)}

                                                type="button" style={{
                                                    color: 'white', borderRadius: '10px', width: '100%', height: '35%',
                                                    fontSize: '12px', backgroundColor: '#DE3535'
                                                }} className="btn btn-danger  btn-sm">Excluir Atendente</button>
                                            </td>

                                        </tr> 
                                        : false

                                ))}
                            </tbody>
                        </table> */}


                        {/* NOVA TABELA ZEBRADA CÓPIA DE RESERVA */}

                        <table class=" table table-sm table-striped table-round-corner table-condensed table-bordered ">
                            <thead class="table-sm  "
                            // style={{// border: ' 3px solid yellow',}}
                            >

                                <tr class=" table-th table-striped table-round-corner table-condensed table-bordered" style={{
                                    backgroundColor: '#19296B',
                                    // border: ' 3px solid yellow',

                                }}>
                                    <th scope="col">Filiais cadastradas</th>
                                    <th scope="col">Atendente responsável pela filial</th>
                                    {/* <th scope="col">Login  do(a) Atendente</th> */}
                                    <th scope="col">Telefone</th>

                                    {/* <th scope="col">Excluir Atendente</th> */}
                                    <th scope="col">Painel de Atendimento</th>

                                </tr>

                            </thead>
                            <tbody>


                                {this.state.ListaDeAtendentes.map(blocoAtual => (
                                    blocoAtual.cliente.aprovado == 1 ?
                                        <tr className="table-td table-round-corner table-striped table-condensed table-bordered td"
                                            style={{
                                                backgroundColor: '#C6D0E0',
                                                // border: ' 3px solid yellow',
                                            }} >


                                            <td style={{ width: '8%', paddingTop: '1.5%' }}>{blocoAtual.nomeSala}</td>
                                            <td style={{ width: '8%', paddingTop: '1.5%' }}>{blocoAtual.cliente.nome}</td>
                                            {/* <th style={{ width: '8%', paddingTop: '2%', fontSize: '13px'}} scope="row">{blocoAtual.cliente.username}</th> */}
                                            <td style={{ width: '8%', paddingTop: '1.5%', fontSize: '16px' }}>{blocoAtual.cliente.telefone}</td>

                                             {/* <td style={{ width: '8%' }} >  <button
                                                onClick={(e) => this.handleModalDeletar(`Exluindo o atendente  ${blocoAtual.cliente.nome} e Login de usuário ${blocoAtual.cliente.username}`, blocoAtual.cliente.username)}

                                                type="button" style={{paddingTop: '6%',
                                                    color: 'white', borderRadius: '10px',
                                                    fontSize: '13px', backgroundColor: '#19296B', width: '100%', 
                                                }} className="btn btn-danger  btn-sm">Excluir Atendente</button>
                                            </td>  */}


                                            <td style={{ width: '8%' }} > <a href="#/atendimento"> <button

                                                //    value={this.state.salaEscolhida}
                                                onClick={(e) => this.localStorageTokenSala(blocoAtual.nomeSala)}
                                                type="button" style={{paddingTop: '5%',
                                                    color: 'white', borderRadius: '10px', width: '100%', height: '35%',
                                                    fontSize: '13px', backgroundColor: '#19296B'
                                                }} className="btn btn-danger  btn-sm"> {blocoAtual.nomeSala}</button></a>
                                            </td>






                                            {/* 
                                            <td style={{width: '8%' }}><a href="#/atendimento"> <button type="button" className="btn btn-success" style={{ borderRadius: '10px', fontSize: '15px', textAlign: 'center', paddingBottom: '1%' }}>VISUALIZAR PAINEL DE ATENDIMENTO DA UNIDADE {blocoAtual.nomeSala}</button></a>
</td> */}

                                        </tr>
                                        : false

                                ))}
                            </tbody>
                        </table>



                    </div>
                </div>



            </div>
        )

    }
}


export default ListaAtendentes;
