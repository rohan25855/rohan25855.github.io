'use strict';

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for(let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] &&
     squares[a] === squares[c]){
      if(squares[a]=='X'){
        return 'Nunu';
      }
      else{
        return 'Lulu';
      }
    }
  }
  return null;
}

function Square(props){
  return(
    <button className="square" 
    onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component{

  renderSquare(i){
    return(
      <Square
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render(){
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xisNext: true,
      stepNumber: 0
    }
  }

  handleClick(i){
    const history = this.state.history.slice(0,
      this.state.stepNumber+1);
    const current = history[history.length-1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xisNext ? 'X' : 'O';
    this.setState({
      history : history.concat([{squares: squares}]),
      xisNext: !this.state.xisNext,
      stepNumber: history.length
    });
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xisNext: (step % 2) === 0, 
    });
  }

  render(){
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves  = history.map( (step, move) => {
      const desc = move ?
        'Go to move #' + move : 
        'Go to game start';
      return(
        <li key={move}>
          <button onClick = {() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });
    let status;
    if(winner){
      status = "Winner: " + winner;
    }
    else{
      status = "Next player: " + (this.state.xisNext ? 'Nunu' : 'Lulu');
    }
    return(
  
      <div className="game">
        <strong className="moves-list">Here's a game for you :) :) Let's see who wins Nunu or Lulu!</strong>
        <div className="game-board">
          <Board squares={current.squares} 
          onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="game-info">{status}</div>
          <ul className="moves-list">
            {moves}
          </ul>
        </div>
      </div>

    );
  }
}


 
// ========================================

class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    this.setState({value: event.target.value});  }
  handleSubmit(event) {
    alert('obviously it is choco1234 xD');
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="moves-list">
        <label>
          Choose the best WIFI password:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="select">select</option>
            <option value="nishi_motu_hain">nishi_motu_hain</option>
            <option value="nishi_chotu_hain">nishi_chotu_hain</option>
            <option value="nishi_chotumotu_dono_hain">nishi_chotumotu_hain</option>
          </select>
        </label>
        <input type="submit" value="click here to see my guess" />
      </form>
    );
  }
}
class FlavorForm1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    this.setState({value: event.target.value});  }
  handleSubmit(event) {
    alert('Your favorite Nickname is Chotu');
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="moves-list">
        <label>
          Pick your favorite Nickname:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="select">select</option>
            <option value="Gadhi">Gadhi</option>
            <option value="Nunu">Nunu</option>
            <option value="Hathi">Hathi</option>
            <option value="Chotu">Chotu</option>
            <option value="Bhalu">Bhalu</option>
            <option value="Golu">Golu</option>
            <option value="Football">Football</option>
            <option value="Bhes">Bhes</option>
          </select>
        </label>
        <input type="submit" value="click here to see my guess" />
      </form>
    );
  }
}


const elem = <FlavorForm/>;
let domContainer = document.querySelector('#root');
ReactDOM.render(elem, domContainer);
const elem1 = <Game/>;
let domContainer1 = document.querySelector('#roota');
ReactDOM.render(elem1, domContainer1);
const elem2 = <FlavorForm1/>;
let domContainer2 = document.querySelector('#rootb');
ReactDOM.render(elem2, domContainer2);