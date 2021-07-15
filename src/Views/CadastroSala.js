import React from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format'
import qs from 'qs'

class ConfigurarSala extends React.Component {

    state = {

        usuario: "",
        sucesso: false,
        erro: null,
        painelnomeSala: false,
        salas: [],

    }

    componentDidMount() {
        const idAnuncio = this.props.match.params.id;


        this.setState({
            idCliente: idAnuncio,


        }, () => {
            this.atualizar()
        })
    }

    atualizar = () => {
        fetch(`https://banco-gestao.herokuapp.com/sala/${this.state.idCliente}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        salas: result
                    })


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


    cadastrar = () => {
        axios.post('https://banco-gestao.herokuapp.com/sala', {
            nomeSala: this.state.nomeSala,
            mensagemBoasVindas: "Padrão",
            mensagemNotificacao: "Padrão",
            username: this.state.idCliente,
            mensagemOcupacao: "Padrão",
            tempo: this.state.tempo,
            quantidadeVagas: this.state.quantidadeVagas,
            saltoPrioridade: this.state.saltoPrioridade,


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

    handlePainelnomeSala = () => {
        this.setState({
            painelnomeSala: !this.state.painelnomeSala
        })
    }


    handleNomeSala = (e) => {
        this.setState({
            nomeSala: e.target.value
        })
    }

    handleTempo = (e) => {
        this.setState({
            tempo: e.target.value
        })
    }

    handlequantidadeVagas = (e) => {
        this.setState({
            quantidadeVagas: e.target.value
        })
    }

    handlesaltoPrioridade = (e) => {
        this.setState({
            saltoPrioridade: e.target.value
        })
    }


    render() {



        return (
            <div className="col-lg-12 margen-pagina intro" style={{

            }}>

                {/* <p className="estilo-titulo">CADASTRO DE S DO CLIENTE {this.state.idCliente}</p> */}
                <h5 style={{ textAlign: 'center', paddingTop: '0%', paddingBottom: '2%', color: '#132577' }}>CADASTRO DE S  </h5>

                <div className="col-lg-12" style={{ textAlign: 'center',padding: '1%', border: '1p solid black' }}>
                    <h5> Cadastre as salas para o cliente {this.state.idCliente}</h5>

                    <div className="form- estilo-formulario">
                        <label htmlFor="exampleInputnomeSala1">Nome da Sala</label>
                        <input value={this.state.nomeSala} onChange={(e) => { this.handleNomeSala(e) }}
                            type="text" rows="5" className="form-control" id="nomeSalaClienteId"
                            aria-describedby="nomeSalaHelp" placeholder="Digite o nome da sala" />
                    </div>

                    <button style={{ paddingTop: '3%' }} onClick={this.cadastrar}
                        type="button" className="btn btn-success botao-cadastro fundo-painel"><h5>CADASTRAR </h5></button>


                </div>

                {this.state.sucesso ?
                    <div className="alert alert-dismissible alert-success">
                        <button onClick={this.handleSucess} type="button" className="close" data-dismiss="alert">×</button>
                        <strong>Sucesso!</strong> Nova sala cadastrada!
               </div> : false}

                {this.state.erro ?
                    <div className="alert alert-dismissible alert-danger">
                        <button type="button" className="close" data-dismiss="alert">×</button>
                        {this.state.erro}
                    </div> : false}


                <h5>Lista de Salas cadastradas</h5>
                <div className="scroll-box" style={{ maxHeight: '500px', overflowX: 'auto', height: '100%' }}>
                    <form id="form-veiculos" onReset={this.handleFormReset}>
                        <table class="table table-hover">
                            <thead>
                                <tr>

                                    <th scope="col">NOME DA SALA</th>
                                    {/* <th scope="col">MSGT</th>
                                    <th scope="col">MSG2</th>
                                    <th scope="col">DE CEP</th> */}
                                   
                                    <th scope="col">DELETAR</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.state.salas.map(salas => (
                                    <tr class="table-light">

                                        <td>{salas.nomeSala}</td>

                                      
                                        <td>


                                            <div className="c-loader-tabela" >

                                            </div> : <svg onClick={(e) => { this.deletar(salas.id) }} width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
                                                <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
                                            </svg></td>
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



        )


    }


}







export default ConfigurarSala;