import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import AuthService from '../../Services/AuthService';

export default class SignUp extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.Auth = new AuthService();
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			mobile: '',
			password: '',
			confirmPassword: '',
		}
	}

	validateForm() {
		return (
			this.state.email.length > 0 &&
			this.state.password.length > 0 &&
			this.state.password === this.state.confirmPassword
		);
	}

	handleChange(event) {
		this.setState({
			[event.target.id]: event.target.value
		})
	}


	handleSubmit(event) {
		debugger;
		event.preventDefault();
		let newUser = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			mobile: this.state.mobile,
			password: this.state.password
		}
		this.Auth.signUp(newUser)
			.then(res => {
				this.props.history.replace('/');
			})
			.catch(err => {
				alert(err);
			})

	}


	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
						<form role="form" onSubmit={this.handleSubmit}>
							<h2>Sign Up <small>It's free and always will be.</small></h2>
							<hr className="colorgraph" />
							<div className="row">
								<div className="col-xs-12 col-sm-6 col-md-6">
									<div className="form-group">
										<input type="text" name="firstName" id="firstName" value={this.state.firstName} onChange={this.handleChange} className="form-control input-lg" placeholder="First Name" tabIndex="1" />
									</div>
								</div>
								<div className="col-xs-12 col-sm-6 col-md-6">
									<div className="form-group">
										<input type="text" name="lastName" id="lastName" value={this.state.lastName} onChange={this.handleChange} className="form-control input-lg" placeholder="Last Name" tabIndex="2" />
									</div>
								</div>
							</div>
							<div className="form-group">
								<input type="email" name="email" id="email" value={this.state.email} required={true} onChange={this.handleChange} className="form-control input-lg" placeholder="Email Address" tabIndex="4" onInvalid={(e) => e.target.setCustomValidity("Please enter valid Email")} />
							</div>
							<div className="form-group">
								<input type="text" maxLength={10} name="mobile" id="mobile" value={this.state.mobile} required={true} onChange={this.handleChange} className="form-control input-lg" placeholder="Mobile" tabIndex="4" />
							</div>
							<div className="row">
								<div className="col-xs-12 col-sm-6 col-md-6">
									<div className="form-group">
										<input type="password" name="password" id="password" value={this.state.password} required={true} onChange={this.handleChange} className="form-control input-lg" placeholder="Password" tabIndex="5" />
									</div>
								</div>
								<div className="col-xs-12 col-sm-6 col-md-6">
									<div className="form-group">
										<input type="password" name="confirmPassword" id="confirmPassword" required={true} value={this.state.confirmPassword} onChange={this.handleChange} className="form-control input-lg" placeholder="Confirm Password" tabIndex="6" />
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-xs-12 col-sm-12 col-md-12">
									By clicking <strong className="label label-primary">Register</strong>, you agree to the <a href="#" data-toggle="modal" data-target="#t_and_c_m">Terms and Conditions</a> set out by this site, including our Cookie Use.
								</div>
							</div>
							<hr className="colorgraph"/>
							<div className="row">
								<div className="col-xs-12 col-md-6 mb-1"><input type="submit" value="Register" className="btn btn-primary btn-block btn-lg" tabIndex="7" /></div>
								<div className="col-xs-12 col-md-6 mb-2"><Link role="tab" aria-selected="false" className="btn btn-success btn-block btn-lg" to='/signin' >Sign In</Link></div>
							</div>
							<div className="text-center m-2"><label className="label label-default">&copy;Quiz {new Date().getFullYear()}</label></div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}