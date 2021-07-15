import * as React from 'react';
import ReactStopwatch from 'react-stopwatch';



class Contador extends React.Component {
    state = {
        minutes: 10,
        seconds: 0,
    }
formatDate2 = () => {

    var hour; var minutes; var seconds;
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours() ,
        minutes = d.getMinutes(),
        seconds = d.getSeconds();
       

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

        return new Date(year, month, day, hour, minutes, seconds)
}

cronometro = (dataNotificacao) => {
    if (dataNotificacao != undefined){

  
    var dif;
    var date =  this.formatDate(dataNotificacao)

    var date2 = this.formatDate2()
    //  =  this.formatDateAtual()
 
var dataNotifacacaoMaisTempo = new Date(date.getTime() + this.props.tempo*60000)

dif = dataNotifacacaoMaisTempo - new Date()
var diffMs = (dataNotifacacaoMaisTempo - date2); // milliseconds between now & Christmas
var diffDays = Math.floor(diffMs / 86400000); // days
var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hoursdataNotifacacaoMaisTempo
var diffMins = Math.floor(((diffMs % 86400000) % 3600000) / 60000); // minutes

var diffseg = Math.floor((((diffMs % 86400000) % 3600000) % 60000)/1000); // minutes

 
 if (diffHrs < 0 || diffMins < 0 || diffseg < 0){
     return "Esgotado"
 } else {

 
    return  diffHrs + "h" + diffMins + "m"+diffseg + "s"
 }

    return "Esgotado"

} else {
    return "Sem data"
}
}


formatDate = (date) => {

    var d = date;
    var day; var month; var year; var hour; var minutes; var seconds;
    var data = d.split(" ")[0]; 
    day = data.split("/")[0];
    month = data.split("/")[1];
    year = data.split("/")[2];

    var horario = d.split(" ")[1];
hour = horario.split(":")[0];
minutes = horario.split(":")[1];
seconds = horario.split(":")[2];
var dataFinal =  new Date(year, month, day, hour, minutes, seconds),
       
        day2 = '' + dataFinal.getDate() -1,
     
        hour2 = dataFinal.getHours()-3;

return new Date(year, month, day, hour2, minutes, seconds)
// return [year,month, day].join('-');
}



    componentDidMount(){
    
    
      this.myInterval = setInterval(() => {
        const { seconds, minutes } = this.state
    
        if (seconds > 0) {
            this.setState(({ seconds }) => ({
                seconds: seconds - 1
            }))
        }
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(this.myInterval)
            } else {
                this.setState(({ minutes }) => ({
                    minutes: minutes - 1,
                    seconds: 59
                }))
            }
        } 
    }, 1000)
    }
    componentWillUnmount() {
      clearInterval(this.myInterval)
    }
    render() {
    
        
      const { minutes, seconds } = this.state
    
    
      return (
    
          <div>
          {this.cronometro(this.props.notificacao) == "Esgotado" ?
                    <p style={{color: "red"}}>{this.cronometro(this.props.notificacao)}</p>:
                    <p>{this.cronometro(this.props.notificacao)}</p>}
              
          </div>
      )
    }
    
      }
  export default Contador;
  