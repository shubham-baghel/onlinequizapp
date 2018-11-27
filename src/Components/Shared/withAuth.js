import React , {Component} from 'react';
import AuthService from '../../Services/AuthService';

export default function withAuth(AuthComponent){
    const authService = new AuthService();
    return class AuthWrapped extends Component {
        constructor(){
            super();
            this.state = {
                user : null
            }
        }

        componentWillMount(){
            debugger;
            if(!authService.loggedIn()){
                this.props.history.replace('/signin');
            }
            else{
                try{
                    const profile = authService.getProfile();
                    this.setState({
                        user : profile
                    })
                }
                catch(err){
                    authService.logout();
                    this.props.history.replace("/signin");
                }
            }
        }

        render(){
            if(this.state.user) {
                return (
                    <AuthComponent history={this.props.history} user = {this.state.user} />
                )
            }
            else{
                return null;
            }
        }
    }
}