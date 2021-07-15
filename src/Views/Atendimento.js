import React, { useEffect, useState } from 'react';


import AtendimentoMobile from './AtendimentoMobile';
import AtendimentoDesktop from './AtendimentoDesktop';
import AtendimentoIpad from './AtendimentoIpad';

class Atendimento extends React.Component {


    render() {




        return (

            <div>
                <div className="atendimento-mobile">
                    <AtendimentoMobile></AtendimentoMobile>
                </div>

                <div className="atendimento-desktop">
                    <AtendimentoDesktop></AtendimentoDesktop>
                </div>
                

                <div className="atendimento-ipad" >
                    <AtendimentoIpad></AtendimentoIpad>
                </div>

            </div>

        )

    }

}
export default Atendimento;