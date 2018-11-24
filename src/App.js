import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import QuestionContainer from './Components/Quiz/QuestionContainer';
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer'
import LeftMenu from './Components/Layout/LeftMenu'
import Routing from './Components/Routing';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <LeftMenu/>
        <Routing/>
        <Footer/>
      </div>
     
    );
  }
}

export default App;
