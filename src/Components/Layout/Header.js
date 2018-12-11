import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../../Services/AuthService';

class Header extends Component {
    constructor(props) {
        super(props);
        this.onNavLinkClick=this.onNavLinkClick.bind(this);
        this.authService = new AuthService();
    }

    signOut() {
        this.authService.logout();
    }
    onNavLinkClick(e){

    }
    render() {
        return (
            <header>
               <div className="App-header navbar navbar-inverse">
                    <div className="container-fluid d-inline">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link className="navbar-brand" to="/"><label className="label"><big><span className="glyphicon glyphicon-home"></span></big></label></Link>
                        </div>
                        <div className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li><Link onClick={this.onNavLinkClick}  to="/quiz"><span className="label"><big>Quiz</big></span></Link></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right d-inline">
                                <li>
                                    <Link  to="/user_dashboard"><label className="label"><big><span className="glyphicon glyphicon-user"></span></big></label></Link>
                                </li> 
                                <li>
                                    <Link title="logout" to="/"><label className="label"><big><span className="glyphicon glyphicon-log-out"></span></big></label></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;