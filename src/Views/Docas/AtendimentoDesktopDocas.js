import React from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format'
import qs from 'qs'
import Contador from '../../Components/Contador 1'




class AtendimentoDesktopDocas extends React.Component {
    constructor() {
        super();
        this.state = {
            curTime : null,
            aviso: 0,
          disponiveis: 0,
          quantidadeDeVagas: 0,
          tipoDeMensagem: 2,
          vagas: 1,
          qtdNNotificada: 0,
          mensagemBemVindo: null,
          mensagemNotificacao: null,
          sucesso: false,
          erro: null,
          ocupado: "",
          
          clienteCadastrado: false,
          prioridade: 0,
          prioridadeEspecial: false,
          prioridadePreferencial: false,
          reservas: [],
          mostrarModalDeletar: false,
          mostrarModalNotificar: false,
          mostrarModalSucesso: false,
          mostrarModalCadastrar: false,
          mostrarModalEntrada: false,
          
          
          mostrarModal: false,
          notificado: 0,
          quantidadeNotificada: 0,
          ValorVagasPendentes: 0,
          VagasNotificadasDesocupar: 0,
        }
    }
    

   
    

  
            componentDidMount() {

                
                setInterval( () => {
                    // this.setState({
                    //   curTime : new Date().toLocaleString()
                    // })
                    
                    this.atualizaValores()
                    this.atualizar()
                    this.atualizaVagasPendentes()
        
        

                  },50000000)


                this.setState({
                    nomeSala: localStorage.getItem('app-token-sala')
                }, () => {
                    this.atualizaValores()
                    this.atualizaVagasPendentes()
        
                    console.log("entrou em componente didmount valor de Vagas Pendentes ", this.state.vagasPendentes)
                })
        
                this.atualizar();
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
                sucesso: "Alterado!"
            })
            this.atualizar()
        }).catch(erroResposta => {
            this.setState({
                erro: erroResposta.response.data.error
            })

        })

    }


    enviarNotificacao = (telefone) => {
        
        axios.post(`https://banco-gestao.herokuapp.com/atendimento/notificar`,
            {
                nomeSala: localStorage.getItem('app-token-sala'),
                telefone: telefone,
            }
        ).then(response => {
            this.state.aviso = 1;
            this.avisoMensgem()
            this.handleModalNotificar(1)
            this.handleModalMensagem(`MENSAGEM ENVIADA COM SUCESSO`)
            this.setState({
                // mostrarModalNotificar: true
            })
            // alert(response.data)
            console.log("Telefone encontrado Notificação", telefone)
            console.log("Valor aviso", this.state.aviso)

        }).catch(erroResposta => {
        })

    }


    avisoMensgem = (telefone) => {
       

        
        axios.post(`https://banco-gestao.herokuapp.com/atendimento/notificar`,
        {
            nomeSala: localStorage.getItem('app-token-sala'),
            telefone: telefone,
        }
        ).then(response => {
            this.state.aviso = 1;
           
            console.log("Telef avisoMensa", telefone)
            console.log("Aviso enviarMens", this.state.aviso)

        }).catch(erroResposta => {
        })

    }

 
    cadastrarCliente = (telefone) => {
        axios.post(`https://banco-gestao.herokuapp.com/reservas`,
            {
                nomeSala: localStorage.getItem('app-token-sala'),
                telefone: telefone
            }
        ).then(response => {
            this.handleModalNotificar(1)
            this.setState({
                // mostrarModalNotificar: true
            })
            // alert(response.data)
            console.log("Tel encontrado  cliente", telefone)

        }).catch(erroResposta => {
        })

    }


    criarReserva = (e, telefone) => {
        var prioridade = 0;
        if (this.state.prioridadePreferencial == true) {
            prioridade = 1
        }
        else if (this.state.prioridadeEspecial == true) {
            prioridade = 3
        }

        if (this.state.disponiveis < this.state.vagas) {

            



            axios.post('https://banco-gestao.herokuapp.com/reservas', {
                telefone: localStorage.getItem('app-token-telefone'),
                telefone: telefone,
                nomeSala: this.state.nomeSala,
                telefone: this.state.telefone.replace(" ", ""),
                prioridade: prioridade,
                quantidadeVagas: this.state.vagas,
                tipoDeMensgem: this.state.tipoDeMensagem,
                notificado: this.state.notificado

            }).then(response => {
                this.atualizar()
                this.atualizaValores()
                // this.handleModalNotificar(1)
                this.handleModalCadastrar(1)
                this.handleModalSucesso(`Telefone:  ${this.state.telefone} cadastrado com sucesso!`)
                this.setState({
                    clienteCadastrado: true,
                    // mostrarModalNotificar: true

                })

            }).catch(erroResposta => {

            })
        } else {
            // alert("NÃO HÁ NECESSIDADE DE CADASTRO");
            this.handleModalDisponiveis(`Não há necessidade de cadastro.
             
             Existem vagas disponíveis`)
        }

    }


    handleModalVagasLivres = (e) => {
        this.setState({
            mostrarModal: !this.state.mostrarModal,
            textoModal: e,

        })
    }




    handleModalDisponiveis = (e) => {
        this.setState({
            mostrarModal: !this.state.mostrarModal,

            textoModal: e,

        })
    }

    handleModalSucesso = (e, telefone) => {
        this.setState({
            mostrarModal: !this.state.mostrarModal,
            textoModal: e,
            telefone: null

        })
    }

    handleModalMensagem = (e, telefone) => {
        this.setState({
            mostrarModal: !this.state.mostrarModal,
            textoModal: e,
            // telefone: null

        })
    }


    handleModalExcluir = (e, telefone) => {
        this.setState({
            mostrarModal: !this.state.mostrarModal,
            textoModal: e,
            // telefone: null

        })
    }




    handleTelefone = (e) => {
        console.log('1')
        this.setState({
            telefone: e.target.value.replace("(", "").replace(")", "").replace("-", "")
        }, () => {
            console.log(this.state.telefone)
        })

    }


    handleVagas = (e) => {
        this.setState({
            vagas: e.target.value,
        })

    }



    handleModalDeletar = (e, id, tipo) => {
        this.setState({
            mostrarModalDeletar: !this.state.mostrarModalDeletar,
            textoModal: e,
            idDeletar: id,
            deletar: tipo,
            
        })
    }

    handleModalNotificar = (e, telefone) => {
        this.setState({
            mostrarModalNotificar: !this.state.mostrarModalNotificar,
            textoModalNotificar: e,
            notificar: telefone,
        
        })
    }

    
    handleModalEntrada = (e, telefone) => {
        this.setState({
            mostrarModal: !this.state.mostrarModal,
            textoModal: e,
            telefone: this.state.telefone,
            variavel: this.state.variavel

        })
    }

    // handleModalSucesso = (e, sucesso) => {
    //     this.setState({
    //         mostrarModalSucesso: !this.state.mostrarModalSucesso,
    //         textoModalSucesso: e,
    //         sucesso: true,
    //         // notificar: telefone
          

    //     })

    //     console.log("Texto modal sucesso",  this.state.textoModalSucesso)
    // }



    handleModalCadastrar = (e, telefone, tipo) => {

        if (this.state.disponiveis < this.state.vagas) {

            this.setState({
                mostrarModalCadastrar: !this.state.mostrarModalCadastrar,
                textoModalCadastrar: e,
                // cadastrar: telefone,
              

            })
        }

        else {
            // alert("NÃO HÁ NECESSIDADE DE CADASTRO");
            this.handleModalDisponiveis(`Não há necessidade de cadastro.
                 
                 Existem vagas disponíveis`)
        }


    }


  



    calcularVagasNotificadas = () => {


        var quantidadeNotificada = 0;
        for (let i = 0; i < this.state.reservas.length; i++) {
            if (this.state.reservas[i].notificado == 1) {

                quantidadeNotificada = quantidadeNotificada + 1;
            }
        }
        this.setState({
            quantidadeNotificada: quantidadeNotificada
        })
        this.calcularNaoNotificados()
    }

    calcularVagasNotificadasDesocupar = () => {

        console.log("entrou calcularVagasNotificadasDesocupar")
        var vagasNotificadasDesocupar = 0;
        for (let i = 0; i < this.state.reservas.length; i++) {
            console.log("this.state.reservas[i].notificado", this.state.reservas[i].notificado)
            if (this.state.reservas[i].notificado == 1) {
                console.log("this.state.reservas[i].quantidadeDeVagas", this.state.reservas[i].quantidadeVagas)

                vagasNotificadasDesocupar = vagasNotificadasDesocupar + this.state.reservas[i].quantidadeVagas;
            }
        }
        console.log("quantide pendents", vagasNotificadasDesocupar)
        this.setState({
            vagasNotificadasDesocupar: vagasNotificadasDesocupar
        })
        this.calcularNaoNotificados()
    }

    calcularNaoNotificados = () => {

        console.log("entrou calcularVagasNotificadasDesocupar")
        var quantidadeNaoNotificada = 0;
        for (let i = 0; i < this.state.reservas.length; i++) {
            console.log("this.state.reservas[i].notificado", this.state.reservas[i].notificado)
            if (this.state.reservas[i].notificado == 0) {

                quantidadeNaoNotificada = quantidadeNaoNotificada + 1;
            }
        }
        console.log("quantide pendents", quantidadeNaoNotificada)
        this.setState({
            quantidadeNaoNotificada: quantidadeNaoNotificada
        })

    }

    atualizar = () => {
        this.setState({
            nomeSala: localStorage.getItem('app-token-sala')
        }, () => {


            axios.get(`https://banco-gestao.herokuapp.com/reservas/${this.state.nomeSala}`



            ).then(response => {
                this.setState({
                    reservas: response.data

                }, () => {
                    this.setState({
                        mostrar: true
                    })
                    this.calcularVagasNotificadas()
                    this.calcularVagasNotificadasDesocupar()

                })


            }).catch(erroResposta => {


            })


        })

    }


    deletar = (id) => {
        axios.post(`https://banco-gestao.herokuapp.com/reservas/deletar`,
            {
                id: id
            }
        ).then(response => {
            this.atualizar()
           
            this.setState({
                mostrarModalDeletar: false
            })

        }).catch(erroResposta => {
        })
    }


    deletar = (id) => {
        axios.post(`https://banco-gestao.herokuapp.com/reservas/cancelar`,
            {
                id: id
            }
        ).then(response => {
            this.atualizar()
            this.atualizaValores()
            this.handleModalExcluir('RESERVA EXCLUÍDA COM SUCESSO')
            this.setState({
                mostrarModalDeletar: false
            })
        }).catch(erroResposta => {
        })
    }


    realizarEntrada = (id,) => {
        axios.post(`https://banco-gestao.herokuapp.com/reservas/deletar`,
            {
                id: id
            }

        ).then(response => {
            this.atualizar()
            // this.handleModalEntrada(`O cliente ID:  ${this.state.idDeletar} ocupou sua vaga`)
            this.setState({
                mostrarModalDeletar: false
            })
        }).catch(erroResposta => {

        })
    }

    criarEntrada = (id, telefone) => {
        axios.post(`https://banco-gestao.herokuapp.com/reservas/deletar`,
            {
                id: id,
                telefone: this.state.telefone
            }

        ).then(response => {

            this.atualizar()
            this.handleModalEntrada(`VAGA OCUPADA COM SUCESSO`)
            this.setState({
                mostrarModalDeletar: false,
                
            })
        }).catch(erroResposta => {

        })
    }




    atualizaValores = () => {
        axios.post('https://banco-gestao.herokuapp.com/atendimento/quantidade-vagas-totais', {
            nomeSala: this.state.nomeSala,



        }).then(response => {

            this.setState({ quantidadeDeVagas: response.data })

            // console.log("resposta quantidade de vagas" ,  response.data)
        }).catch(erroResposta => {


        })


        axios.post('https://banco-gestao.herokuapp.com/atendimento/quantidade-vagas-disponiveis', {
            nomeSala: this.state.nomeSala,



        }).then(response => {

            this.setState({ disponiveis: response.data })
            console.log("entarndo e mudando disponiveis", this.state.disponiveis)


        }).catch(erroResposta => {


        })

    }

    atualizaVagasPendentes = () => {
        console.log("entrou na api")


        axios.get(`https://banco-gestao.herokuapp.com/sala/detalhes/${this.state.nomeSala}`

        ).then(response => {
            console.log(
                "ok"
            )
            this.setState({
                ValorVagasPendentes: response.data.vagasPendentes
            }, () => {

                console.log("entrou em valor de Vagas Pendentes atualizada certo", this.state.ValorVagasPendentes)



            })



        }).catch(erroResposta => {

            console.log(erroResposta
            )

        })



    }



    ocuparVagas = (e) => {

        axios.put('https://banco-gestao.herokuapp.com/atendimento/ocupar', {
            nomeSala: this.state.nomeSala,
            ocupado: e



        }).then(response => {
            this.atualizaValores()

console.log("valor do ocupado" , this.state.ocupado)

        }).catch(erroResposta => {


        })



    }

    desocuparVagas = (e,posicao) => {


        axios.put('https://banco-gestao.herokuapp.com/atendimento/desocupar', {
            nomeSala: this.state.nomeSala,
            ocupado: e



        }).then(response => {
            this.atualizaValores()
            this.atualizar()
            this.atualizaVagasPendentes()

            console.log("valor do ocupado no desocupar" , this.state.ocupado)

        }).catch(erroResposta => {


        })



    }


    prioridadePreferencial = (e) => {
        console.log("Funcao prioridade Preferencial", e.target.checked)
        if (e.target.checked == true) {
            console.log("entrou no if prioridade preferencial")
            this.setState({
                prioridadePreferencial: true
            })

        } else {
            this.setState({
                prioridadePreferencial: false
            })

            console.log("não entrou no if prioridade preferencial")

        }

    }

    prioridadeEspecial = (e) => {
        console.log("Funcao prioridade especial", e.target.checked)
        if (e.target.checked == true) {
            console.log("entrou no if prioridade especial")
            this.setState({ prioridadeEspecial: true })
        }
        else {
            this.setState({
                prioridadeEspecial: false
            })

            console.log("não entrou no if prioridade especial")

        }
    }

    clicado = () => {

    }



    tipoDeMensagemWhats = () => {
        this.setState({
            tipoDeMensagem: 1
        })


    }


    render() {

 
        return (


            // COMEÇANDO O DESKTOP
            <div className="intro ">


                <div className={this.state.mostrarModal ? "modal-open" : "modal"}>
                    <div className="modal-dialog" role="document">
                        <div style={{ backgroundColor: '#AEAEC0', borderRadius: '20px', textAlign: 'center' }} className="modal-content">
                            <div className="modal-header" style={{ paddingLeft: '6%' }}>
                                <h3 className="form-control " style={{ fontSize: '90px', color: 'red', textAlign: 'center' }}>Atenção</h3>
                                <button type="button" onClick={(e) => this.handleModalDisponiveis(1)} className="close" data-dismiss="modal" aria-label="Close">
                                    {/* <span aria-hidden="true">×</span> */}
                                </button>
                            </div>
                            <div className="modal-body" style={{ fontSize: '20px', textAlign: 'center', color: '#19296B' }}>

                                {this.state.textoModal}
                            </div>
                            <div className="modal-footer">
                                <button onClick={(e) => this.handleModalDisponiveis(1)} type="button" className="btn btn-primary " style={{ fontSize: '15px', backgroundColor: '#DE0B0B', borderRadius: '10px' }}>OK</button>
                                {/* <button type="button" onClick={(e) => this.handleModal(1)} className="btn btn-secondary" data-dismiss="modal"></button> */}
                            </div>
                        </div>
                    </div>
                </div>


                <div className={this.state.mostrarModalDeletar ? "modal-open" : "modal"}>
                    <div className="modal-dialog" role="document">
                        <div style={{ backgroundColor: '#AEAEC0', borderRadius: '20px' }} className="modal-content">
                            <div className="modal-header" style={{ paddingLeft: '6%' }}>
                                <h3 className="form-control" style={{ color: 'red', textAlign: 'center' }}>Atenção</h3>
                                <button type="button" onClick={(e) => this.handleModalDeletar(1)} className="close" data-dismiss="modal" aria-label="Close">
                                    {/* <span aria-hidden="true">×</span> */}
                                </button>
                            </div>
                            <div className="modal-body" style={{ textAlign: 'center', color: '#19296B', fontSize: '20px' }}>

                                {this.state.textoModal}
                            </div>
                            {this.state.deletar == true ?
                                <div className="modal-footer">
                                    <div className="col-lg-12">
                                        <div>
                                            <button onClick={(e) => this.deletar(this.state.idDeletar)} type="button" className="btn btn-primary" style={{ marginLeft: '5%', fontSize: '15px', backgroundColor: '#E32A2A', borderRadius: '10px' }}>Escluir Reserva</button>
                                            <button type="button" onClick={(e) => this.handleModalDeletar(1)} className="btn btn-secondary" style={{ marginLeft: '10%', fontSize: '15px', color: 'white', backgroundColor: ' #25930A', borderRadius: '10px' }} data-dismiss="modal">Manter Reserva</button>
                                        </div>
                                    </div>
                                </div>


                                :

                                <div className="modal-footer" >
                                    <div className="col-lg-12" >
                                        <div>
                                            <button onClick={(e) => this.criarEntrada(this.state.idDeletar)} type="button" className="btn btn-primary" style={{ width: '47%', marginLeft: '1%', marginRight: '1%', fontSize: '15px', backgroundColor: '#25930A', borderRadius: '10px' }}>Entrar</button>
                                            <button type="button" onClick={(e) => this.handleModalDeletar(1)} className="btn btn-secondary" style={{ width: '47%', marginLeft: '4%', marginRight: '0%', fontSize: '15px', color: 'white', backgroundColor: '#E32A2A', borderRadius: '10px' }} data-dismiss="modal">Cancelar Entrada</button>
                                        </div>
                                    </div>
                                </div>

                            }



                        </div>
                    </div>
                </div>



                <div className={this.state.mostrarModalNotificar ? "modal-open" : "modal"}>
                    <div className="modal-dialog" role="document">
                        <div style={{ backgroundColor: '#AEAEC0', borderRadius: '20px' }} className="modal-content">
                            <div className="modal-header" style={{ paddingLeft: '6%' }}>
                                <h3 className="form-control " style={{ fontSize: '30px', color: 'red', textAlign: 'center' }}>Atenção</h3>
                                <button type="button" onClick={(e) => this.handleModalNotificar(1)} className="close" data-dismiss="modal" aria-label="Close">
                                    {/* <span aria-hidden="true">×</span> */}
                                </button>
                            </div>
                            <div className="modal-body" style={{ fontSize: '20px', textAlign: 'center', color: '#19296B' }}>

                                {this.state.textoModalNotificar}
                            </div>

                            {this.state.notificar == true ?

                                <div className="modal-footer">
                                    <button onClick={(e) => this.handleModalNotificar(1)} type="button" className="btn btn-primary " style={{ fontSize: '15px', backgroundColor: '#DE0B0B', borderRadius: '10px' }}>Ok</button>
                                    {/* <button type="button" onClick={(e) => this.handleModal(1)} className="btn btn-secondary" data-dismiss="modal"></button> */}
                                </div>

                                :

                                <div className="modal-footer">
                                    <div className="col-lg-12">
                                        <div>
                                            <button onClick={(e) => this.enviarNotificacao(this.state.notificar)} type="button" className="btn btn-primary" style={{ marginLeft: '3%', fontSize: '15px', backgroundColor: '#D69419', borderRadius: '10px' }}>Enviar Mensagem</button>
                                            <button type="button" onClick={(e) => this.handleModalNotificar(1)} className="btn btn-secondary" style={{ width: '44%', marginLeft: '8%', fontSize: '15px', color: 'white', backgroundColor: '#E32A2A', borderRadius: '10px' }} data-dismiss="modal">Não Enviar</button>
                                        </div>
                                    </div>
                                </div>

                            }






                        </div>
                    </div>
                </div>







                <div className={this.state.mostrarModalCadastrar ? "modal-open" : "modal"}>
                    <div className="modal-dialog" role="document">
                        <div style={{ backgroundColor: '#AEAEC0', borderRadius: '20px' }} className="modal-content">
                            <div className="modal-header" style={{ paddingLeft: '6%' }}>
                                <h3 className="form-control " style={{ fontSize: '30px', color: 'red', textAlign: 'center' }}>Atenção</h3>
                                <button type="button" onClick={(e) => this.handleModalCadastrar(1)} className="close" data-dismiss="modal" aria-label="Close">
                                    {/* <span aria-hidden="true">×</span> */}
                                </button>
                            </div>
                            <div className="modal-body" style={{ fontSize: '20px', textAlign: 'center', color: '#19296B' }}>

                                {this.state.textoModalCadastrar}
                            </div>

                            {this.state.cadastrar == true ?

                                <div className="modal-footer">
                                    <button onClick={(e) => this.handleModalCadastrar(1)} type="button" className="btn btn-primary " style={{ fontSize: '15px', backgroundColor: '#DE0B0B', borderRadius: '10px' }}>Ok</button>
                                    {/* <button type="button" onClick={(e) => this.handleModal(1)} className="btn btn-secondary" data-dismiss="modal"></button> */}
                                </div>

                                :



                                <div className="modal-footer">
                                    <div className="col-lg-12">
                                        <div>
                                            <button onClick={(e) => this.criarReserva(this.state.cadastrar)} type="button" className="btn btn-primary" style={{ width: '47%', marginLeft: '2%', marginRight: '1%', fontSize: '15px', backgroundColor: '#19296B', borderRadius: '10px' }}>Cadastrar</button>

                                            <button type="button" onClick={(e) => this.handleModalCadastrar(1)} className="btn btn-secondary" style={{ width: '45%', marginLeft: '4%', marginRight: '0%', fontSize: '15px', color: 'white', backgroundColor: '#E32A2A', borderRadius: '10px' }} data-dismiss="modal">Não cadastrar</button>
                                        </div>
                                    </div>
                                </div>

                            }

                        </div>
                    </div>
                </div>





                <div className={this.state.mostrarModal ? "modal-open" : "modal"}>
                    <div className="modal-dialog" role="document">
                        <div style={{ backgroundColor: '#AEAEC0', borderRadius: '20px', textAlign: 'center' }} className="modal-content">
                            <div className="modal-header" style={{ paddingLeft: '6%' }}>
                                <h3 className="form-control " style={{ fontSize: '90px', color: 'red', textAlign: 'center' }}>Atenção</h3>
                                <button type="button" onClick={(e) => this.handleModalSucesso()} className="close" data-dismiss="modal" aria-label="Close">
                                    {/* <span aria-hidden="true">×</span> */}
                                </button>
                            </div>
                            <div className="modal-body" style={{ fontSize: '20px', textAlign: 'center', color: '#19296B' }}>

                                {this.state.textoModal}
                            </div>
                            <div className="modal-footer">
                                <button onClick={(e) => this.handleModalSucesso()} type="button" className="btn btn-primary " style={{ fontSize: '15px', backgroundColor: '#DE0B0B', borderRadius: '10px' }}>OK</button>
                                {/* <button type="button" onClick={(e) => this.handleModal(1)} className="btn btn-secondary" data-dismiss="modal"></button> */}
                            </div>
                        </div>
                    </div>
                </div>


                <div className={this.state.mostrarModal ? "modal-open" : "modal"}>
                    <div className="modal-dialog" role="document">
                        <div style={{ backgroundColor: '#AEAEC0', borderRadius: '20px', textAlign: 'center' }} className="modal-content">
                            <div className="modal-header" style={{ paddingLeft: '6%' }}>
                                <h3 className="form-control " style={{ fontSize: '90px', color: 'red', textAlign: 'center' }}>Atenção</h3>
                                <button type="button" onClick={(e) => this.handleModalEntrada()} className="close" data-dismiss="modal" aria-label="Close">
                                    {/* <span aria-hidden="true">×</span> */}
                                </button>
                            </div>
                            <div className="modal-body" style={{ fontSize: '20px', textAlign: 'center', color: '#19296B' }}>

                                {this.state.textoModal}
                            </div>
                            <div className="modal-footer">
                                <button onClick={(e) => this.handleModalEntrada()} type="button" className="btn btn-primary " style={{ fontSize: '15px', backgroundColor: '#DE0B0B', borderRadius: '10px' }}>OK</button>
                                {/* <button type="button" onClick={(e) => this.handleModal(1)} className="btn btn-secondary" data-dismiss="modal"></button> */}
                            </div>
                        </div>
                    </div>
                </div>


                 <div className={this.state.mostrarModal ? "modal-open" : "modal"}>
                    <div className="modal-dialog" role="document">
                        <div style={{ backgroundColor: '#AEAEC0', borderRadius: '20px', textAlign: 'center' }} className="modal-content">
                            <div className="modal-header" style={{ paddingLeft: '6%' }}>
                                <h3 className="form-control " style={{ fontSize: '90px', color: 'red', textAlign: 'center' }}>Atenção</h3>
                                <button type="button" onClick={(e) => this.handleModalEntrada()} className="close" data-dismiss="modal" aria-label="Close">
                                    {/* <span aria-hidden="true">×</span> */}
                                </button>
                            </div>
                            <div className="modal-body" style={{ fontSize: '20px', textAlign: 'center', color: '#19296B' }}>

                                {this.state.textoModal}
                            </div>
                            <div className="modal-footer">
                                <button onClick={(e) => this.handleModalEntrada()} type="button" className="btn btn-primary " style={{ fontSize: '15px', backgroundColor: '#DE0B0B', borderRadius: '10px' }}>OK</button>
                                {/* <button type="button" onClick={(e) => this.handleModal(1)} className="btn btn-secondary" data-dismiss="modal"></button> */}
                            </div>
                        </div>
                    </div>
                </div>








                <div >
                    <div className="col-lg-12">
                        <h5 style={{
                            color: '#19296B',
                            // DIV DO CADASTRO
                            // border: ' 3px solid green',
                            textAlign: 'center'
                        }}>RESERVA DE DOCAS E ATENDIMENTO DA UNIDADE  {`${this.state.nomeSala}`}</h5>

                        < div className="col-lg 12" style={{ marginLeft: '5%', width: ' 90%', borderRadius: '10px' }}>
                            <hr></hr>
                        </div>

                        {/* <hr></hr>  */}
                    </div>

                    <div className="col-lg-12  " style={{
                        paddingLeft: '7%', paddingRight: '2%', textAlign: 'center'
                        // DIV GERAL DOS BOTÕES
                        // , border: ' 3px solid red'
                    }}>
                        <div className="row">

                            <div className="col-lg-3 "
                            // style={{ border: '3px solid red', paddingTop: '0%' }}
                            >

                                <h5 style={{ color: '#2A286B' }}>Mensagem</h5>
                                <div className="col-lg-12 contorno-botoes" style={{
                                    // backgroundColor: '#dbd9e4',
                                    // border: '1px solid blue',
                                    // backgroundColor: '#A08B9B',
                                    borderRadius: '10px', textAlign: 'center', height: 'calc(1.65em + 1.65rem + 0px)', width: '100%'
                                }}>

                                    <div className="row" style={{ paddingLeft: '4%', paddingRight: '25%', paddingTop: '4%' }}>

                                        <div className="col-lg-6" style={{ paddingLeft: '10%' }}>
                                            <div className="custom-control custom-radio">
                                                <input onChange={this.tipoDeMensagemSms} type="radio" id="customRadio1" name="customRadio" className="custom-control-input" defaultChecked />
                                                <label style={{ color: 'white' }} className="custom-control-label" htmlFor="customRadio1"><h5 style={{ color: '#19296B' }}>SMS</h5></label>
                                            </div>
                                        </div>


                                        <div className="col-lg-6" style={{ paddingLeft: '10%' }}>
                                            <div className="custom-control custom-radio">
                                                <input onChange={this.tipoDeMensagemWhats} type="radio" id="customRadio2" name="customRadio" className="custom-control-input" />
                                                <label style={{ color: 'white' }} className="custom-control-label" htmlFor="customRadio2"><h5 style={{ color: '#19296B' }}>WhatsApp</h5></label>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </div>


                            <div className="col-lg-2 " style={{
                                // // DIV DO TELEFONE
                                // border:'1px solid black',
                                paddingLeft: '1%', paddingRight: '1%', paddingTop: '0%'

                            }}> <h5
                                style={{ color: '#2A286B' }}

                            >Telefone</h5>
                                <div className="form-group  contorno-botoes" >
                                    <NumberFormat format="(##) #####-####" onChange={(e) => { this.handleTelefone(e) }} type="tel" className="form-control" value={this.state.telefone}
                                        style={{
                                            height: 'calc(1.35em + 1.35rem + 0px)',
                                            fontSize: '40px',
                                            // borderRadius: '10px',
                                            // backgroundColor: '#A08B9B',
                                            color: 'black'
                                        }}
                                    />

                                </div>



                            </div>


                            <div className="col-lg-1,5" style={{
                                paddingTop: "0%",
                                // DIV DA VAGAS
                                //  border:'1px solid black',
                                paddingLeft: '1%', paddingRight: '1%',
                            }}>
                                <h5 style={{ color: '#2A286B' }}>Vagas</h5>
                                <div className="form-group contorno-botoes">

                                    <select value={this.state.vagas} onChange={this.handleVagas} className="form-control" id="exampleSelect1" style={{ height: 'calc(1.35em + 1.35rem + 0px)', borderRadius: '10px', backgroundColor: '#A08B9B', color: 'black' }}>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                        <option value='6'>6</option>
                                        <option value='7'>7</option>
                                        <option value='8'>8</option>
                                        <option value='9'>9</option>
                                        <option value='10'>10</option>
                                    </select>
                                </div>

                            </div>
                            <div className="col-lg-3.5 "
                                style={{
                                    paddingLeft: '1%', paddingRight: '1%',
                                    // DIV DO PRIORIDADE ESPECIAL E PREFERENCIAL CAIXA GRANDE
                                    // border: '1px solid black',
                                    paddingTop: '0%'
                                }}
                            >
                                <h5 style={{ color: '#2A286B' }}>Prioridade</h5>

                                <div className="col-lg-12 contorno-botoes" style={{
                                    // border: '3px solid red',
                                    fontSize: '20px',
                                    backgroundColor: '#dbd9e4',
                                    // backgroundColor: '#A08B9B',
                                    borderRadius: '10px', textAlign: 'center', height: 'calc(1.4em + 1.4rem + 0px)', width: '100%'
                                }}>

                                    <div className="row" style={{ paddingRight: '16%', paddingTop: '4%' }}>
                                        <div className="col-lg-6" >
                                            <div className="custom-control custom-checkbox">
                                                <input onChange={(e) => { this.prioridadeEspecial(e) }} type="checkbox" className="custom-control-input" id="customCheck3" />
                                                <label style={{ color: 'white' }} className="custom-control-label" htmlFor="customCheck3"><h5 style={{ color: '#19296B' }}>ESPECIAL</h5></label>
                                            </div>
                                        </div>


                                        <div className="col-lg-6" >
                                            <div className="custom-control custom-checkbox">
                                                <input onChange={(e) => { this.prioridadePreferencial(e) }} type="checkbox" className="custom-control-input" id="customCheck4" />
                                                <label style={{ color: 'white' }} className="custom-control-label" htmlFor="customCheck4"><h5 style={{ color: '#19296B' }}>PREFERENCIAL</h5></label>
                                            </div>
                                        </div>


                                    </div>

                                </div>

                            </div>




                            <div className="col-lg-2 " style={{
                                // // DIV DO TELEFONE
                                // border: '1px solid black',
                                paddingLeft: '0%', paddingRight: '3%', paddingTop: '0%'

                            }}>
                                <h5
                                    style={{ color: '#19296B' }}>CADASTRAR</h5>

                                {/* {this.state.reservas.map(blocoCadastro => ( */}







                                <button
                                    style={{
                                        border: 'groove', height: 'calc(1.55em + 1.55rem + 0px)', paddingTop: '5%',
                                        // border: '2px solid blue',
                                        color: '#19296B',
                                        borderRadius: '10px', width: '88%', fontSize: '16px',
                                        //  border: '1px solid white',
                                    }}
                                    onClick={(e) => this.handleModalCadastrar(`Cadastro do cliente com o Telefone ${this.state.telefone}`, this.state.telefone, true)}
                                    style={{
                                        color: 'white', borderRadius: '10px', width: '90%', height: '54%',
                                        fontSize: '13px', backgroundColor: '#19296B'
                                    }} type="button" className="btn btn-warning  btn-sm">Cadastrar
                                    </button>






                                {/* className=" btn btn-sucess btn-sm contorno-botoes">{(this.state.clienteCadastrado) ? "" : "Cadastrando"} */}
                                {/* <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style={{ enableBackground: 'new 0 0 50 50' }} xmlSpace="preserve">
                                        <path fill="#132577" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                                            <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite" />
                                        </path>
                                    </svg>  */}
                                {/* </button> */}


                            </div>



                            {/* < div className="col-lg 12" style={{ paddingRight: '6%', paddingLeft: '2%', width: ' 91%', borderRadius: '10px', border: '5px sollid red' }}>
                            <hr></hr>
                        </div> */}










                        </div>
                        {/* < div className="col-lg 12" style={{ width: ' 97%' }}> */}

                        {/* <hr></hr> */}

                        {/* </div> */}


                    </div>


                </div >


                {/* <hr></hr> */}


                {/* INICIO DOS BOTOES DOS PAINEIS VAGAS DISPONIVEIS , VAGAS OCUPADAS E LISA DE ESPERA */}



                < div className="col-lg 12" style={{ marginLeft: '6%', width: ' 88%', borderRadius: '10px' }}>
                    <hr></hr>
                </div>


                < div className="col-lg-12 contorno-paineis"
                    style={{
                        // backgroundColor: '#EFFAAD',
                        width: '90%',
                        marginLeft: '6%',
                        // textAlign: 'center',
                        paddingBottom: '1%',
                        // DIV VAGAS DISPONIVEIS , VAGAS OCUPADAS E LISTA DE ESPERA
                        //  border: ' 2px solid red'
                    }
                    }

                >

                    <div className="row"
                        style={{ paddingLeft: '4%', paddingRight: '0%', paddingBottom: '0%', }}





                    // INICIO MODIFICAÇOES
                    >



                        <div className="col-lg-2"
                            style={{
                                width: '90%', height: '100%',
                                paddingLeft: '0%', paddingRight: '0%', marginRight: '3%',
                                // backgroundColor: '#2F0871',
                                // DIV DO VAGAS DISPONÍVEIS
                                // border: '5px solid black',
                                textAlign: 'center'
                            }}



                        // DIV PEQUENA DO VAGAS DISPONIVEIS


                        > <h5
                            style={{
                                // backgroundColor: '#e3e5ee', 
                                textAlign: 'center',
                                borderRadius: '10px', paddingTop: '0%', paddingBottom: '5%', color: '#2A286B', paddingRight: '5%',
                                // , border: '1px solid green'
                            }}
                        >TOTAL DE DOCAS DA UNIDADE</h5>


                            <div className="fundo-centralizado "
                            // DIV QUE ENVOLVE O BOTAO MAIOR DE BAIXO DO VAGAS DISPONIVEIS
                            //      style = {{ borderRadius: '18px', backgroundColor: '#2F0871', paddingLeft: '0%', paddingRight: '0%', paddingTop: '0%', color: 'white'
                            // , border: '2px solid yellow'
                            // }}
                            >


                                <div className=
                                    "sombra-total-vagas"
                                    style={{
                                        // borderBlockColor: 'blue',
                                        // border: '1px solid green',
                                        // backgroundColor: '#a9e2ba',
                                        // backgroundColor: '#0BD53A', 
                                        paddingTop: '3%', borderRadius: '10px',
                                        height: 'calc(1.5em + 1.5rem + 0px)'
                                        //  paddingLeft: '0%', paddingRight: '0%',


                                        // DIV AREA DENTRO DO BOTÃO VAGAS DISPONÍVEIS
                                        // border: '4px solid green'
                                    }}
                                > <h2 style={{
                                    borderRadius: '18px', paddingBottom: '5%', paddingTop: '3%',
                                    width: '80px', color: 'white', textAlign: 'center'
                                }}
                                >{this.state.quantidadeDeVagas}</h2>



                                </div>
                            </div>


                        </div>




                        <div className="col-lg-2  "
                            style={{
                                width: '80%', height: '80%',
                                paddingLeft: '1%', paddingRight: '1%',  marginRight: '3%',
                                // backgroundColor: '#2F0871',
                                // DIV DO VAGAS DISPONÍVEIS
                                // border: '5px solid black',
                                textAlign: 'center'
                            }}



                        // DIV PEQUENA DO VAGAS DISPONIVEIS


                        > <h5
                            style={{
                                // backgroundColor: '#e3e5ee', 
                                textAlign: 'center',
                                borderRadius: '10px', paddingTop: '0%', paddingBottom: '5%', color: '#2A286B'
                                // , border: '1px solid green'
                            }}
                        >TOTAL DE DOCAS DISPONÍVEIS</h5>


                            <div className="fundo-centralizado "
                            // DIV QUE ENVOLVE O BOTAO MAIOR DE BAIXO DO VAGAS DISPONIVEIS
                            //      style = {{ borderRadius: '18px', backgroundColor: '#2F0871', paddingLeft: '0%', paddingRight: '0%', paddingTop: '0%', color: 'white'
                            // , border: '2px solid yellow'
                            // }}
                            >


                                <div className=
                                    "sombra-ocupacao"
                                    style={{
                                        // borderBlockColor: 'blue',
                                        // border: '1px solid green',
                                        // backgroundColor: '#a9e2ba',
                                        // backgroundColor: '#0BD53A', 
                                        paddingTop: '4%', borderRadius: '10px',
                                        height: 'calc(1.5em + 1.5rem + 0px)',
                                        //  paddingLeft: '0%', paddingRight: '0%',


                                        // DIV AREA DENTRO DO BOTÃO VAGAS DISPONÍVEIS
                                        // border: '4px solid green'
                                    }}
                                > <h2 style={{
                                    borderRadius: '18px', paddingBottom: '5%', paddingTop: '3%',
                                    width: '80px', color: 'black', textAlign: 'center'
                                }}
                                >{this.state.disponiveis}</h2>



                                </div>
                            </div>


                        </div>







                        {/* TERMINO MODIFICACOES */}

                        <div className="col-lg-2 " style={{
                            paddingLeft: '1%', paddingRight: '1%',  marginRight: '3%',
                            // backgroundColor: '#2F0871',
                            // DIV DO VAGAS DISPONÍVEIS
                            // border: '5px solid black',
                            textAlign: 'center'
                        }}
                        > <h5


                            // DIV PEQUENA DO VAGAS OCUPADAS

                            style={{
                                textAlign: 'center',
                                // backgroundColor: '#e3e5ee',
                                borderRadius: '10px',
                                paddingTop: '0%', paddingBottom: '5%', color: '#2A286B'
                                //   ,  color: '#19296B'
                                // , border: '1px solid blue'
                            }}
                        >TOTAL DE DOCAS OCUPADAS</h5>

                            <div className="fundo-centralizado">




                                <div className=
                                    "sombra-desocupacao"
                                    style={{
                                        textAlign: 'center',
                                        backgroundColor: '#e2a9a9',
                                        // backgroundColor: '#0BD53A', 
                                        paddingTop: '3%', borderRadius: '10px',
                                        height: 'calc(1.5em + 1.5rem + 0px)',
                                        paddingLeft: '0%', paddingRight: '0%',

                                        // DIV AREA DENTRO DO BOTÃO VAGAS OCUPADAS
                                        // border: ' 1px solid red'
                                    }} > <h2 style={{
                                        textAlign: 'center',
                                        borderRadius: '18px', paddingBottom: '5%', paddingTop: '3%',
                                        width: '80px', color: 'black', textAlign: 'center'
                                    }}>{this.state.quantidadeDeVagas - this.state.disponiveis}</h2>



                                </div>
                                {/* </div> */}
                            </div>


                        </div>


                        {/* INICIO VAGAS RESERVADAS */}


                        {/* 
<div className="col-lg-2 " style={{
                            paddingLeft: '1%', paddingRight: '1%',
                            // backgroundColor: '#2F0871',
                            // DIV DO VAGAS DISPONÍVEIS
                            // border: '5px solid black',
                            textAlign: 'center'
                        }}> <h5


                            //  DIV PEQUENA DA LISTA DE ESPERA

                            style={{
                                // backgroundColor: '#e3e5ee',
                                //  borderRadius: '10px',  
                                paddingTop: '6%', paddingBottom: '3%', color: '#2A286B'
                                //   , color: '#19296B'
                                // , border: '1px solid yellow'
                            }}
                        >VAGAS RESERVADAS</h5>

                            <div className="fundo-centralizado">




                                <div className=
                                    "sombra-vagas-reservadas"
                                    style={{
                                        // backgroundColor: '#3A4F7C',
                                        // backgroundColor: '#e3e5ee', 
                                        paddingTop: '3%', borderRadius: '10px',
                                        height: 'calc(1.5em + 1.5rem + 0px)',
                                        paddingLeft: '0%', paddingRight: '0%',

                                        // DIV AREA DENTRO DO BOTÃO DO NUMERO DA LISTA DE RESERVAS
                                    }}
                                > <h2 style={{
                                    borderRadius: '18px', paddingBottom: '5%',
                                    width: '80px', color: 'black', textAlign: 'center'
                                }}>{this.state.vagasNotificadasDesocupar}</h2>



                                </div>
                            </div>


                        </div> */}


                        <div className="col-lg-2 " style={{
                            paddingLeft: '1%', paddingRight: '1%',  marginRight: '3%',
                            // backgroundColor: '#2F0871',
                            // DIV DO VAGAS DISPONÍVEIS
                            // border: '5px solid black',
                            textAlign: 'center'
                        }}> <h5


                            //  DIV PEQUENA DA LISTA DE ESPERA

                            style={{
                                // backgroundColor: '#e3e5ee',
                                //  borderRadius: '10px',  
                                paddingTop: '0%', paddingBottom: '5%', color: '#2A286B',
                                //   , color: '#19296B'
                                // , border: '1px solid yellow'
                            }}
                        >CLIENTES NOTIFICADOS</h5>

                            <div className="fundo-centralizado">




                                <div className=
                                    "sombra-notificados"
                                    style={{
                                        // backgroundColor: '#3A4F7C',
                                        // backgroundColor: '#e3e5ee', 
                                        paddingTop: '3%', borderRadius: '10px',
                                        height: 'calc(1.5em + 1.5rem + 0px)',
                                        paddingLeft: '0%', paddingRight: '0%',

                                        // DIV AREA DENTRO DO BOTÃO DO NUMERO DA LISTA DE RESERVAS
                                    }}
                                > <h2 style={{
                                    borderRadius: '18px', paddingBottom: '2%', paddingTop: '4%',
                                    width: '80px', color: 'white', textAlign: 'center'
                                }}>{this.state.quantidadeNotificada}</h2>



                                </div>
                                {/* </div> */}
                            </div>


                        </div>



                        {/* PAINEL ESPERA AGUARDANDO  */}


                        <div className="col-lg-2 " style={{
                            paddingLeft: '1%', paddingRight: '1%',  marginRight: '3%',
                            // backgroundColor: '#2F0871',
                            // DIV DO VAGAS DISPONÍVEIS
                            // border: '5px solid black',
                            textAlign: 'center'
                        }}> <h5


                            //  DIV PEQUENA DA LISTA DE ESPERA

                            style={{
                                // backgroundColor: '#e3e5ee',
                                //  borderRadius: '10px',  
                                paddingTop: '0%', paddingBottom: '5%', color: '#2A286B'
                                //   , color: '#19296B'
                                , textAlign: 'center'
                            }}
                        >AGUARDANDO NOTIFICAÇÃO</h5>

                            <div className="fundo-centralizado"  >


                                <div className=
                                    "sombra-aguardando"
                                    style={{
                                        // backgroundColor: '#3A4F7C',
                                        // backgroundColor: '#e3e5ee', 
                                        paddingTop: '3%', borderRadius: '10px',
                                        height: 'calc(1.5em + 1.5rem + 0px)',
                                        paddingLeft: '0%', paddingRight: '0%',

                                        // DIV AREA DENTRO DO BOTÃO DO NUMERO DALISTA DE RESERVAS
                                        // border: ' 1px solid yellow'
                                    }}
                                > <h2 style={{
                                    borderRadius: '18px', paddingBottom: '5%', paddingTop: '4%',
                                    width: '80px', color: 'black', textAlign: 'center'
                                }}>{this.state.quantidadeNaoNotificada}</h2>



                                </div>
                                {/* </div> */}
                            </div>


                        </div>




                        {/* 
                            <div className="col-lg-12" style={{paddingTop: '0%', height:'40%', width:'100%',
                            border:'1px solid black'
                        }}>
                        
                        
                        
                        
                        
                        
                        
                    </div> */}





                        <hr></hr>

                    </div>
                    <hr></hr>
                </div >



                {/* INÍCIO DOS BOTÕES ACESSO RÁPIDO PARA OCUPAR VAGAS E DESOCUPAR VAGAS */}

                {/* <hr></hr> */}







                <div className="col-lg-12" style={{
                    //   border: '2px solid black'
                }}>




                    < div className="col-lg 12" style={{ marginLeft: '4%', width: ' 92%', borderRadius: '10px', border: '5px sollid red' }}>
                        {/* <hr></hr> */}
                    </div>



                    <div className="col-lg-12"
                        style={{
                            paddingTop: '1%', paddingLeft: '3%', paddingRight: '7%', paddingBottom: '1%',
                            // backgroundColor: '#E6F9E9',
                            //  border: '1px solid red'
                        }}
                    >
                        <div className="row" style={{
                            // paddingTop: '2%', paddingLeft: '3%', paddingRight: '7%', paddingBottom: '1%',
                            // backgroundColor: '#E6F9E9',
                            //  border: '1px solid red'
                        }}>



                            <div className="col-lg-2 "
                                style={{ paddingLeft: '3%', paddingRight: '2%', paddingTop: '0%', paddingBottom: '0%', backgroundCollor: '#cdced6', borderRadius: '10px', textAlign: 'center' }}
                            ><h5 className="contorno-ocupar-desocupar"
                                style={{ backgroundColor: '#DADBE0', color: '#19296B', paddingTop: '4%', paddingBottom: '2%', borderRadius: '10px', textAlign: 'center', }}
                            >OCUPAR DOCA</h5>

                            </div>

                            <div className="col-lg-1" >


                                <button onClick={(e) => this.ocuparVagas(1)} type="button " className="btn btn-success btn-tamanho sombra-ocupacao" style={{ borderRadius: '10px' }}><h3>1</h3></button>

                            </div>



                            <div className="col-lg-1 ">
                                <button onClick={(e) => this.ocuparVagas(1)} type="button " className="btn btn-success btn-tamanho sombra-ocupacao" style={{ borderRadius: '10px' }}><h3>2</h3></button>


                            </div>
                            <div className="col-lg-1">
                                <button onClick={(e) => this.ocuparVagas(1)} type="button" className="btn btn-success btn-tamanho sombra-ocupacao" style={{ borderRadius: '10px' }}><h3>3</h3></button>


                            </div>
                            <div className="col-lg-1">
                                <button onClick={(e) => this.ocuparVagas(1)} type="button" className="btn btn-success btn-tamanho sombra-ocupacao" style={{ borderRadius: '10px' }}><h3>4</h3></button>


                            </div>
                            <div className="col-lg-1">
                                <button onClick={(e) => this.ocuparVagas(1)} type="button" className="btn btn-success btn-tamanho sombra-ocupacao" style={{ borderRadius: '10px' }}><h3>5</h3></button>


                            </div>
                            





                        </div>




                    </div>






                    <div className="col-lg-12"
                        style={{
                            paddingTop: '2%'
                            , paddingLeft: '3%', paddingRight: '7%', paddingBottom: '1%',
                            // backgroundColor: '#F9F0F0',
                            //  border: '1px solid red'
                        }}
                    >
                        <div className="row" >
                            <div className="col-lg-2"
                                style={{ paddingLeft: '3%', paddingRight: '2%', textAlign: 'center' }}><h5
                                    className="contorno-ocupar-desocupar"
                                    style={{ backgroundColor: '#DADBE0', color: '#19296B', paddingTop: '4%', paddingBottom: '2%', paddingLeft: '1%', paddingRight: '1%', borderRadius: '10px', textAlign: 'center' }}
                                >DESOCUPAR VAGAS</h5>

                            </div>

                            <div className="col-lg-1 " >

                                <button onClick={(e) => this.desocuparVagas(1)} type="button" className="btn  btn-danger btn-tamanho sombra-desocupacao" style={{ borderRadius: '10px' }}><h3>1</h3></button>


                            </div>
                            <div className="col-lg-1">
                                <button onClick={(e) => this.desocuparVagas(1)} type="button"  className="btn  btn-danger btn-tamanho sombra-desocupacao" style={{ borderRadius: '10px' }}><h3>2</h3></button>


                            </div>
                            <div className="col-lg-1">
                                <button onClick={(e) => this.desocuparVagas(1)} type="button"  className="btn  btn-danger btn-tamanho sombra-desocupacao" style={{ borderRadius: '10px' }}><h3>3</h3></button>


                            </div>
                            <div className="col-lg-1">
                                <button onClick={(e) => this.desocuparVagas(1)} type="button"  className="btn  btn-danger btn-tamanho sombra-desocupacao" style={{ borderRadius: '10px' }}><h3>4</h3></button>


                            </div>
                            <div className="col-lg-1">
                                <button onClick={(e) => this.desocuparVagas(1)} type="button"  className="btn  btn-danger btn-tamanho sombra-desocupacao" style={{ borderRadius: '10px' }}><h3>5</h3></button>


                            </div>
                



                        </div >


                    </div>

                </div>

                {/* DIV DA TABELA CLIENTES NOTIFICADOS */}

                <div className="col-lg-12" >
                    <h5 style={{
                        color: '', paddingTop: '1%', color: '#2A286B',
                        // border: ' 1px solid yellow',
                        textAlign: 'center'
                    }}>CLIENTES NOTIFICADOS</h5>




                </div>




                <div style={{

                    // border: ' 1px solid blue',
                    marginLeft: '2%', marginRight: '2%',
                    textAlign: 'center'
                }}>




                    <table class=" table table-sm table-striped table-round-corner table-condensed table-bordered ">
                        <thead class="table-sm  "
                        // style={{// border: ' 3px solid yellow',}}
                        >

                            <tr class=" table-th table-striped table-round-corner table-condensed table-bordered" style={{
                                backgroundColor: '#19296B',
                                // border: ' 3px solid yellow',

                            }}>
                                <th form-control scope="col "
                                //            
                                >ID </th>
                                <th scope="col"> Telefone</th>
                                <th scope="col"> Vagas</th>
                                <th scope="col">Realizar Entrada</th>

                                <th scope="col">Enviar Mensagem</th>
                                <th scope="col">Status</th>
                                <th scope="col">Tempo </th>
                                <th scope="col">Cancelar Reserva</th>
                                <th scope="col">Prioridade</th>

                            </tr>

                        </thead>
                        <tbody>
                            {this.state.reservas.map(blocoAtual => (
                                
                                blocoAtual.notificado == 1 ?
                                
                                <tr className="table-td table-round-corner table-striped table-condensed table-bordered td"
                                style={{
                                    backgroundColor: '#C6D0E0',
                                    // border: ' 3px solid yellow',
                                }} >
                                        <td scope="row" style={{
                                            textAlign: 'Left'
                                            // border: ' 3px solid yellow',
                                            
                                        }}>{blocoAtual.id}</td>
                                        <td > {blocoAtual.telefone}</td>
                                        <td >{blocoAtual.quantidadeVagas}</td>
                                        <td>  <button
                                            onClick={(e) => this.handleModalDeletar(`Realizando a entrada do cliente ID = ${blocoAtual.id}  telefone ${blocoAtual.telefone}`, blocoAtual.id, false)}
                                            
                                            //onClick={(e) => this.deletar(blocoAtual.id)}
                                            type="button" style={{
                                                color: 'white', borderRadius: '10px', width: '80%', height: '70%',
                                                fontSize: '13px', backgroundColor: '#2C9B08'
                                            }} className="btn btn-sucess  btn-sm">Realizar Entrada</button>
                                        </td>

                                        <td>  <button
                                            //  onClick={(e) => this.enviarNotificacao(blocoAtual.telefone)}
                                            onClick={(e) => this.handleModalNotificar(`Enviar mensagem de atraso para o cliente telefone = ${blocoAtual.telefone}, ID = ${blocoAtual.id} `, blocoAtual.telefone, false)}
                                            style={{
                                                color: 'white', borderRadius: '10px', width: '80%', height: '70%',
                                                fontSize: '13px', backgroundColor: '#D69419'
                                            }} type="button" className="btn btn-warning  btn-sm">Enviar Mensagem</button></td>

                                            {this.state.aviso == 0 ?
                                        <td>{ "Não notificado" }</td>
                                        :
                                        <td>{ "Notificado"}</td>
                                            }
                                        {/* <td>{blocoAtual.notificadoHora} {blocoAtual.data}</td> */}
                                        <td class="largura-coluna"> <Contador ></Contador></td>
                                        {/* <td>  <button onClick={(e) => this.realizarEntrada(blocoAtual.id)} type="button" style={{
                                            color: 'white', borderRadius: '10px', width: '100%', height: '35%',
                                            fontSize: '12px', backgroundColor: '#0AC15F'
                                        }} className="btn btn-danger  btn-sm">Realizar entrada</button>  </td> */}




                                        <td >
                                            <button
                                                onClick={(e) => this.handleModalDeletar(`Cancelando a reserva do cliente com identificação ID = ${blocoAtual.id}. O cliente receberá uma mensagem de cancelamento`, blocoAtual.id, true)}
                                                
                                                //onClick={(e) => this.deletar(blocoAtual.id)}
                                                type="button" style={{
                                                    color: 'white', borderRadius: '10px', width: '80%', height: '70%',
                                                    fontSize: '13px', backgroundColor: '#DE3535'
                                                }} className="btn btn-danger  btn-sm">Exluir Reserva</button>
                                        </td>



                                        {/* verde  #DE3535 */}


                                        {/* estou comentando o cancelar reserva para teste */}
                                        {/* <td>  <button onClick={(e) => this.deletar(blocoAtual.id)} type="button" style={{
                                            color: 'white', borderRadius: '10px', width: '100%', height: '35%',
                                            fontSize: '12px', backgroundColor: '#DE3535'
                                        }} className="btn btn-danger  btn-sm">Cancelar reserva</button> 
                                    </td> */}
                                        <td>{blocoAtual.prioridade == 3 ? "Especial" : blocoAtual.prioridade == 1 ? "Preferencial" : "Normal"}</td>


                                        {/* <td>{blocoAtual.id}</td> */}

                                    </tr>
                                    : false
                                    
                                    
                                    ))}






                        </tbody>

                    </table>


                </div>




            </div >






        )

    }

}

export default AtendimentoDesktopDocas;
