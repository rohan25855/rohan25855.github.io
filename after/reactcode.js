'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function calculateWinner(squares) {
  var lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (var i = 0; i < lines.length; i++) {
    var _lines$i = _slicedToArray(lines[i], 3),
        a = _lines$i[0],
        b = _lines$i[1],
        c = _lines$i[2];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      if (squares[a] == 'X') {
        return 'Nunu';
      } else {
        return 'Lulu';
      }
    }
  }
  return null;
}

function Square(props) {
  return React.createElement(
    'button',
    { className: 'square',
      onClick: props.onClick
    },
    props.value
  );
}

var Board = function (_React$Component) {
  _inherits(Board, _React$Component);

  function Board() {
    _classCallCheck(this, Board);

    return _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).apply(this, arguments));
  }

  _createClass(Board, [{
    key: 'renderSquare',
    value: function renderSquare(i) {
      var _this2 = this;

      return React.createElement(Square, {
        value: this.props.squares[i],
        onClick: function onClick() {
          return _this2.props.onClick(i);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'board-row' },
          this.renderSquare(0),
          this.renderSquare(1),
          this.renderSquare(2)
        ),
        React.createElement(
          'div',
          { className: 'board-row' },
          this.renderSquare(3),
          this.renderSquare(4),
          this.renderSquare(5)
        ),
        React.createElement(
          'div',
          { className: 'board-row' },
          this.renderSquare(6),
          this.renderSquare(7),
          this.renderSquare(8)
        )
      );
    }
  }]);

  return Board;
}(React.Component);

var Game = function (_React$Component2) {
  _inherits(Game, _React$Component2);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this3 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    _this3.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xisNext: true,
      stepNumber: 0
    };
    return _this3;
  }

  _createClass(Game, [{
    key: 'handleClick',
    value: function handleClick(i) {
      var history = this.state.history.slice(0, this.state.stepNumber + 1);
      var current = history[history.length - 1];
      var squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xisNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{ squares: squares }]),
        xisNext: !this.state.xisNext,
        stepNumber: history.length
      });
    }
  }, {
    key: 'jumpTo',
    value: function jumpTo(step) {
      this.setState({
        stepNumber: step,
        xisNext: step % 2 === 0
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var history = this.state.history;
      var current = history[this.state.stepNumber];
      var winner = calculateWinner(current.squares);
      var moves = history.map(function (step, move) {
        var desc = move ? 'Go to move #' + move : 'Go to game start';
        return React.createElement(
          'li',
          { key: move },
          React.createElement(
            'button',
            { onClick: function onClick() {
                return _this4.jumpTo(move);
              } },
            desc
          )
        );
      });
      var status = void 0;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = "Next player: " + (this.state.xisNext ? 'Nunu' : 'Lulu');
      }
      return React.createElement(
        'div',
        { className: 'game' },
        React.createElement(
          'strong',
          { className: 'moves-list' },
          'Here\'s a game for you :) :) Let\'s see who wins Nunu or Lulu!'
        ),
        React.createElement(
          'div',
          { className: 'game-board' },
          React.createElement(Board, { squares: current.squares,
            onClick: function onClick(i) {
              return _this4.handleClick(i);
            }
          })
        ),
        React.createElement(
          'div',
          { className: 'game-info' },
          React.createElement(
            'div',
            { className: 'game-info' },
            status
          ),
          React.createElement(
            'ul',
            { className: 'moves-list' },
            moves
          )
        )
      );
    }
  }]);

  return Game;
}(React.Component);

// ========================================

var FlavorForm = function (_React$Component3) {
  _inherits(FlavorForm, _React$Component3);

  function FlavorForm(props) {
    _classCallCheck(this, FlavorForm);

    var _this5 = _possibleConstructorReturn(this, (FlavorForm.__proto__ || Object.getPrototypeOf(FlavorForm)).call(this, props));

    _this5.state = { value: 'coconut' };
    _this5.handleChange = _this5.handleChange.bind(_this5);
    _this5.handleSubmit = _this5.handleSubmit.bind(_this5);
    return _this5;
  }

  _createClass(FlavorForm, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({ value: event.target.value });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      alert('obviously it is choco1234 xD');
      event.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'form',
        { onSubmit: this.handleSubmit, className: 'moves-list' },
        React.createElement(
          'label',
          null,
          'Choose the best WIFI password:',
          React.createElement(
            'select',
            { value: this.state.value, onChange: this.handleChange },
            React.createElement(
              'option',
              { value: 'select' },
              'select'
            ),
            React.createElement(
              'option',
              { value: 'nishi_motu_hain' },
              'nishi_motu_hain'
            ),
            React.createElement(
              'option',
              { value: 'nishi_chotu_hain' },
              'nishi_chotu_hain'
            ),
            React.createElement(
              'option',
              { value: 'nishi_chotumotu_dono_hain' },
              'nishi_chotumotu_hain'
            )
          )
        ),
        React.createElement('input', { type: 'submit', value: 'click here to see my guess' })
      );
    }
  }]);

  return FlavorForm;
}(React.Component);

var FlavorForm1 = function (_React$Component4) {
  _inherits(FlavorForm1, _React$Component4);

  function FlavorForm1(props) {
    _classCallCheck(this, FlavorForm1);

    var _this6 = _possibleConstructorReturn(this, (FlavorForm1.__proto__ || Object.getPrototypeOf(FlavorForm1)).call(this, props));

    _this6.state = { value: 'coconut' };
    _this6.handleChange = _this6.handleChange.bind(_this6);
    _this6.handleSubmit = _this6.handleSubmit.bind(_this6);
    return _this6;
  }

  _createClass(FlavorForm1, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({ value: event.target.value });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      alert('Your favorite Nickname is Chotu');
      event.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'form',
        { onSubmit: this.handleSubmit, className: 'moves-list' },
        React.createElement(
          'label',
          null,
          'Pick your favorite Nickname:',
          React.createElement(
            'select',
            { value: this.state.value, onChange: this.handleChange },
            React.createElement(
              'option',
              { value: 'select' },
              'select'
            ),
            React.createElement(
              'option',
              { value: 'Gadhi' },
              'Gadhi'
            ),
            React.createElement(
              'option',
              { value: 'Nunu' },
              'Nunu'
            ),
            React.createElement(
              'option',
              { value: 'Hathi' },
              'Hathi'
            ),
            React.createElement(
              'option',
              { value: 'Chotu' },
              'Chotu'
            ),
            React.createElement(
              'option',
              { value: 'Bhalu' },
              'Bhalu'
            ),
            React.createElement(
              'option',
              { value: 'Golu' },
              'Golu'
            ),
            React.createElement(
              'option',
              { value: 'Football' },
              'Football'
            ),
            React.createElement(
              'option',
              { value: 'Bhes' },
              'Bhes'
            )
          )
        ),
        React.createElement('input', { type: 'submit', value: 'click here to see my guess' })
      );
    }
  }]);

  return FlavorForm1;
}(React.Component);

var elem = React.createElement(FlavorForm, null);
var domContainer = document.querySelector('#root');
ReactDOM.render(elem, domContainer);
var elem1 = React.createElement(Game, null);
var domContainer1 = document.querySelector('#roota');
ReactDOM.render(elem1, domContainer1);
var elem2 = React.createElement(FlavorForm1, null);
var domContainer2 = document.querySelector('#rootb');
ReactDOM.render(elem2, domContainer2);