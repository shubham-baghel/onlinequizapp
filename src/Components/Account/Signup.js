import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import AuthService from '../../Services/AuthService';

export default class SignUp extends Component {
    constructor(props){
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.Auth = new AuthService();
		this.state = {
			firstName : '',
			lastName : '',
			email : '',
			mobile : '',
			password : '',
			confirmPassword : '',
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
			[event.target.id] : event.target.value
		})
	}  

	
	handleSubmit(event){
		debugger;
		event.preventDefault();
		let newUser = {
			firstName : this.state.firstName,
			lastName : this.state.lastName,
			email : this.state.email,
			mobile : this.state.mobile,
			password : this.state.password
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
        return(
            <div className="container">
            <div className="row">
            <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
		<form role="form" onSubmit = {this.handleSubmit}>
			<h2>Sign Up <small>It's free and always will be.</small></h2>
			<hr className="colorgraph" />
			<div className="row">
				<div className="col-xs-12 col-sm-6 col-md-6">
					<div className="form-group">
                        <input type="text" name="firstName" id="firstName" value={this.state.firstName} onChange={this.handleChange} className="form-control input-lg" placeholder="First Name" tabindex="1" />
					</div>
				</div>
				<div className="col-xs-12 col-sm-6 col-md-6">
					<div className="form-group">
						<input type="text" name="lastName" id="lastName" value={this.state.lastName}  onChange={this.handleChange} className="form-control input-lg" placeholder="Last Name" tabindex="2" />
					</div>
				</div>
			</div>
			<div className="form-group">
				<input type="email" name="email" id="email" value={this.state.email} required={true}  onChange = {this.handleChange} className="form-control input-lg" placeholder="Email Address" tabindex="4" onInvalid={(e) => e.target.setCustomValidity("Please enter valid Email")} />
			</div>
			<div className="form-group">
				<input type="text" maxLength={10} name="mobile" id="mobile" value={this.state.mobile} required={true}  onChange = {this.handleChange} className="form-control input-lg" placeholder="Mobile" tabindex="4" />
			</div>
			<div className="row">
				<div className="col-xs-12 col-sm-6 col-md-6">
					<div className="form-group">
						<input type="password" name="password" id="password" value={this.state.password} required={true}  onChange = {this.handleChange} className="form-control input-lg" placeholder="Password" tabindex="5" />
					</div>
				</div>
				<div className="col-xs-12 col-sm-6 col-md-6">	
					<div className="form-group">
						<input type="password" name="confirmPassword" id="confirmPassword" required={true} value={this.state.confirmPassword}  onChange = {this.handleChange} className="form-control input-lg" placeholder="Confirm Password" tabindex="6" />
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-xs-4 col-sm-3 col-md-3">
					<span className="button-checkbox">
						<button type="button" className="btn" data-color="info" tabindex="7">I Agree</button>
                        <input type="checkbox" name="t_and_c" id="t_and_c" className="hidden" value="1" />
					</span>
				</div>
				<div className="col-xs-8 col-sm-9 col-md-9">
					 By clicking <strong className="label label-primary">Register</strong>, you agree to the <a href="#" data-toggle="modal" data-target="#t_and_c_m">Terms and Conditions</a> set out by this site, including our Cookie Use.
				</div>
			</div>
			
			<hr className="colorgraph" />
			<div className="row">
				<div className="col-xs-12 col-md-6"><input type="submit" value="Register" className="btn btn-primary btn-block btn-lg" tabindex="7"/></div>
				<div className="col-xs-12 col-md-6"><Link role="tab" aria-selected="false" className="btn btn-success btn-block btn-lg" to='/signin' >Sign In</Link></div>
			</div>
		</form>
	</div>
</div>
<div className="modal fade" id="t_and_c_m" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div className="modal-dialog modal-lg">
		<div className="modal-content">
			<div className="modal-header">
				<button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
				<h4 className="modal-title" id="myModalLabel">Terms & Conditions</h4>
			</div>
			<div className="modal-body">
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.</p>
			</div>
			<div className="modal-footer">
				<button type="button" className="btn btn-primary" data-dismiss="modal">I Agree</button>
			</div>
		</div>
	</div>
</div>
</div>
        )
    }
}