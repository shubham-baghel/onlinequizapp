import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="container-fluid bg-info fixed-bottom">
                    <div className="row">
                        <div className="col-sm-2 text-left">
                            <label className="label">&copy;Quiz {new Date().getFullYear()}</label><br />
                            <label className="label">Quiz yourself in a way!</label>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }

}

export default Footer;