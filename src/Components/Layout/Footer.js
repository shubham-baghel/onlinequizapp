import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            <footer className="border-top">
                <div className="row m-auto">
                    <div className="col-sm-12">
                        <span>Posted by: Shubham Baghel</span><br />
                        <span>Contact information: <a href="mailto:someone@example.com">
                            sbaghel93@outlook.com</a>.</span>
                    </div>
                </div>
            </footer>

        )
    }

}

export default Footer;