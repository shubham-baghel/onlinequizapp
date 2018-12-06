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
                <div className="container-fluid bg-info">
                    <div className="row">
                        <div className="col-sm-1 text-left">
                            <div className="mt-3">
                                <label className="label"><big><span className="glyphicon glyphicon-tasks"></span></big></label>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <ul role="tablist" className="nav nav-fill nav-tabs" id="navTabs">
                                  <li className="nav-item">
                                    <Link role="tab" aria-selected="true" className="nav-link active" to="/"><big><span className="glyphicon glyphicon-home"></span></big></Link>
                                </li>
                                <li className="nav-item">
                                    <Link onClick={this.onNavLinkClick} role="tab" aria-selected="false" className="nav-link" to="/quiz"><span className="label"><big>Quiz</big></span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link role="tab" aria-selected="false" className="nav-link" to="/q/add"><span className="label"><big>Question</big></span></Link>
                                </li>
                                <li role="tab" className="nav-item">
                                    <Link role="tab" aria-selected="false" className="nav-link" to="/signin"><span className="label"><big>Sign In</big></span></Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-7 text-right">
                            <div className="mt-3">
                                <label role="button" onClick={this.signOut.bind(this)} ><big><span className="glyphicon glyphicon-user"></span></big></label>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;