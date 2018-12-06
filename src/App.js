import React, { Component } from 'react';
import './App.css';
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer'
import Routing from './Components/Routing';
import {Router, Switch, Route} from 'react-router-dom';
import SignIn from './Components/Account/SingIn';
import Main from './Components/Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
        <Route path="/signin" exact component ={SignIn} />
        <Route path='/' component={Main} />
        </Switch>
      </div>
     
    );
  }
}

export default App;
