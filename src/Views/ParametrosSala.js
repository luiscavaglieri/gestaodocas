import React from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format'
import qs from 'qs'

class ParametrosSala extends React.Component {

    state = {

        usuario: "",
        sucesso: false,
        erro: null,
        painelnomeSala: false,
        salas: "",
        valueSalaEscolhida: '',
        painelDeEdicao: null

    }

    componentDidMount() {
        const idAtendenteParametro = this.props.match.params.id;
        this.informacoesSala()


        this.setState({
            idAtendente: idAtendenteParametro,


        }, () => {
            this.atualizar()
          
           
        })
    }

    atualizar = () => {
        fetch(`https://banco-gestao.herokuapp.com/sala/${localStorage.getItem('app-token-sala')}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        // salas: result,
                        nomeSala: localStorage.getItem('app-token-sala')
                    })
                    // console.log("Salas do gestor das Salas:", this.state.salas)
                    console.log("Nome da Salas:", this.state.nomeSala)

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

    // handleNomeSala = (e) => {

    //     console.log("entriy")
    //     this.setState({
    //         salaEscolhida: e.target.value
    //     }, () => {
    //         this.setState({

    //             valueSalaEscolhida: this.state.salaEscolhida
    //         }, () => {
    //             this.informacoesSala(this.state.salaEscolhida)
    //         })
    //     }
    //     )


    // }

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
        axios.get(`https://banco-gestao.herokuapp.com/sala/detalhes/${localStorage.getItem('app-token-sala')}`).then(response => {
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
                    // painelDeEdicao: true
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

    handleSucesso = () =>{
        this.setState({
            sucesso:null
        })
    }
    handleErro = () =>{
        this.setState({
            erro:null
        })
    }

    render() {



        return (


         


                <div className="col-lg-12 margen-pagina intro" style={{

                }}>

                    

                    <p className="estilo-titulo">PARÂMETROS CONFIGURADOS PELO GESTOR PARA A UNIDADE:  {`${this.state.nomeSala}`}</p>

                    {/* {this.informacoesSala(this.state.nomeSala)} */}

                     {/* <button  
                    value={this.state.nomeSala} onClick={(e) => this.handleNomeSala(e)} type="button " className="btn btn-success">{`${this.state.nomeSala}`}
                    </button>  */}


                  
                    
                    {/* {this.state.painelDeEdicao ? */}
                        <div>

                            <div className="col-lg-12" style={{ padding: '3%' }}>

                                <div className="tituloEdicao" style={{ textAlign: 'center', paddingBottom: '1%' }}>

                                    {/* <h5 style={{ color: '#2A286B' }} > Você selecionou a unidade {this.state.salaEscolhida} <br /> (Atualize as Informações)</h5> */}
                                    
                                </div>


                                <div className="form-group estilo-formulario">
                                    <label htmlFor="mensagemBoasVinda">Quantidade total de vagas</label>
                                    <input  disabled = {true} value={this.state.quantidadeVagas} onChange={(e) => { this.handleQuantidadeVagas(e) }}
                                        type="text" rows="5" className="form-control" id="quantidadeVagas"
                                        aria-describedby="nomeSalaHelp" placeholder="Digite a quantidade total de vagas do estabelecimento" />
                                </div>

                                <div className="form-group estilo-formulario">
                                    <label htmlFor="mensagemBoasVinda">Tempo limite para apresentação do cliente</label>
                                    <input disabled = {true} value={this.state.tempo} onChange={(e) => { this.handleTempo(e) }}
                                        type="text" rows="5" className="form-control" id="tempo"
                                        aria-describedby="nomeSalaHelp" placeholder="Digite o tempo limite para a apresentação do cliente" />
                                </div>

                                <div className="form-group estilo-formulario">
                                    <label htmlFor="mensagemBoasVinda">Intervalo para ocupação de vagas para clientes prioritários</label>
                                    <input disabled = {true} value={this.state.saltoPrioridade} onChange={(e) => { this.handleSaltoPrioridade(e) }}
                                        type="text" rows="5" className="form-control" id="saltoPrioridade"
                                        aria-describedby="nomeSalaHelp" placeholder="Digite o intervalo para ocupação de vagas para clientes prioritários" />
                                </div>


                                {/* 
                            <div className="form-group estilo-formulario">
                            <label htmlFor="exampleInputnomeSala1">Digite a mensagem de boas vindas</label>
                            
                            {/* <input value={this.state.mensagemBoasVindas} onChange={(e) => { this.handleMensagemDeBoasVindas(e) }}
                            type="text" rows="5" className="" id="nomeSalaClienteId"
                            aria-describedby="nomeSalaHelp" placeholder="Digite a mensagem de boas vindas"
                        /> */}

                                {/* <textarea className="form-control" id="nomeSalaClienteId" rows={3} defaultValue={"Bem vindo"} />
                            // </div> */}




                                <div className="form- estilo-formulario">
                                    <label htmlFor="exampleInputnomeSala1">Mensagem de boas vindas</label>
                                    {/* <input value={this.state.mensagemBoasVindas} onChange={(e) => { this.handleMensagemDeBoasVindas(e) }} */}
                                    <textarea disabled = {true} value={this.state.mensagemBoasVindas} onChange ={(e) =>{this.handleMensagemDeBoasVindas(e)}} className="form-control" rows={3} defaultValue={""} /><p></p>
                                        {/* type="text" rows="5" className="form-control botao-mensagens" id="nomeSalaClienteId"
                                        aria-describedby="nomeSalaHelp" placeholder="Digite a mensagem de boas vindas" /> */}
                                </div>

                                

                                <div className="form-group estilo-formulario">
                                    <label htmlFor="exampleInputnomeSala1">Mensagem referente à disponibilidade da vaga</label>
                                    {/* <input value={this.state.mensagemOcupacao} onChange={(e) => { this.handleMensagemDeOcupacao(e) }} */}
                                    <textarea disabled = {true} value={this.state.mensagemOcupacao} onChange ={(e) =>{this.handleMensagemDeOcupacao(e)}} className="form-control" rows={3} defaultValue={""} /><p></p>
                                        {/* type="text" rows="5" className="form-control" id="nomeSalaClienteId"
                                        aria-describedby="nomeSalaHelp" placeholder="Digite a mensagem referente à disponibilidade da vaga" /> */}
                                </div>

                                <div className="form-group estilo-formulario">
                                    <label htmlFor="exampleInputnomeSala1">Mensagem de notificação</label>
                                    {/* <input value={this.state.mensagemNotificacao} onChange={(e) => { this.handleMensagemDeNotificacao(e) }} */}
                                    <textarea disabled = {true} value={this.state.mensagemNotificacao} onChange ={(e) =>{this.handleMensagemDeNotificacao(e)}} className="form-control" rows={3} defaultValue={""} /><p></p>
                                        {/* type="text" rows="5" className="form-control" id="nomeSalaClienteId"
                                        aria-describedby="nomeSalaHelp" placeholder="Digite a mensagem de notificação" /> */}



                                    {/* <button style={{ paddingTop: '3%', marginTop: '5%' }} onClick={this.verificacaoAlteracaoVagas}
                                        type="button" className="btn btn-success botao-cadastro fundo-painel"><h5>ATUALIZAR</h5></button> */}


                                </div>



{this.state.erro?
    <div class="alert alert-dismissible alert-danger">
  <button onClick ={this.handleErro} type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>Ops! </strong> <a href="#" class="alert-link">{this.state.erro}</a>
</div>:false}


{this.state.sucesso?
    <div class="alert alert-dismissible alert-success">
  <button onClick ={this.handleSucesso}  type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>Parabens! </strong>{this.state.sucesso}
</div>:false}





                            </div>


                        </div>




                        {/* : false} */}



                    <br></br>





                </div>

         


        )


    }


}







export default ParametrosSala;