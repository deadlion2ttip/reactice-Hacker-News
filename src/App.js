import React, { Component } from 'react';
import './index.css'
import TopStories from './TopStories.js'

class App extends Component {
  render() {
    return (
      <div>
      <div className="App">

       <TopStories />
      </div>
      <div className="App">

        <p className="App-title">Welcome to React</p>
        <p className="App-intro">
          To get started, edit and save to reload.
</p>
      </div>
      </div>
    );
  }
}

export default App;
