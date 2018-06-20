import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: 'hola'
    };
  }

  onChange = (event) => {
    this.setState({ term: event.target.value });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const url = `https://xjeazylemj.execute-api.us-east-1.amazonaws.com/dev/ping`;
    fetch(url)
      .then(response => response.json())
      .then(data =>  this.setState({ term: data.message }))
      .catch(e => console.log('error', e));
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <button>Get!</button>
        </form>
        <div> {this.state.term} </div>
      </div>
    );
  }
}

export default App;