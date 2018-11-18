import React, { Component } from 'react'

class Header extends Component {
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
                                <a className="nav-link" href="#react-workspace">Active</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="#react-workspace">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#">Disabled</a>
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