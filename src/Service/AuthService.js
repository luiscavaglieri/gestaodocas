


export default class AuthService {

    static isUsuarioAutenticado (){
        
        const token = localStorage.getItem('app-token');
        if (token){
            return true;
        } else {
            return false;
        }
    }
    static isUsuarioAutorizado (){
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",localStorage.getItem('app-id') )
        
        const idAprovacao = localStorage.getItem('app-token-admin');
        const idApp = localStorage.getItem('app-id');

        if (idApp == 'doca_1' || idApp == 'doca_2' || idApp == 'doca_3' || idApp == 'doca_4' || idApp == 'doca_5'){
            console.log("doca 1")
            return 11;
        }
        else if (idAprovacao == 10){
            console.log("doca 2")
            return 10;
        } else if (idAprovacao==5) {
            console.log("doca 3")
            console.log("entoru no false")
            return 5;

        } else if (idAprovacao==1){
            console.log("doca 4")
            return 1;
        }
    }

    static userId (){
        
        const id = localStorage.getItem('app-id');
        if (id){
       
            return id;
        } else {
            return false;
        }
    }

   
   
}
