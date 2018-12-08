'use strict';
import React, {Component} from 'react'


export default class RevisitForm extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className='container-fluid mt-2 full-height-container'>
                <div className='row mt-2'>
                    <div className='col-sm-5'></div>
                    <div className='col-sm-2'>
                      <label className='label label-default'> Quiz Review</label>
                    </div>
                    <div className='col-sm-5'></div>
                </div>
                <div className='row mt-4'>
                    <div className='col-sm-2'>
                    </div>
                    <div className='col-sm-8'>
                    {
                        Object.keys(this.props.userRes).map((val,i)=>{
                            return(
                                <div key={i} className='m-2 d-inline'>
                                    <label className={this.props.userRes[val].length == 0 ? "label label-default" :"label label-primary" } >{++val}</label>
                                </div>
                            )
                        })
                    }
                    </div>
                    <div className='col-sm-2'></div>
                </div>
                <div className='row mt-4'>
                    <div className='col-sm-5'></div>
                    <div className='col-sm-1'>
                         <button className="btn btn-primary" onClick={this.props.onRevisitQuiz}>Revisit</button>
                    </div>
                    <div className='col-sm-1'>
                         <button className="btn btn-success" onClick={this.props.onSubmitQuiz} >Submit</button>
                    </div>
                    <div className='col-sm-5'></div>
                </div>
            </div>
            
        )
    }
}

