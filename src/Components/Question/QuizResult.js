import React,{Component}  from 'react'

export default class QuizResult extends Component{
    constructor(props){
        super(props);
        this.calculateResult = this.calculateResult.bind(this);
    }

    calculateResult(){
        debugger;
        var quizData = this.props.quizData;
        var userRes = this.props.userResponse;
        var result = [];
        Object.keys(quizData).map((val,i) => {
            if(this.isAnswerCorrect(quizData[val].answers, userRes[val])){
                result.push(true); 
            }else{
                result.push(false); 
            }
        })
        return result;
    }

    isAnswerCorrect(answers , response){
        if(answers.length != response.length)
        return false;

        for(let i=0 ; i < answers.length ; i++)
        {
            if(!response.includes(answers[i].id)){
                return false;
            }
        }
        return true;
    }

    render(){
        let result = this.calculateResult();
        return(
            <div>
            <div>QuizResult</div>
            <div>
                {
                    result.map((val , i ) => {
                        return ( <button className={result[i] == true ? "btn btn-primary" :"btn btn-btn-secondary"} >{++i}</button>)
                    })
                }
            </div>
            <div>Score :</div>
            <div>{result.filter( r => r).length} / {result.length}</div>
            </div>
        )
    }
}