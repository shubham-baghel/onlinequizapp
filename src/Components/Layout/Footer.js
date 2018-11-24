import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            <div className='footer fixed-bottom'>
            <footer className="border-top">
                <div className="row m-auto">
                    <div className="col-sm-12">
                        <span>&copy;Quiz {new Date().getFullYear()}</span><br />
                        <span>Quiz yourself in a way!</span>
                    </div>
                </div>
            </footer>
            </div>

        )
    }

}

export default Footer;