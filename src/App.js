import React, { Component } from 'react';
import './App.css';
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer'
import Routing from './Components/Routing';
import 'bootstrap/dist/js/bootstrap.bundle';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Routing/>
        <Footer/>
      </div>
     
    );
  }
}

export default App;
