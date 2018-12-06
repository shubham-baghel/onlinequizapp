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
            <div className="container-fluid card">
              <form className="form-signin" onSubmit={this.handleSubmit}>
                <div className="form-group row">
                  <div className="text-center mb-4 col-lg-12">
                    <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <label className="label label-info">Email address</label>
                    <input
                      type="text"
                      id="username"
                      onChange={this.handleChange}
                      value={this.state.username}
                      className="form-control mt-2"
                      placeholder="Email address"
                      required=""
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="form-label-group col-lg-12">
                    <label className="label label-info">Password</label>
                    <input
                      type="password"
                      id="password"
                      onChange={this.handleChange}
                      value={this.state.password}
                      className="form-control mt-2"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="checkbox col-lg-12">
                    <label>
                      <input type="checkbox" value="remember-me" />
                      <label className="label label-default pl-2">Remember me</label>
                    </label>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <button
                      className="btn btn-lg btn-primary btn-block"
                      type="submit"
                      disabled={!this.validateForm()}
                    >
                      Sign in
                 </button>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-12">
                    <Link to="/signup" className="label label-primary mr-2"> Have't register yet? Register now!</Link>
                    <Link to="/" className="label label-success">Home</Link>
                  </div>
                  <br/><br/>
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