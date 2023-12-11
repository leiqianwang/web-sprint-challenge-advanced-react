import React from 'react'
import axios from 'axios'


// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  constructor(props) {
    super(props);
    this.state = {
      message: initialMessage,
      email: initialEmail,
      steps: initialSteps,
      index: initialIndex,
    };

    // Bind event handlers
    this.move = this.move.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const { index } = this.state;
  let coordinate;

  switch(index) {
    case 0:
      coordinate = { x: 1, y: 1 };
      break;
    case 1:
      coordinate = { x: 2, y: 1 };
      break;
    case 2:
      coordinate = { x: 3, y: 1 };
      break;
    // Add cases for indices 3 to 8
    case 3:
      coordinate = { x: 1, y: 2 };
      break;
    // ... and so on for the rest of the indices ...
    case 4:
      coordinate = { x: 2, y: 2 };
      break;
      case 5:
      coordinate = { x: 3, y: 2 };
      break;

      case 6:
      coordinate = { x: 1, y: 3 };
      break;

      case 7:
      coordinate = { x: 2, y: 3 };
      break;

      case 8:
      coordinate = { x: 3, y: 3 };
      break;
    default:
      coordinate = { x: 0, y: 0 }; // default case if index is out of bounds
  }

  return coordinate;
}

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
       const {x, y} = this.getXY();
       return `Coordinates (${x}, ${y})`;
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.

    this.setState({
      email: initialEmail,
      message: initialMessage,
      steps: initialSteps,
      index: initialIndex,
    });
  
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

    const { index } = this.state;
    const row = Math.floor(index / 3);
    const col = index % 3;

    switch(direction) {
      case "left":
       return col > 0 ? index -1 : index;
     case "right":
         return col < 2 ? index + 1: index;
      case "up" :
          return row > 0? index - 3: index;
       case "down":
         return row < 2 ? index + 3: index; 
         default:
           return index;
    }
    
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const direction = evt.target.id;
    const newIndex = this.getNextIndex(direction);
    const {index} = this.state;

    if (newIndex === index) {
      this.setState({ message: `You can't go ${direction}` });
    } else {
      this.setState({ 
        index: newIndex, 
        steps: this.state.steps + 1, 
        message: '' 
      });
    }
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    const {value} = evt.target;
    this.setState({...this.state, email: value });
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();

    const [x, y] = this.getXY();
    const { steps, email } = this.state;
     let message;
    // const payload = {
    //   x, y, steps, email
    // };

  axios.post('http://localhost:9000/api/result', {x, y, steps, email})
// .then(response => {
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// })
.then(data => {
  this.setState({ message: data.message });
})
.catch(error => {
  this.setState({ message: 'An error occurred: ' + error.message });
})
.finally(() => {
    this.setState({...this.state, message, email: initialEmail})
})
  }


  render() {
    
    const { className } = this.props;
    const { index, steps, message, email } = this.state;


    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {steps} times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
                {idx === index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" value={email} onChange={this.onChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
