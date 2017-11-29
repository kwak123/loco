import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trains: []
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    axios.get('/test')
    .then((data) => console.log('fetched', data))
    .catch((error) => console.log('failed'));
  }


  render() {
    return (
      <div>
        Hello and welcome to loco, your one stop resource for MTA delays
        <div className="train-lines">
          {this.state.trains.map((line) => {
            return <TrainLine />
          })}
        </div>
        <button onClick={this.onClick}>Click</button>
      </div>
    );
  }
}