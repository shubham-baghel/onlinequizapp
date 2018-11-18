import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import QuestionContainer from './Components/Question/QuestionContainer';
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer'
import LeftMenu from './Components/Layout/LeftMenu'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <LeftMenu/>
        <QuestionContainer/>
        <Footer/>
      </div>
     
    );
  }
}

export default App;
