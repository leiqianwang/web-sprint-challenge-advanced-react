import React from 'react'
import {useState} from 'react';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  // State hooks
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState(initialMessage);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  

        const x = (index % 3) + 1;
        const y = Math.floor(index / 3) + 1;
        return { x, y };

       
}
       
        
  

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const { x, y } = getXY();
        return `Coordinates (${x}, ${y})`;
    }
  

  function reset() {
    // Use this helper to reset all states to their initial values.
    setEmail(initialEmail);
    setMessage(initialMessage);
    setSteps(initialSteps);
    setIndex(initialIndex);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

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

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const direction = evt.target.id;
    const newIndex = getNextIndex(direction);

    // Check if the index has changed - if not, we're at an edge for that direction
    if (newIndex === index) {
        // Set a message about not being able to move in the chosen direction
        setMessage(`You can't go ${direction}`);
    } else {
        // If movement is possible, update index and steps, and clear any existing message
        setIndex(newIndex);
        setSteps(steps + 1);
        setMessage(''); // Clear any previous movement error message
    }
}

  function onChange(evt) {
    // You will need this to update the value of the input.
    //Event handler for input change of the email
      setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();

    // Define the payload
    const payload = {
      x: getXY().x,
      y: getXY().y,
      steps: steps,
      email: email
    };

    // Sending a POST request and updating the message
    fetch('http://localhost:9000/api/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
      setMessage(data.message); // Assuming 'message' is a field in your API response
    })
    .catch(error => {
      setMessage('An error occurred: ' + error.message);
    });
}

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
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
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={email} onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
      }
    

