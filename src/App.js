import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Header } from './Components/Layout/Header';
import  Footer  from './Components/Layout/Footer';
import QuestionContainer from './Components/Question/QuestionContainer';

class App extends Component {
  render() {
    return (
      <div className="app">
      <Header />
      <QuestionContainer />
      <Footer />
      </div>
    );
  }
}

export default App;
