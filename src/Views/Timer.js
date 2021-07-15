import React from 'react';

class Timer extends React.Component {
    constructor() {
       super();
       this.state = {
         curTime : null
       }
     }
     componentDidMount() {
       setInterval( () => {
         this.setState({
           curTime : new Date().toLocaleString()
         })
       },1000)
     }
    render() {
         return(
           <div>
             <h2>{this.state.curTime}</h2>
           </div>
         );
       }
     }

     export default Timer