import React from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format'
import qs from 'qs'
import Contador from '../Components/Contador'


class Reservas extends React.Component {


    state = {
        reservas: [],
        mostrarModalDeletar: false,
        mostrarModal: false

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
                })


            }).catch(erroResposta => {


            })


        })

    }



    componentDidMount() {

        this.atualizar()



    }

    handleModalDeletar = (e, id) => {
        this.setState({
            mostrarModalDeletar: !this.state.mostrarModalDeletar,
            textoModal: e,
            idDeletar: id
        })
    }





    desocuparVagas = (e) => {

        axios.put('https://banco-gestao.herokuapp.com/atendimento/desocupar', {
            nomeSala: this.state.nomeSala,
            ocupado: e



        }).then(response => {
            this.atualizaValores()
            this.atualizar()
            console.log(this.state.disponiveis)


        }).catch(erroResposta => {


        })


    }



    realizarEntrada = (e) => {

        if (this.state.vagas <= this.state.disponiveis) {
            console.log("quantidade de vagas disponiveis: ", this.state.vagas, "qte de vagas: ", this.state.disponiveis)

            axios.put('https://banco-gestao.herokuapp.com/atendimento/desocupar', {
                nomeSala: this.state.nomeSala,
                ocupado: e


            }).then(response => {
                this.atualizaValores()
                this.atualizar()
                console.log(this.state.disponiveis)


            }).catch(erroResposta => {


            })
        } else {
            alert("Não há vagas suficientes")
            return

        }

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




                className="col-lg-12 intro"
                style={{
                    paddingLeft: '1%', paddingRight: '1%', paddingTop: '2%'
                }}
            >

            <div className={this.state.mostrarModal ? "modal-open" : "modal"}>
                <div className="modal-dialog" role="document">
                    <div style={{ backgroundColor: '#EBECEE' }} className="modal-content">
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
                        {this.state.deletar == true ?
                            <div className="modal-footer">
                                <div className="col-lg-12">
                                    <div>
                                        <button onClick={(e) => this.deletar(this.state.idDeletar)} type="button" className="btn btn-primary" style={{ marginLeft: '3%', fontSize: '15px', backgroundColor: '#E32A2A', borderRadius: '10px' }}>Cancelar Reserva</button>
                                        <button type="button" onClick={(e) => this.handleModalDeletar(1)} className="btn btn-secondary" style={{ marginLeft: '10%', fontSize: '15px', color: 'white', backgroundColor: '#E32A2A', borderRadius: '10px' }} data-dismiss="modal">Manter R</button>
                                    </div>
                                </div>
                            </div>
                            :

                            <div className="modal-footer">
                                <div className="col-lg-12">
                                    <div>
                                        <button onClick={(e) => this.deletar(this.state.idDeletar)} type="button" className="btn btn-primary" style={{ marginLeft: '3%', fontSize: '15px', backgroundColor: '#E32A2A', borderRadius: '10px' }}>CANCELAR RESERVA</button>
                                        <button type="button" onClick={(e) => this.handleModalDeletar(1)} className="btn btn-secondary" style={{ marginLeft: '6%', fontSize: '15px', color: 'white', backgroundColor: '#25930A', borderRadius: '10px' }} data-dismiss="modal">MANTER RESERVA</button>
                                    </div>
                                </div>
                            </div>

                        }
                    </div>
                </div>
            </div>
       



                            <h5 style={{ textAlign: 'center', color: '#132577' }}>LISTA DE ESPERA AGUARDANDO LIBERAÇÃO DE VAGAS NAS DOCAS - MOTORISTAS CADASTRADOS NA UNIDADE GUERDAUSJC
                             {/* {`${this.state.nomeSala}`} */}
                             </h5>


          


          




                <table class=" table table-sm table-striped table-round-corner table-condensed table-bordered ">
                    <thead class="table-sm  "
                    // style={{// border: ' 3px solid yellow',}}
                    >

                        <tr class=" table-th table-striped table-round-corner table-condensed table-bordered" style={{
                            backgroundColor: '#19296B',
                            // border: ' 3px solid yellow',

                        }}>
                            <th form-control scope="col">Nome do motorista / Empresa </th>
                            <th form-control scope="col">Telefone </th>
                            {/* <th scope="col"> Qtde de Vagas</th> */}
                            {/* <th scope="col">Status do cliente</th> */}
                            {/* <th scope="col">Tempo até Notificação</th>
                            <th scope="col">Tempo após notificação</th> */}
                            {/* <th scope="col">Realizar Entrada</th> */}
                            <th scope="col">Cancelar Reserva</th>
                            <th form-control scope="col">Data e hora do cadastro </th>
                            <th scope="col">Prioridade</th>

                        </tr>

                    </thead>
                    <tbody>

                        {this.state.reservas.map(blocoAtual => (

                            blocoAtual.notificado == 0 ?
                                <tr className="table-td table-round-corner table-striped table-condensed table-bordered td"
                                    style={{
                                        backgroundColor: '#C6D0E0',
                                        // border: ' 3px solid yellow',
                                    }} >
                                    <td width="0%" height="0%" scope="row"></td>
                                    <td width="0%" height="0%" scope="row">{blocoAtual.telefone}</td>
                                    {/* <td>{blocoAtual.quantidadeVagas}</td> */}
                                    {/* <td>{blocoAtual.notificado == 0 ? "Aguardando Vaga / notificação" : "Notificado"}</td> */}
                                    {/* <td>{blocoAtual.notificadoHora} - {blocoAtual.data}</td>
                                    <td>{blocoAtual.notificado == 0 ? "Tempo percorrido" : "Notificado"}</td> */}

                                    <td>  <button
                                        onClick={(e) => this.handleModalDeletar(`Cancelando a reserva do cliente com identificação ID = ${blocoAtual.id}`, blocoAtual.id)}

                                        //onClick={(e) => this.deletar(blocoAtual.id)}
                                        type="button" style={{
                                            color: 'white', borderRadius: '10px', width: '100%', height: '35%',
                                            fontSize: '12px', backgroundColor: '#DE3535'
                                        }} className="btn btn-danger  btn-sm">Não autorizado</button>
                                        
                                    </td>
                                    <td width="0%" height="0%" scope="row">{blocoAtual.dataHoraCadastro}</td>

                                    <td>{blocoAtual.prioridade == 3 ? "Especial" : blocoAtual.prioridade == 1 ? "Preferencial" : "Normal"}</td>


                                </tr>
                                : false 

                        ))}

                    </tbody>

                </table>









            </div>

//        
        )

    }
}


export default Reservas;
