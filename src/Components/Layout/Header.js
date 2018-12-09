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
                                <li role="tab" className="nav-item text-right">
                                    <Link role="tab" aria-selected="false" className="nav-link" to="/user_dashboard"><label className="label"><big><span className="glyphicon glyphicon-user"></span></big></label></Link>
                                    {/* <label role="button" onClick={this.signOut.bind(this)} ><span className="glyphicon glyphicon-user"></span></label>   */}
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