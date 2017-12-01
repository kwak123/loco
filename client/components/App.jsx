import React from 'react';
import axios from 'axios';
import TrainLine from './TrainLine.jsx';
import mockData from '../mockservice.json';
import Details from './Details.jsx';
import Survey from './Survey.jsx';
import Complaint from './Complaint.jsx';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trains: [],
      stops: [],
      user: null,
      displayed : 'main'
    };
    this.onClick = this.onClick.bind(this);
    this.setAppState = this.setAppState.bind(this);
  }

  componentDidMount() {
    // Replace this with an axios request in the future
    this.setState({trains: mockData.lines});
  }

  onClick() {
    axios.get('/routes')
    .then((data) => {
      console.log('fetched', data)
      this.setState({trains : data.data})
    })
    .catch((error) => console.log('failed', error));
  }

  setAppState(input) {
    this.setState({displayed: input })
  }

  render() {
    if (this.state.displayed === 'main') {
      return (
        <div>
          <div className="navbar">
            <div className="logo_container">
              <h1 className="logo">Loco</h1>
            </div>
          </div>
          <div className="trainline">
            <h3 className="trainline_header">Train Status</h3>
            <div className="trainline_container">
              {this.state.trains.map((line, idx) =>
                <TrainLine
                  line={line}
                  key={idx}
                  loggedIn={this.state.user ? true : false}
                  setAppState={this.setAppState}
                  />

              )}
            </div>
          </div>
        </div>
      )
    } else if (this.state.displayed === 'details') {
      return (<Details 
        displayed={this.state.displayed}
        setAppState={this.setAppState}
      />)
    } else if (this.state.displayed === 'survey') {
      return (<Survey 
        setAppState={this.setAppState}
      />)
    } else if (this.state.displayed === 'complaint') {
      return (<Complaint 
        setAppState={this.setAppState} 
      />)
    }
  }
}
