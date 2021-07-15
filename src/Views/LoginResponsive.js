import React from 'react';
import axios from 'axios';
import { AuthContext } from '../Main/ProvedorAutenticacao';
import { Redirect } from 'react-router';

import LoginMobile from './LoginMobile';


import Login from './Login';


class LoginResponsive extends React.Component {

render() {


 


    return (

        <div>
        <div className="atendimento-mobile">
            <LoginMobile></LoginMobile>
        </div>

        <div className="atendimento-desktop">
            <Login></Login>
        </div>
        

        <div className="atendimento-ipad" >
            <Login></Login>
        </div>

    </div>

    )
                }


}

LoginResponsive.contextType = AuthContext;

export default LoginResponsive;

