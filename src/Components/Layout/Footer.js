import React, { Component } from 'react'

class Footer extends Component {
    constructor(props){
        super(props);
        this.onQuizKeySubmit=this.onQuizKeySubmit.bind(this);
    }

    onQuizKeySubmit(e){
        e.preventDefault();
        let assessment_id=e.target.querySelector("input").value;
        console.log("Assessment "+assessment_id);
    }

    render() {
        return (
            <footer className="App-Footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-2">
                            <label className="btn-sm">Copyright&copy; Quiz {new Date().getFullYear()}</label><br />
                        </div>
                        <div className="col-sm-6"></div>
                        <div className="col-sm-4">
                            <form id="footer-form" className="form-inline my-2 my-lg-0 d-inline-flex" onSubmit={this.onQuizKeySubmit}>
                                <div>
                                    <input className="form-control mr-sm-2  mr-lg-2" placeholder="Assessment Key"/>
                                </div>
                                <div>
                                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Let's Go</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }

}

export default Footer;