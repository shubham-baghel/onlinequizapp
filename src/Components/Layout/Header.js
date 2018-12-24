import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../../Services/AuthService';

class Header extends Component {
    constructor(props) {
        super(props);
        this.authService = new AuthService();
        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        this.authService.logout();
    }
    
    render() {
        return (
            <header className="App-header">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link className="navbar-brand App-logo" to="/"><big>Q</big></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link App-link" to="/quiz">Quiz</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link App-link" to="/user_dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link App-link" onClick={this.signOut} href="/">Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header;