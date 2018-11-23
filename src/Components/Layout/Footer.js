import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            <div className='footer fixed-bottom'>
                <footer className="border-top">
                    <div className="row m-auto">
                        <div className='col-sm-1'></div>
                        <div className="col-sm-10 text-left">
                            <span>&copy;Quiz - {new Date().getFullYear()}</span><br />
                        </div>
                    </div>
                </footer>
            </div>
        )
    }

}

export default Footer;