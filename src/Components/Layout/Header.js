import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../../Services/AuthService';

class Header extends Component {
    constructor(props) {
        super(props);
        this.authService = new AuthService();
    }

    signOut() {
        this.authService.logout();
    }
    
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light App-header">
                    <Link className="navbar-brand App-logo" to="/">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/quiz">Quiz</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    User
                               </span>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item App-link" to="/user_dashboard">Dashboard</Link>
                                    <Link className="dropdown-item App-link" to="/">Link</Link>
                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item App-link" title="logout" to="/">Logout</Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header;