import React , {Component} from 'react' 
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './Home'
import QuizContainer from './Quiz/QuizContainer'
import QuestionFormContainer from './Forms/QuestionFormContainer';
import RevisitForm from './Quiz/RevisitForm';
import QuizLaunchByVisitor from './QuizLaunch/QuizLaunchByVisiter';
import SignIn from './Account/SingIn';
import QuizFormContainer from './Forms/QuizFormContainer'
import UserDashboard from './Panel/User/UserDashborad';
import QuestionsView from './Panel/User/QuizMapping';

class Routing extends Component {
    render(){
        return(
            <div className="fadein-effect">
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/quiz' component={QuizContainer} />
                    <Route path='/q/add' component={QuestionFormContainer}/>
                    <Route exact path='/quiz/review' component= {RevisitForm} />
                    <Route path='/visitorQuiz' component= {QuizLaunchByVisitor} />
                    <Route path='/quiz/add' component={QuizFormContainer}/>
                    <Route path='/user_dashboard' component={UserDashboard}/>
                    <Route path='/q/show/:_quiz_id?' component={QuestionsView}/>
                    <Redirect to="/" />             
                </Switch>
            </div>
        ) 
    }
}

export default Routing;