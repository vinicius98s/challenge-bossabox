import React, { Component } from 'react';

// import api from './services/api';

import Header  from './components/Header';
import Main from './pages/Main';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
