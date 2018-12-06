import React ,{Component} from 'react';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import LeftMenu from './Layout/LeftMenu';
import Routing from './Routing';

export default class Main extends Component{
    render(){
        return (
            <main>
            <Header/>
            <LeftMenu/>
            <Routing/>
            <Footer/>
            </main>
        )
    }
}