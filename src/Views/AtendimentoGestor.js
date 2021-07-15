import React from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format'
import qs from 'qs'

class AtendimentoGestor extends React.Component {

    state = {

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


        this.setState({
            idAtendente: idAtendenteParametro,


        }, () => {
            this.atualizar()


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
                    console.log("Salas do gestor das Salas:", this.state.salas)

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
            salaEscolhida: e.target.value

        }, () => {
            localStorage.setItem('app-token-sala', this.state.salaEscolhida)
            this.setState({

                valueSalaEscolhida: this.state.salaEscolhida
            }, () => {
                this.informacoesSala(this.state.salaEscolhida)
            })

            console.log("valor sala escolhida", this.state.salaEscolhida)
            console.log("valor sala valueSalEscolhida", this.state.valueSalaEscolhida)
            console.log("local starage app token sala", localStorage.getItem('app-token-sala'))
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

    render() {



        return (





            <div className="col-lg-12 margen-pagina intro" style={{

            }}>

                <p className="estilo-titulo">SELECIONE A UNIDADE PARA VISUALIZAR O PAINEL DE ATENDIMENTO</p>

                <div class="form-group estilo-formulario" style={{ padding: '3%', paddingBottom: '0%' }}>
                    <label for="exampleSelect1">Escolha a sala que deseja editar</label>
                    <select style={{ width: '100%' }} value={this.state.valueSalaEscolhida} onChange={(e) => this.handleNomeSala(e)} className="form-control" id="exampleSelect1">
                        <option value="">Selecione</option>
                        {this.state.salas.map(sala => (
                            <option value={sala.nomeSala}>{sala.nomeSala}</option>
                        ))}
                    </select>
                </div>

                {this.state.painelDeEdicao ?
                    <div>

                        <div className="col-lg-12" style={{ padding: '3%' }}>

                            <div className="tituloEdicao" style={{ textAlign: 'center', paddingBottom: '1%' }}>

                                {/* <h5 style={{ color: '#2A286B' }} > Você selecionou a unidade {this.state.salaEscolhida} <br /></h5> */}

                            </div>

                            <div className="" style={{ borderRadius: '10px', fontSize: '30px', textAlign: 'center', paddingBottom: '1%' }}>

                            <a href="#/atendimento"> <button type="button" className="btn btn-success" style={{ borderRadius: '10px', fontSize: '15px', textAlign: 'center', paddingBottom: '1%' }}>VISUALIZAR PAINEL DE ATENDIMENTO DA UNIDADE {this.state.salaEscolhida}</button></a>

                            </div>



                            {this.state.erro ?
                                <div class="alert alert-dismissible alert-danger">
                                    <button onClick={this.handleErro} type="button" class="close" data-dismiss="alert">&times;</button>
                                    <strong>Ops! </strong> <a href="#" class="alert-link">{this.state.erro}</a>
                                </div> : false}


                            {this.state.sucesso ?
                                <div class="alert alert-dismissible alert-success">
                                    <button onClick={this.handleSucesso} type="button" class="close" data-dismiss="alert">&times;</button>
                                    <strong>Parabens! </strong>{this.state.sucesso}
                                </div> : false}

                        </div>

                    </div>





                    : false}



                <br></br>





            </div>




        )


    }


}







export default AtendimentoGestor;