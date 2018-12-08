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
                <div className="container-fluid App-header">
                    <div className="row">
                        <div className="col-sm-12">
                            <ul role="tablist" className="nav nav-fill nav-tabs border-0" id="navTabs">
                                  <li className="nav-item text-left">
                                    <Link role="tab" aria-selected="true" className="nav-link" to="/"><label className="label"><big><span className="glyphicon glyphicon-home"></span></big></label></Link>
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
                                <li role="tab" className="nav-item text-right mt-3">
                                    <label role="button" onClick={this.signOut.bind(this)} ><big><span className="glyphicon glyphicon-user"></span></big></label>  
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