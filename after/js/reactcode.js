'use strict';

class Foo extends React.Component{
  render(){
    return(
      React.createElement('p',null,'Hello')
    );
  }
}

const elem = <p></p>;
const domContainer = document.querySelector('#root');
ReactDOM.render(elem, domContainer);