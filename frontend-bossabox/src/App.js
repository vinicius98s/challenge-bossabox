import React, { Component } from 'react';

// import api from './services/api';

import Header  from './components/Header';
import Main from './pages/Main';
import Inputs from './components/Inputs';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Inputs />
        <Main />
      </div>
    );
  }
}

export default App;
