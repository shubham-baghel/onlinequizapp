import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../Services/AuthService';


export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.Auth = new AuthService();
    this.state = {
      username: "",
      password: ""
    };
  }


  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleSubmit = event => {
    event.preventDefault();
    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        this.props.history.replace('/');
      })
      .catch(err => {
        alert(err);
      })
  }

  render() {
    return (
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-lg-4" />
          <div className="col-lg-4">
            <div className="container-fluid">
              <form className="form-signin" onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="m-0 form-group text-center col-lg-12">
                  <Link className="navbar-brand App-logo" to="/"><big>Quiz</big></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <h2>Sign In <small>Let's be in.</small></h2>
                    <hr className="colorgraph" />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-lg-12">
                    <input
                      type="text"
                      id="username"
                      onChange={this.handleChange}
                      value={this.state.username}
                      className="form-control input-lg mt-2"
                      placeholder="Email address Or Username"
                      required={true}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-lg-12">
                    <input
                      type="password"
                      id="password"
                      onChange={this.handleChange}
                      value={this.state.password}
                      className="form-control input-lg mt-2"
                      placeholder="Password"
                      required={true}
                    />
                  </div>
                </div>
                <div className="row m-0">
                  <div className="checkbox form-group col-lg-12">
                    <label>
                      <input type="checkbox" value="remember-me" />
                      <span className="label label-primary">Remember me</span>
                    </label>
                  </div>
                </div>
                <div className="row m-0">
                  <div className="form-group col-lg-12">
                    <hr className="colorgraph" />
                    <button
                      className="btn btn-primary btn-block btn-lg"
                      type="submit"
                      disabled={!this.validateForm()}
                    >Sign in</button>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12">
                    <Link to="/signup" className="label label-primary mr-2"> Have't register yet? Register now!</Link>
                    <Link to="/" className="label label-success">Home</Link>
                  </div>
                  <br /><br />
                </div>
              </form>
            </div>
            <div className="text-center mt-2"><label className="label label-default">&copy;Quiz {new Date().getFullYear()}</label></div>
          </div>
          <div className="col-lg-4" />
        </div>
      </div>
    )
  }
}