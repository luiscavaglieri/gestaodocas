import React from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format'
import qs from 'qs'

class EscolherSalaAtendente extends React.Component {

    state = {

        usuario: "",
        sucesso: false,
        erro: null,
        painelnomeSala: false,
        salas: [],
        valueSalaEscolhida:''

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
                    console.log("slas do gestor:", this.state.salas)

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
                sucesso: "Alterado!"
            })
            this.atualizar()
        }).catch(erroResposta => {
            this.setState({
                erro: erroResposta.response.data.error
            })

        })


    }

    handleNomeSala =(e) =>{
        
        console.log("entriy")
        this.setState({
            salaEscolhida : e.target.value
        },() => {
        this.setState({
    
            valueSalaEscolhida : this.state.salaEscolhida
        })}
        )

    
    }


    render() {



        return (
            <div className="col-lg-12 margen-pagina intro" style={{

            }}>

                <p className="estilo-titulo">ESCOLHER A DOCA PARA O ATENDENTE {this.state.idAtendente}</p>


                <div class="form-group">
                    <label for="exampleSelect1">Escolha a doca</label>
                    <select value ={this.state.valueSalaEscolhida} onChange={(e)=> this.handleNomeSala(e)} className="form-control" id="exampleSelect1">
                        <option value ="">Escolha a doca</option>
                        {this.state.salas.map(sala =>(
                        <option value = {sala.nomeSala}>{sala.nomeSala}</option>
                        ))}
                    </select>
                </div>


                <button style={{ paddingTop: '3%' }} onClick={this.cadastrarSala}
                    type="button" className="btn btn-success botao-cadastro fundo-painel"><h5>CADASTRAR</h5></button>


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


                <br></br>





            </div>



        )


    }


}







export default EscolherSalaAtendente;