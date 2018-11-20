import React, { Component } from 'react'

class SideNav extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="fixed-top mt-5 ml-4">
                        <div className="row m-1">
                            <div className="collapse" id="navbarToggleExternalContent">
                                <div className="bg-dark p-4">
                                    <h5 className="text-white h4">Collapsed content</h5>
                                    <span className="text-muted">Toggleable via the navbar brand.</span>
                                    <h5 className="text-white h4">Collapsed content</h5>
                                    <span className="text-muted">Toggleable via the navbar brand.</span>
                                    <h5 className="text-white h4">Collapsed content</h5>
                                    <span className="text-muted">Toggleable via the navbar brand.</span>
                                    <h5 className="text-white h4">Collapsed content</h5>
                                    <span className="text-muted">Toggleable via the navbar brand.</span>
                                    <h5 className="text-white h4">Collapsed content</h5>
                                    <span className="text-muted">Toggleable via the navbar brand.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SideNav;