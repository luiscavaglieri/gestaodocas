import * as React from 'react';
import ReactStopwatch from 'react-stopwatch';


class Contador extends React.Component {
  state = {
    minutes: 10,
    seconds: 0,
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
          { minutes === 0 && seconds === 0
              ? <h7>Esgotado</h7>
              : <h5>{minutes}:{seconds < 1 ? `0${seconds}` : seconds}</h5>
          }
      </div>
  )
}

  }

  export default Contador;
  
  