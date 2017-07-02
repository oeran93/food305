import React, { Component } from 'react';
import './App.css';

import { Order_Header } from './Order_Header.jsx';
import { Main } from './Main.jsx';


class App extends Component {
  

  render() {

    


    return (
      <div className="App">
        <Order_Header />
        <Main />
      </div>      
    );
  }
}

export default App;
