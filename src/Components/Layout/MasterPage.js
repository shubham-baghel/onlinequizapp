import React, {Component} from 'react'

import Header from './Header'
import Footer from './Footer'
import LeftMenu from './LeftMenu'

export class MasterPage extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div >
            <Header />
            <LeftMenu/>
            {this.props.children}
            <Footer/>
            </div>
        )
    }
}