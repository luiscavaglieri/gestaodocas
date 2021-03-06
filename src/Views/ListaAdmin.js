import React from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format'
import qs from 'qs'


class ListaAdmin extends React.Component {


    state = {
        username: false,
        nome: null,
        telefone: null,
        ListaDeClientes: []
    }





    componentDidMount() {


        this.listarClientes()

    }




    listarClientes = () => {
        this.setState({
            username: localStorage.getItem('app-token-sala')
        }, () => {


            axios.get(`https://banco-gestao.herokuapp.com/cliente`



            ).then(response => {
                this.setState({
                    ListaDeClientes: response.data
                }, () => {
                    this.setState({
                    })
                })


            }).catch(erroResposta => {
                console.log("deu algum erro na api exluir")

            })


        })

    }
    handleModalDeletar = (e, id) => {
        this.setState({
            mostrarModalDeletar: !this.state.mostrarModalDeletar,
            textoModal: e,
            idDeletar: id
        })
    }

    deletar = (id) => {
        axios.post(`https://banco-gestao.herokuapp.com/cliente/excluir`,
            {
                username: id
            }



        ).then(response => {
            this.listarClientes()
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
                    paddingLeft: '5%', paddingRight: '5%'
                }}
            >

                <div className={this.state.mostrarModal ? "modal-open" : "modal"}>
                    <div className="modal-dialog" role="document">
                        <div style={{ backgroundColor: '#EBECEE' }} className="modal-content">
                            <div className="modal-header">
                                <h3 className="form-control " style={{ fontSize: '30px', color: 'red', textAlign: 'center' }}>Aten????o</h3>
                                {/* <button type="button" onClick={(e) => this.handleModal(1)} className="close" data-dismiss="modal" aria-label="Close">
                                     <span aria-hidden="true">??</span>
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
                        <div style={{ backgroundColor: '#EBECEE' }} className="modal-content">
                            <div className="modal-header">
                                <h3 className="form-control" style={{ color: 'red', textAlign: 'center' }}>Aten????o</h3>
                                {/* <button type="button" onClick={(e) => this.handleModalDeletar(1)} className="close" data-dismiss="modal" aria-label="Close">
                                     <span aria-hidden="true">??</span>
                                     </button> */}
                            </div>
                            <div className="modal-body" style={{ textAlign: 'center', color: '#19296B', fontSize: '20px' }}>

                                {this.state.textoModal}
                            </div>
                            <div className="modal-footer">
                                <button onClick={(e) => this.deletar(this.state.idDeletar)} type="button" className="btn btn-primary" style={{ fontSize: '15px', backgroundColor: '#3FC442', borderRadius: '10px' }}>Confirmar</button>
                                <button type="button" onClick={(e) => this.handleModalDeletar(1)} className="btn btn-secondary" style={{ fontSize: '15px', color: 'white', backgroundColor: '#E32A2A', borderRadius: '10px' }} data-dismiss="modal">Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>





                <h5 style={{ textAlign: 'center', paddingTop: '0%', paddingBottom: '2%', color: '#132577' }}>LISTA DE ADMINISTRADORES DO GEST FILAS</h5>




                <table class=" table table-sm table-striped table-round-corner table-condensed table-bordered ">
                    <thead class="table-sm  " style={{ margin: '050%' }}
                    // style={{ border: ' 3px solid yellow',}}
                    >

                        <tr class=" table-th table-striped table-round-corner table-condensed table-bordered" style={{
                            backgroundColor: '#19296B', 
                            // border: ' 3px solid yellow',

                        }}>
                            <th scope="col">Nome do Cliente</th>
                            <th scope="col">Data do Cadastro ?????</th>
                            <th scope="col">Login de usu??rio</th>
                            <th scope="col">telefone</th>
                            <th scope="col">Excluir Cliente</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.ListaDeClientes.map(blocoAtual => (
                            blocoAtual.aprovado == 10?
                            <tr className="table-td table-round-corner table-striped table-condensed table-bordered td"
                            style={{fontSize: '18px',
                                backgroundColor: '#C6D0E0',
                                // border: ' 3px solid yellow',
                            }} >
                                <th   style={{fontSize: '13px', paddingTop: '1.5%'
                            }}scope="row">{blocoAtual.nome}</th>
                                <td>{blocoAtual.data}</td>
                                <td>{blocoAtual.username}</td>
                                <td>{blocoAtual.telefone}</td>

                        {localStorage.getItem('app-id') == blocoAtual.username ?

                                <td>  <button
                                    onClick={(e) => this.handleModalDeletar(`Cancelando a reserva do cliente com identifica????o ID = ${blocoAtual.username}`, blocoAtual.username)}

                                    //onClick={(e) => this.deletar(blocoAtual.id)}
                                    type="button" style={{
                                        color: 'white', borderRadius: '10px', width: '70%', 
                                        fontSize: '14px', backgroundColor: '#DE3535'
                                    }} className="btn btn-danger  btn-sm">Excluir Administrador</button>
                                </td>

:


<td>  <button
// onClick={(e) => this.handleModalDeletar(`Cancelando a reserva do cliente com identifica????o ID = ${blocoAtual.username}`, blocoAtual.username)}

//onClick={(e) => this.deletar(blocoAtual.id)}
type="button" style={{
    color: 'white', borderRadius: '10px', width: '70%', 
    fontSize: '14px', backgroundColor: '#19296B'
}} className="btn btn-danger  btn-sm">N??o Autorizado</button>
</td>


                                } 
                            </tr>:false

                        ))}
                    </tbody>
                </table>











            </div>
        )

    }
}


export default ListaAdmin;
