import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format'
import qs from 'qs'

import Contador from '../Components/Contador 1'

class AtendimentoMobile extends React.Component {
    constructor() {
        super();
        this.state = {

        disponiveis: 0,
        curTime : null,
        quantidadeDeVagas: 0,
        telefone: null,
        tipoDeMensagem: 2,
        vagas: 1,
        qtdNNotificada: 0,
        mensagemBemVindo: null,
        clienteCadastrado: false,
        prioridade: 0,
        prioridadeEspecial: false,
        prioridadePreferencial: false,
        reservas: [],
        mostrarModalDeletar: false,
        mostrarModal: false,
        notificado: 0,
        quantidadeNotificada: 0,
        ValorVagasPendentes: 0,
        VagasNotificadasDesocupar: 0


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

        var vagasNotificadasDesocupar = 0;
        for (let i = 0; i < this.state.reservas.length; i++) {
            if (this.state.reservas[i].notificado == 1) {

                vagasNotificadasDesocupar = vagasNotificadasDesocupar + this.state.reservas[i].quantidadeVagas;
            }
        }
        this.setState({
            vagasNotificadasDesocupar: vagasNotificadasDesocupar
        })
        this.calcularNaoNotificados()
    }

    calcularNaoNotificados = () => {

        var quantidadeNaoNotificada = 0;
        for (let i = 0; i < this.state.reservas.length; i++) {
            if (this.state.reservas[i].notificado == 0) {

                quantidadeNaoNotificada = quantidadeNaoNotificada + 1;
            }
        }
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

            this.setState({
                mostrarModalDeletar: false
            })

        }).catch(erroResposta => {


        })




    }


    realizarEntrada = (id) => {
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



    componentDidMount() {

        setInterval( () => {
            // this.setState({
            //   curTime : new Date().toLocaleString()
            // })
 
            this.atualizaValores()
            this.atualizar()
            this.atualizaVagasPendentes()



          },5000000)

        this.setState({
            nomeSala: localStorage.getItem('app-token-sala')
        }, () => {
            this.atualizaValores()
            this.atualizaVagasPendentes()

            console.log("entrou em componente didmount valor de Vagas Pendentes ", this.state.vagasPendentes)
        })

        this.atualizar();
    }
    
    
    
 
    handleModalVagasLivres = (e) => {
        this.setState({
            mostrarModal: !this.state.mostrarModal,
            textoModal: e,

        })
    }


    criarReserva = (e) => {
        var prioridade = 0;
        if (this.state.prioridadePreferencial == true) {
            prioridade = 1
        }
        else if (this.state.prioridadeEspecial == true) {
            prioridade = 3
        }

        if (this.state.disponiveis < this.state.vagas) {

            axios.post('https://banco-gestao.herokuapp.com/reservas', {
                nomeSala: this.state.nomeSala,
                telefone: this.state.telefone.replace(" ", ""),
                prioridade: prioridade,
                quantidadeVagas: this.state.vagas,
                tipoDeMensgem: this.state.tipoDeMensagem,
                notificado: this.state.notificado

            }).then(response => {
                this.enviarMensagem()
                this.atualizar()
                this.atualizaValores()


            }).catch(erroResposta => {


            })
        } else {
            // alert("NÃO HÁ NECESSIDADE DE CADASTRO");
             this.handleModalVagasLivres(`Não há necessidade de cadastro Existem vagas disponíveis`, ) 


        }



    }


    ocuparVagas = (e) => {

        axios.put('https://banco-gestao.herokuapp.com/atendimento/ocupar', {
            nomeSala: this.state.nomeSala,
            ocupado: e



        }).then(response => {
            this.atualizaValores()



        }).catch(erroResposta => {


        })



    }

    desocuparVagas = (e) => {


        axios.put('https://banco-gestao.herokuapp.com/atendimento/desocupar', {
            nomeSala: this.state.nomeSala,
            ocupado: e



        }).then(response => {
            this.atualizaValores()
            this.atualizar()
            this.atualizaVagasPendentes()



        }).catch(erroResposta => {


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
            deletar: tipo
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

    enviarMensagem = () => {
        var mensagem;
        if (this.state.tipoDeMensagem == 2) {
            if (this.state.prioridadeEspecial == true && this.state.prioridadePreferencial == true) {
                alert("Selecione somente uma prioridade!")
                return

            } else if (this.state.prioridadeEspecial == false && this.state.prioridadePreferencial == false) {
                mensagem = `Parabéns, ação,  ${this.state.vagas} vagas foi efetuada`
            } else if (this.state.prioridadePreferencial == true) {
                mensagem = `Parabéns, ação, ${this.state.vagas} vagas preferencial reservada`
            } else {
                mensagem = `Parabéns, ação, ${this.state.vagas} vagas especial foi efetuada`
            }
            console.log("vagas final: ", this.state.vagas)
            console.log("mensagem final: ", mensagem)
            console.log("prioridade Especial final: ", this.state.prioridadeEspecial)
            console.log("prioridade Preferencial final: ", this.state.prioridadePreferencial)


            axios.get(`https://api.smsdev.com.br/send?key=EQWA87EF4NXQHNB7QPYOP15ZTZCKR373V9N5C6IUYPMBV1GATRBWWKH8P9V0BMJ0WKVUTU1OEKZK3MANQOHOOPCLII5OS1UU9I6PWIY7CBH06SVGXCOZBVLF21IMWWJN&type=9&number=${this.state.telefone}&msg=${mensagem}`)

                .then(response => {
                    this.setState({
                        clienteCadastrado: true,
                        telefone: null,
                        vagas: 1

                    })
                    console.log(response)
                    if (response.data.codigo == 407) {
                        console.log("entrouuuu")
                        alert("Numero de telefone não existe!")

                    }
                    console.log("A mensagem foi:", this.state.mensagemBemVindo);
                    console.log("O valor da variavel prioridade foi:", this.state.prioridade);
                    // console.log("Sucecsso", response);
                }).catch(erro => {
                    console.log("errorrr", erro)

                })

        } else {
            alert("A funcionalidade de whats app esta em construção! Use SMS!")
        }
    }


    tipoDeMensagemWhats = () => {
        this.setState({
            tipoDeMensagem: 1
        })


    }



    tipoDeMensagemSms = () => {
        console.log("Funcao sms")
        this.setState({
            tipoDeMensagem: 2
        })
    }

    //


    render() {


        return (


            // COMEÇANDO O DESKTOP
            <div className="intro-mobile ">



                <div className={this.state.mostrarModal ? "modal-open" : "modal"}>
                    <div className="modal-dialog" role="document">
                        <div style={{ backgroundColor: '#EBECEE' }} className="modal-content">
                            <div className="modal-header">
                                <h3 className="form-control " style={{ fontSize: '30px', color: 'red', textAlign: 'center' }}>Atenção</h3>
                                <button type="button" onClick={(e) => this.handleModalVagasLivres(1)} className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ fontSize: '20px', textAlign: 'center', color: '#19296B' }}>

                                {this.state.textoModal}
                            </div>
                            <div className="modal-footer">
                                <button onClick={(e) => this.handleModalVagasLivres(1)} type="button" className="btn btn-primary " style={{ fontSize: '15px', backgroundColor: '#DE0B0B', borderRadius: '10px' }}>Ok</button>
                                {/* <button type="button" onClick={(e) => this.handleModal(1)} className="btn btn-secondary" data-dismiss="modal"></button> */}
                            </div>
                        </div>
                    </div>
                </div>


                <div className={this.state.mostrarModalDeletar ? "modal-open" : "modal"}>
                    <div className="modal-dialog" role="document">
                        <div style={{ backgroundColor: '#EBECEE' }} className="modal-content">
                            <div className="modal-header">
                                <h3 className="form-control" style={{ color: 'red', textAlign: 'center' }}>Atenção</h3>
                                {/* <button type="button" onClick={(e) => this.handleModalDeletar(1)} className="close" data-dismiss="modal" aria-label="Close">
                                     <span aria-hidden="true">×</span>
                                     </button> */}
                            </div>
                            <div className="modal-body" style={{ textAlign: 'center', color: '#19296B', fontSize: '20px' }}>

                                {this.state.textoModal}
                            </div>
                            {this.state.deletar == true ?
                                <div className="modal-footer">
                                    <div className="col-lg-12">
                                        <div>
                                            <button onClick={(e) => this.deletar(this.state.idDeletar)} type="button" className="btn btn-primary" style={{ marginLeft: '3%', fontSize: '15px', backgroundColor: '#25930A', borderRadius: '10px' }}>Cancelar Reserva</button>
                                            <button type="button" onClick={(e) => this.handleModalDeletar(1)} className="btn btn-secondary" style={{ marginLeft: '10%', fontSize: '15px', color: 'white', backgroundColor: '#E32A2A', borderRadius: '10px' }} data-dismiss="modal">Manter Reserva</button>
                                        </div>
                                    </div>
                                </div>
                                :

                                <div className="modal-footer">
                                    <div className="col-lg-12">
                                        <div>
                                            <button onClick={(e) => this.realizarEntrada(this.state.idDeletar)} type="button" className="btn btn-primary" style={{ marginLeft: '3%', fontSize: '15px', backgroundColor: '#25930A', borderRadius: '10px' }}>Realizar Entrada</button>
                                            <button type="button" onClick={(e) => this.handleModalDeletar(1)} className="btn btn-secondary" style={{ marginLeft: '6%', fontSize: '15px', color: 'white', backgroundColor: '#E32A2A', borderRadius: '10px' }} data-dismiss="modal">Cancelar Entrada</button>
                                        </div>
                                    </div>
                                </div>

                            }
                        </div>
                    </div>
                </div>



                <div >
                    <div className="col-lg-12">
                        <h5 style={{
                            paddingTop: '0%',
                            color: '#132577',
                            // DIV DO CADASTRO
                            // border: ' 1px solid yellow',
                            textAlign: 'center'
                        }}>RESERVA DE VAGAS E ATENDIMENTO DA {`${this.state.nomeSala}`}</h5>

                        < div className="col-lg 12" style={{ width: ' 1%', borderRadius: '10px', }}>
                        </div>

                        <hr></hr>
                    </div>

                    <div className="col-lg-12  "
                        style={{
                            paddingLeft: '5%', paddingRight: '5%', textAlign: 'center'
                            // DIV GERAL DOS BOTÕES
                            // , border: ' 1px solid blue'
                        }}
                    >





                        <div className="col-lg-12 "
                            style={{
                                // DIV DO TELEFONE
                                marginBottom: '0%',
                                // border:'1px solid black',
                                paddingLeft: '5%', paddingRight: '4%', paddingTop: '0%'

                            }}
                        > <h5
                            style={{ color: '#2A286B' }}

                        >Telefone</h5>
                            <div className="form-group contorno-botoes-mobile" >
                                <NumberFormat format="(##) #####-####" onChange={(e) => { this.handleTelefone(e) }} type="tel" className="form-control" value={this.state.telefone}
                                    style={{
                                        width: '100%',
                                        height: 'calc(1.20em + 1.20rem + 0px)',
                                        fontSize: '40px',
                                        borderRadius: '10px',
                                        // backgroundColor: '#A08B9B',
                                        color: 'black'
                                    }}
                                />

                            </div>

                        </div>
                        <div className="col-lg-12 "
                            style={{ paddingTop: '0%' }}
                        >

                            <h5 style={{ color: '#2A286B' }}>Mensagem</h5>
                            <div className=" contorno-botoes-mobile" style={{
                                // height: 'calc(1.65em + 1.65rem + 0px)',
                                // fontSize: '40px',
                                // borderRadius: '10px',
                                // backgroundColor: '#A08B9B',
                                // color: 'black',
                                // backgroundColor: '#dbd9e4',

                                // border: '1px solid blue',
                                // backgroundColor: '#A08B9B',
                                borderRadius: '10px', textAlign: 'center', height: 'calc(1.45em + 1.45rem + 0px)', width: '100%'
                            }}>

                                <div className="row fundo-centralizado" style={{ height: 'calc(1.65em + 1.65rem + 0px)' }}>

                                    <div >
                                        <div className="custom-control custom-radio">
                                            <input onChange={this.tipoDeMensagemSms} type="radio" id="customRadio1" name="customRadio" className="custom-control-input" defaultChecked />
                                            <label style={{ color: 'white' }} className="custom-control-label" htmlFor="customRadio1"><h5 style={{ color: '#19296B' }}>SMS</h5></label>
                                        </div>
                                    </div>

                                    <div style={{ width: '30px' }}></div>

                                    <div>
                                        <div className="custom-control custom-radio">
                                            <input onChange={this.tipoDeMensagemWhats} type="radio" id="customRadio2" name="customRadio" className="custom-control-input" />
                                            <label style={{ color: 'white' }} className="custom-control-label" htmlFor="customRadio2"><h5 style={{ color: '#19296B' }}>WhatsApp</h5></label>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>
                        <div className="col-lg-1,5"
                            style={{
                                paddingTop: "5%", textAlign: 'center', paddingLeft: '5%',
                                // DIV DA VAGAS
                                //  border:'1px solid blue',
                                height: 'calc(2.7em + 2.7rem + 20px)',
                            }}
                        >

                            <h5 style={{ textAlign: 'center', color: '#2A286B' }}>Vagas</h5>
                            <div className="contorno-botoes-mobile"
                                style={{
                                    textAlign: 'center',
                                    // height: 'calc(1.35em + 1.35rem + 0px)',
                                    // fontSize: '21px',
                                    // borderRadius: '10px',
                                    // backgroundColor: '#A08B9B',
                                    color: 'black', width: '95%',
                                    // border: '2px solid blue'
                                }}
                            >

                                <select value={this.state.vagas} onChange={this.handleVagas} className="form-control" id="exampleSelect1" style={{ fontSize: '60px', paddingLeft: '2%', width: '100%', height: 'calc(1.3em + 1.3rem + 0px)', borderRadius: '10px', color: 'black' }}>
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
                                paddingLeft: '4%', paddingRight: '0%',
                                // DIV DO PRIORIDADE ESPECIAL E PREFERENCIAL CAIXA GRANDE
                                // border:'1px solid black',
                                paddingBottom: '6%'
                            }}
                        >
                            <h5 style={{ color: '#2A286B' }}>Prioridade</h5>

                            <div className="col-lg-12 contorno-botoes" style={{
                                fontSize: '20px', paddingTop: '2%',
                                backgroundColor: '#dbd9e4',
                                // backgroundColor: '#A08B9B',
                                borderRadius: '10px', textAlign: 'center', height: 'calc(1.8em + 1.8rem + 0px)', width: '96%'
                            }}>

                                <div className="row " style={{ height: 'calc(1.65em + 1.65rem + 0px)' }}>
                                    <div className="col-lg-6" >
                                        <div className="custom-control custom-checkbox">
                                            <input onChange={(e) => { this.prioridadeEspecial(e) }} type="checkbox" className="custom-control-input" id="customCheck1" />
                                            <label style={{ color: 'white' }} className="custom-control-label" htmlFor="customCheck1"><h5 style={{ color: '#19296B' }}>ESPECIAL</h5></label>
                                        </div>
                                    </div>


                                    <div className="col-lg-6" >
                                        <div className="custom-control custom-checkbox">
                                            <input onChange={(e) => { this.prioridadePreferencial(e) }} type="checkbox" className="custom-control-input" id="customCheck2" />
                                            <label style={{ color: 'white' }} className="custom-control-label" htmlFor="customCheck2"><h5 style={{ color: '#19296B' }}>PREFERENCIAL</h5></label>
                                        </div>
                                    </div>


                                </div>

                            </div>

                        </div>

                        <div className="col-lg-2 "
                            style={{
                                // DIV DO CADASTRAR
                                // border: '1px solid black',
                                paddingTop: '2%',paddingLeft: '4%', paddingRight: '4%'

                            }}
                        >
                            <h5
                                style={{ color: '#19296B' }}>CADASTRAR</h5>


                            <button onClick={this.criarReserva} type="button "


                                style={{
                                    border: 'groove', height: 'calc(1.45em + 1.45rem + 0px)',
                                     border: '2px solid green', 

                                    // color: '#19296B',
                                    borderRadius: '10px', width: '100%', fontSize: '18px',
                                    // backgroundColor: '#06B114',
                                    //  border: '1px solid white',
                                    //  backgroundColor: '#4A436E'

                                }}



                                className="btn btn-sucess  btn-sm contorno-botoes">{(this.state.clienteCadastrado) ? "FOI ENVIADO" : "Confirmar"}</button>






                        </div>









                        < div className="col-lg 12" style={{ width: ' 96%', borderRadius: '10px', border: '5px sollid red' }}>

                            <hr></hr>

                        </div>



                    </div>


                </div>





                {/* Começando o IPAD */}

                {/* 
                <div className="atendimento-ipad " >
                    <div className="col-lg-12">
                        <h5 style={{
                            color: '#132577',
                            // DIV DO CADASTRO
                            // border: ' 1px solid yellow',
                            textAlign: 'center'
                        }}>RESERVA DE VAGAS E ATENDIMENTO DA {`${this.state.nomeSala}`}</h5>


                        <hr></hr> 
                    </div>

                    <div className="col-lg-12  " style={{
                        paddingLeft: '5%', paddingRight: '2%', textAlign: 'center'
                        // DIV GERAL DOS BOTÕES
                        // , border: ' 1px solid black'
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

                                    <div className="row" style={{ paddingLeft: '1%', paddingRight: '25%', paddingTop: '6%' }}>

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
                                        style={{height: 'calc(1.35em + 1.35rem + 0px)',
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

                                    <select value={this.state.vagas} onChange={this.handleVagas} className="form-control" id="exampleSelect1" style={{ height: 'calc(1.35em + 1.35rem + 0px)',borderRadius: '10px', backgroundColor: '#A08B9B', color: 'black' }}>
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
                                    // border:'1px solid black',
                                    paddingTop: '0%'
                                }}
                            >
                                <h5 style={{ color: '#2A286B' }}>Prioridade</h5>

                                <div className="col-lg-12 contorno-botoes" style={{
                                    fontSize: '20px',
                                    backgroundColor: '#dbd9e4',
                                    // backgroundColor: '#A08B9B',
                                    borderRadius: '10px', textAlign: 'center', height: 'calc(1.4em + 1.4rem + 0px)', width: '100%'
                                }}>

                                    <div className="row" style={{ paddingRight: '16%', paddingTop: '5%' }}>
                                        <div className="col-lg-6" >
                                            <div className="custom-control custom-checkbox">
                                                <input onChange={(e) => { this.prioridadeEspecial(e) }} type="checkbox" className="custom-control-input" id="customCheck1" />
                                                <label style={{ color: 'white' }} className="custom-control-label" htmlFor="customCheck1"><h5 style={{ color: '#19296B' }}>ESPECIAL</h5></label>
                                            </div>
                                        </div>


                                        <div className="col-lg-6" >
                                            <div className="custom-control custom-checkbox">
                                                <input onChange={(e) => { this.prioridadePreferencial(e) }} type="checkbox" className="custom-control-input" id="customCheck2" />
                                                <label style={{ color: 'white' }} className="custom-control-label" htmlFor="customCheck2"><h5 style={{ color: '#19296B' }}>PREFERENCIAL</h5></label>
                                            </div>
                                        </div>


                                    </div>

                                </div>

                            </div>

                            <div className="col-lg-2 "
                                style={{
                                    // DIV DO CADASTRAR
                                    // border: '1px solid black',
                                    paddingTop: '0%', paddingLeft: '1%', paddingRight: '2%'

                                }}
                            >
                                <h5
                                    style={{ color: '#19296B' }}>CADASTRAR</h5>


                                <button onClick={this.criarReserva} type="button "
                                    style={{
                                        border: 'groove', height: 'calc(1.45em + 1.45rem + 0px)',
                                        //  border: '2px solid blue',

                                        color: '#19296B',
                                        borderRadius: '10px', width: '100%', fontSize: '18px',
                                        // backgroundColor: '#06B114',
                                        //  border: '1px solid white',
                                        //  backgroundColor: '#4A436E'

                                    }}



                                    className="btn btn-outline-success contorno-botoes">{(this.state.clienteCadastrado) ? "FOI ENVIADO" : "Confirmar"}</button>



                            </div>









                        </div>

                <hr></hr>



                    </div>


                </div> */}


                {/* INICIO DOS BOTOES DOS PAINEIS VAGAS DISPONIVEIS , VAGAS OCUPADAS E LISA DE ESPERA */}


                <div className="col-lg-12 contorno-paineis"
                    style={{
                        // backgroundColor: '#EFFAAD',
                        // width: '90%',
                        // marginLeft: '7%',
                        // textAlign: 'center',
                        // paddingBottom: '0%',
                        // DIV VAGAS DISPONIVEIS , VAGAS OCUPADAS E LISTA DE ESPERA
                        // border: ' 2px solid red'
                    }}

                >

                    <div className="row"
                    // style={{ paddingLeft: '4%', paddingRight: '9%', paddingBottom: '0%', }}





                    // INICIO MODIFICAÇOES
                    >

                        <div className="col-lg-3  "
                            style={{
                                width: '50%', height: '80%',
                                paddingLeft: '3%', paddingRight: '3%',
                                // backgroundColor: '#2F0871',
                                // DIV DO VAGAS DISPONÍVEIS
                                // border: '5px solid black',
                                textAlign: 'center'
                            }}



                        // DIV PEQUENA DO VAGAS DISPONIVEIS


                        > <h6
                            style={{
                                // backgroundColor: '#e3e5ee', 
                                textAlign: 'center',
                                borderRadius: '10px', paddingTop: '6%', paddingBottom: '5%', color: '#2A286B'
                                // , border: '1px solid green'
                            }}
                        >VAGAS <br>
                                </br> DISPONÍVEIS</h6>


                            <div className="fundo-centralizado "
                                // DIV QUE ENVOLVE O BOTAO MAIOR DE BAIXO DO VAGAS DISPONIVEIS
                                style={{
                                    paddingLeft: '0%', paddingRight: '0%', paddingTop: '0%', color: 'white'
                                    // , border: '2px solid yellow'
                                }}
                            >


                                <div className=
                                    "sombra-ocupacao"
                                    style={{
                                        // border: '2px solid blue',
                                        // borderBlockColor: 'blue',

                                        paddingTop: '4%', borderRadius: '10px',
                                        height: 'calc(1.5em + 1.5rem + 0px)',
                                        //  paddingLeft: '0%', paddingRight: '0%',


                                        // DIV AREA DENTRO DO BOTÃO VAGAS DISPONÍVEIS
                                        // border: '4px solid green'
                                    }}
                                > <h2 style={{
                                    borderRadius: '18px', paddingBottom: '0%',
                                    width: '80px', color: 'black', textAlign: 'center'
                                }}
                                >{this.state.disponiveis}</h2>



                                </div>
                                {/* </div> */}
                            </div>


                        </div>




                        {/* NOVA VAGAS OCUPADAS - MODIFICAÇÕES */}


                        <div className="col-lg-3  "
                            style={{
                                width: '50%', height: '80%',
                                paddingLeft: '3%', paddingRight: '3%',
                                // backgroundColor: '#2F0871',
                                // DIV DO VAGAS DISPONÍVEIS
                                // border: '5px solid black',
                                textAlign: 'center'
                            }}



                        // DIV PEQUENA DO VAGAS DISPONIVEIS


                        > <h6
                            style={{
                                // backgroundColor: '#e3e5ee', 
                                textAlign: 'center',
                                borderRadius: '10px', paddingTop: '6%', paddingBottom: '5%', color: '#2A286B'
                                // , border: '1px solid green'
                            }}
                        >VAGAS <br>
                                </br> OCUPADAS</h6>


                            <div className="fundo-centralizado "
                                // DIV QUE ENVOLVE O BOTAO MAIOR DE BAIXO DO VAGAS DISPONIVEIS
                                style={{
                                    paddingLeft: '0%', paddingRight: '0%', paddingTop: '0%', color: 'white'
                                    // , border: '2px solid BLUE'
                                }}
                            >


                                <div className=
                                    "sombra-desocupacao"
                                    style={{
                                        // borderBlockColor: 'blue',

                                        paddingTop: '4%', borderRadius: '10px',
                                        height: 'calc(1.5em + 1.5rem + 0px)',
                                        //  paddingLeft: '0%', paddingRight: '0%',


                                        // DIV AREA DENTRO DO BOTÃO VAGAS DISPONÍVEIS
                                        // border: '4px solid green'
                                    }}
                                > <h2 style={{
                                    borderRadius: '18px', paddingBottom: '0%',
                                    width: '80px', color: 'black', textAlign: 'center'
                                }}
                                >{this.state.quantidadeDeVagas - this.state.disponiveis}</h2>



                                </div>
                                {/* </div> */}
                            </div>


                        </div>



                        {/* TERMINO MODIFICACOES */}


                        {/* INICIO CLIENTES NOTIFICADOS VERSAÃO NOVA */}

                        <div className="col-lg-3  "
                            style={{
                                width: '50%', height: '80%',
                                paddingLeft: '1%', paddingRight: '1%',
                                // backgroundColor: '#2F0871',
                                // DIV DO VAGAS DISPONÍVEIS
                                // border: '5px solid black',
                                textAlign: 'center'
                            }}



                        // DIV PEQUENA DO VAGAS DISPONIVEIS


                        > <h6
                            style={{
                                // backgroundColor: '#e3e5ee', 
                                textAlign: 'center',
                                borderRadius: '10px', paddingTop: '6%', paddingBottom: '5%', color: '#2A286B'
                                // , border: '1px solid green'
                            }}
                        >CLIENTES <br>
                                </br>NOTIFICADOS</h6>


                            <div className="fundo-centralizado "
                                // DIV QUE ENVOLVE O BOTAO MAIOR DE BAIXO DO VAGAS DISPONIVEIS
                                style={{
                                    color: 'white'
                                    // , border: '2px solid BLUE'
                                }}
                            >


                                <div className=
                                    "sombra-espera"
                                    style={{
                                        // borderBlockColor: 'blue',

                                        paddingTop: '4%', borderRadius: '10px',
                                        height: 'calc(1.5em + 1.5rem + 0px)',
                                        //  paddingLeft: '0%', paddingRight: '0%',


                                        // DIV AREA DENTRO DO BOTÃO VAGAS DISPONÍVEIS
                                        // border: '4px solid green'
                                    }}
                                > <h2 style={{
                                    borderRadius: '18px', paddingBottom: '0%',
                                    width: '80px', color: 'black', textAlign: 'center'
                                }}
                                >{this.state.quantidadeNotificada}</h2>



                                </div>
                                {/* </div> */}
                            </div>


                        </div>



                        {/* TERMINO CLIENTES NOTIFICADOS VERSAÃO NOVA */}





                        {/* PAINEL ESPERA AGUARDANDO  */}



                        {/* INICIO PAINEL AGUANDANDO NOVIFICACAO VERSAO NOVA */}


                        <div className="col-lg-3  "
                            style={{
                                width: '50%', height: '80%',
                                paddingLeft: '1%', paddingRight: '1%',
                                // backgroundColor: '#2F0871',
                                // DIV DO VAGAS DISPONÍVEIS
                                // border: '5px solid black',
                                textAlign: 'center'
                            }}



                        // DIV PEQUENA DO VAGAS DISPONIVEIS


                        > <h6
                            style={{
                                // backgroundColor: '#e3e5ee', 
                                textAlign: 'center',
                                borderRadius: '10px', paddingTop: '6%', paddingBottom: '5%', color: '#2A286B'
                                // , border: '1px solid green'
                            }}
                        >AGUARDANDO <br></br>NOTIFICAÇÃO</h6>


                            <div className="fundo-centralizado "
                                // DIV QUE ENVOLVE O BOTAO MAIOR DE BAIXO DO VAGAS DISPONIVEIS
                                style={{
                                    color: 'white'
                                    // , border: '2px solid BLUE'
                                }}
                            >


                                <div className=
                                    "sombra-aguardando"
                                    style={{
                                        // borderBlockColor: 'blue',

                                        paddingTop: '4%', borderRadius: '10px',
                                        height: 'calc(1.5em + 1.5rem + 0px)',
                                        //  paddingLeft: '0%', paddingRight: '0%',


                                        // DIV AREA DENTRO DO BOTÃO VAGAS DISPONÍVEIS
                                        // border: '4px solid green'
                                    }}
                                > <h2 style={{
                                    borderRadius: '18px', paddingBottom: '0%',
                                    width: '80px', color: 'black', textAlign: 'center'
                                }}
                                >{this.state.quantidadeNaoNotificada}</h2>



                                </div>
                                {/* </div> */}
                            </div>


                        </div>


                        {/* TERMINO PAINEL AGUARDANDO NOTIFICACAO VERSAO NOVA */}




                    </div>





                    {/* 
                            <div className="col-lg-12" style={{paddingTop: '0%', height:'40%', width:'100%',
                            border:'1px solid black'
                        }}>
                        
                        
                        
                        
                        
                        
                        
                    </div> */}







                </div>



                {/* INÍCIO DOS BOTÕES ACESSO RÁPIDO PARA OCUPAR VAGAS E DESOCUPAR VAGAS */}

                {/* <hr></hr> */}







                <div className="col-lg-12" style={{
                    // border: '1px solid yellow'
                }}>


                    < div className="col-lg 12" style={{ width: ' 100%', borderRadius: '10px' }}>
                        <hr></hr>
                    </div>

                    {/* <div className="col-lg-12 row fundo-centralizado"
                        style={{ width: ' 100%', textAlign: 'center',
                            paddingTop: '0%', paddingLeft: '0%', paddingRight: '0%', paddingBottom: '0%',
                            // backgroundColor: '#E6F9E9',
                             border: '1px solid red'
                        }} */}
                    {/* > */}
                    <div className="row fundo-centralizado"
                        style={{
                            paddingTop: '2%', paddingLeft: '3%', paddingRight: '7%', paddingBottom: '1%',
                            // backgroundColor: '#E6F9E9',
                            //  border: '1px solid red'
                        }}
                    >



                        <div className="col-lg-2 "
                            style={{ paddingLeft: '4%', paddingRight: '0%', backgroundCollor: '#cdced6', borderRadius: '10px', textAlign: 'center' }}
                        ><h5
                            className="contorno-ocupar-desocupar"
                            style={{ backgroundColor: '#DADBE0', color: '#19296B', paddingTop: '4%', paddingBottom: '2%', borderRadius: '10px', textAlign: 'center' }}
                        >OCUPAR VAGAS</h5>

                        </div>

                        <div className="" style={{
                            paddingLeft: '6%'

                        }}>


                            <button onClick={(e) => this.ocuparVagas(1)} type="button " className={(this.state.disponiveis < 1) ? "btn btn-success disabled btn-tamanho-mobile sombra-ocupacao-disable" : "btn btn-success btn-tamanho-mobile sombra-ocupacao "} style={{ borderRadius: '10px' }}><h3>1</h3></button>

                        </div>



                        <div className=" ">
                            <button onClick={(e) => this.ocuparVagas(2)} type="button " className={(this.state.disponiveis < 2) ? "btn btn-success disabled btn-tamanho-mobile sombra-ocupacao-disable" : "btn btn-success btn-tamanho-mobile sombra-ocupacao"} style={{ borderRadius: '10px' }}><h3>2</h3></button>


                        </div>
                        <div className="">
                            <button onClick={(e) => this.ocuparVagas(3)} type="button" className={(this.state.disponiveis < 3) ? "btn btn-success disabled btn-tamanho-mobile sombra-ocupacao-disable" : "btn btn-success btn-tamanho-mobile sombra-ocupacao"} style={{ borderRadius: '10px' }}><h3>3</h3></button>


                        </div>
                        <div className="">
                            <button onClick={(e) => this.ocuparVagas(4)} type="button" className={(this.state.disponiveis < 4) ? "btn btn-success disabled btn-tamanho-mobile sombra-ocupacao-disable" : "btn btn-success btn-tamanho-mobile sombra-ocupacao"} style={{ borderRadius: '10px' }}><h3>4</h3></button>




                        </div>





                        {/* </div> */}




                    </div>


                    <div className=""
                        style={{
                            paddingTop: '2%'
                            , paddingLeft: '3%', paddingRight: '7%', paddingBottom: '1%',
                            // backgroundColor: '#F9F0F0',
                            //  border: '1px solid red'
                        }}
                    >
                        <div className="row fundo-centralizado" >
                            <div className="col-lg-2" style={{ paddingLeft: '4%', paddingRight: '0%', backgroundCollor: '#cdced6', borderRadius: '10px', textAlign: 'center' }}><h5
                                className="contorno-ocupar-desocupar"
                                style={{ backgroundColor: '#DADBE0', color: '#19296B', paddingTop: '4%', paddingBottom: '2%', borderRadius: '10px', textAlign: 'center' }}
                            >DESOCUPAR VAGAS</h5>

                            </div>

                            <div className="" style={{
                                paddingLeft: '6%'

                            }}>

                                <button onClick={(e) => this.desocuparVagas(1)} type="button" className={(this.state.quantidadeDeVagas - this.state.disponiveis - this.state.ValorVagasPendentes - this.state.vagasNotificadasDesocupar < 1) ? "btn btn-danger disabled btn-tamanho-mobile sombra-desocupacao-disable" : "btn  btn-danger btn-tamanho-mobile sombra-desocupacao"} style={{ borderRadius: '10px' }}><h3>1</h3></button>


                            </div>
                            <div className="">
                                <button onClick={(e) => this.desocuparVagas(2)} type="button" className={(this.state.quantidadeDeVagas - this.state.disponiveis - this.state.ValorVagasPendentes - this.state.vagasNotificadasDesocupar < 2) ? "btn btn-danger disabled btn-tamanho-mobile sombra-desocupacao-disable" : "btn  btn-danger btn-tamanho-mobile sombra-desocupacao"} style={{ borderRadius: '10px' }}><h3>2</h3></button>


                            </div>
                            <div className="">
                                <button onClick={(e) => this.desocuparVagas(3)} type="button" className={(this.state.quantidadeDeVagas - this.state.disponiveis - this.state.ValorVagasPendentes - this.state.vagasNotificadasDesocupar < 3) ? "btn btn-danger disabled btn-tamanho-mobile sombra-desocupacao-disable" : "btn btn-danger btn-tamanho-mobile sombra-desocupacao"} style={{ borderRadius: '10px' }}><h3>3</h3></button>


                            </div>
                            <div className="">
                                <button onClick={(e) => this.desocuparVagas(4)} type="button" className={(this.state.quantidadeDeVagas - this.state.disponiveis - this.state.ValorVagasPendentes - this.state.vagasNotificadasDesocupar < 4) ? "btn btn-danger disabled btn-tamanho-mobile sombra-desocupacao-disable" : "btn btn-danger btn-tamanho-mobile sombra-desocupacao"} style={{ borderRadius: '10px' }}><h3>4</h3></button>


                            </div>

                        </div >


                        <div className="col-lg-12" >
                            <h5 style={{
                                color: '#19296B', paddingTop: '8%', width: '102%',
                                // border: ' 1px solid yellow',
                                textAlign: 'center'
                            }}>CLIENTES NOTIFICADOS</h5>


                            <div className="scroll-box ">
                                <table className="  table-condensed" style={{
                                    color: '#19296B', paddingTop: '3%', marginLeft: '1%', width: '102%',
                                    // border: ' 1px solid yellow',
                                    textAlign: 'center'
                                }} >
                                    <thead >


                                        <tr>
                                            <th form-control scope="col">ID do Cliente </th>
                                            <th scope="col"> Telefone</th>
                                            <th scope="col"> Qtde de Vagas</th>
                                            <th scope="col">Realizar Entrada</th>

                                            {/* <th scope="col">Status do cliente</th> */}
                                            <th scope="col">Tempo até Notificação</th>
                                            <th scope="col">Tempo após notificação</th>
                                            <th scope="col">Cancelar Reserva</th>
                                            <th scope="col">Prioridade</th>

                                        </tr>

                                    </thead>
                                    <tbody>

                                        {this.state.reservas.map(blocoAtual => (

                                            blocoAtual.notificado == 1 ?

                                                <tr className="table-info ">
                                                    <th scope="row">{blocoAtual.id}</th>
                                                    <td>{blocoAtual.telefone}</td>
                                                    <td>{blocoAtual.quantidadeVagas}</td>





                                                    <td>  <button
                                                        onClick={(e) => this.handleModalDeletar(`Realizando a entrada do cliente com identificação ID = ${blocoAtual.id}`, blocoAtual.id, false)}

                                                        //onClick={(e) => this.deletar(blocoAtual.id)}
                                                        type="button" style={{
                                                            color: 'white', borderRadius: '10px', width: '100%', height: '35%',
                                                            fontSize: '12px', backgroundColor: '#2C9B08'
                                                        }} className="btn btn-sucess  btn-sm">Realizar Entrada</button>
                                                    </td>
                                                    {/* <td>{blocoAtual.notificado == 0 ? "Aguardando Vaga / notificação" : "Notificado"}</td> */}
                                                    <td>{blocoAtual.notificadoHora} {blocoAtual.data}</td>
                                                    <td><Contador ></Contador></td>
                                                    {/* <td>  <button onClick={(e) => this.realizarEntrada(blocoAtual.id)} type="button" style={{
                                    color: 'white', borderRadius: '10px', width: '100%', height: '35%',
                                    fontSize: '12px', backgroundColor: '#0AC15F'
                                }} className="btn btn-danger  btn-sm">Realizar entrada</button>  </td> */}




                                                    <td >  <button
                                                        onClick={(e) => this.handleModalDeletar(`Cancelando a reserva do cliente com identificação ID = ${blocoAtual.id}. O cliente receberá uma mensagem de cancelamento`, blocoAtual.id, true)}

                                                        //onClick={(e) => this.deletar(blocoAtual.id)}
                                                        type="button" style={{
                                                            color: 'white', borderRadius: '10px', width: '100%', height: '35%',
                                                            fontSize: '12px', backgroundColor: '#DE3535'
                                                        }} className="btn btn-danger  btn-sm">Cancelar reserva</button>
                                                    </td>



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

                        </div>




                    </div>



                </div>




            </div>






        )

    }

}
export default AtendimentoMobile;