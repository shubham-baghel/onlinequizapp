import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';

class Home extends Component {
    constructor(props){
        super(props);
        this.onBeginQuiz = this.onBeginQuiz.bind(this);
        this.state = {
            isVisiter : false,
        }
    }

    onBeginQuiz(){
        this.setState({isVisiter : true});
    }

    render() {
        if(this.state.isVisiter){
            return <Redirect to = "/visitorQuiz" />
        }

        return (
            <main role="main" className="inner cover full-height-container">
                <h1 className="cover-heading">Welcome to Quiz App.</h1>
                <p className="lead">You can sharpen your skillset by giving quiz from various topics</p>
                <p className="lead">
                    <button className="btn btn-lg btn-primary" onClick={this.onBeginQuiz}>Let's Begin</button>
                </p>
            </main>
        )
    }
}

export default Home;