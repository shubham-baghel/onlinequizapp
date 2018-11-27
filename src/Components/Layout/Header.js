import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../../Services/AuthService';

class Header extends Component {
    constructor(props){
        super(props);
        this.authService = new AuthService();
    }

    signOut(){
        this.authService.logout();
    }

    render() {
        return (
            <header>
                <div className="container-fluid">
                    <div className="row border-bottom">
                        <div className="col-sm-1">
                            <nav className="navbar navbar-dark">
                                <button className="navbar-toggler bg-secondary collapsed" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            </nav>
                        </div>
                        <div className="col-sm-9 mt-2">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/quiz">Quiz</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/q/add">Add a Question</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signin">Sign In</Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn" onClick={this.signOut.bind(this)} >Sign Out</button>
                                </li>

                                
                            </ul>
                        </div>
                        <div className="col-sm-2">
                            <span>Quiz Icon</span>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;