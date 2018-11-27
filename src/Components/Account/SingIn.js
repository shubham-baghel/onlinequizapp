import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../../Services/AuthService';


export default class SignIn extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.Auth  = new AuthService();
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
      this.Auth.login(this.state.username,this.state.password)
            .then(res =>{
               this.props.history.replace('/');
            })
            .catch(err =>{
                alert(err);
            })
    }

    render() {
        return(
            
            <form className="form-signin" onSubmit={this.handleSubmit}>
            <div className="text-center mb-4">
              <img className="mb-4" src="../../assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
              <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
            </div>
            
            <div className="form-label-group">
              <input type="text" id="username" onChange={this.handleChange} value={this.state.username} className="form-control" placeholder="Email address" required="" />
              <label>Email address</label>
            </div>
  
            <div className="form-label-group">
              <input type="password" id="password" onChange={this.handleChange} value={this.state.password} className="form-control" placeholder="Password"  />
              <label >Password</label>
            </div>
  
            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={!this.validateForm()}>Sign in</button>
            <Link
                  to="/"
                  className="btn btn-error"> Cancel
            </Link>
            <p className="mt-5 mb-3 text-muted text-center">© 2017-2018</p>
            </form>
        )
    }
}