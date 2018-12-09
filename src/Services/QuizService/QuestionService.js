import request from '../Shared/request';

export default class QuestionService {
    constructor(loggedInUser){
        this.getQuestionsBySubject = this.getQuestionsBySubject.bind(this);
        this.postQuestion=this.postQuestion.bind(this);
        this.getQuizByUser=this.getQuizByUser.bind(this);
        this.postQuiz=this.postQuiz.bind(this);
        this.loggedInUser=loggedInUser;
    }
    
    getQuestionsBySubject(subjects) {
        return request({
            url : `/api/questions/s/` + subjects,
            method: 'GET'
        });
    }

    postQuestion(questionData) {
        questionData.createdBy=this.loggedInUser;
        return request({
            url : `/api/questions` ,
            method : 'POST',
            data : questionData
        });
    }

    getQuizByUser(userId) {
        userId=userId||this.this.loggedInUser;
        return request({
            url : `/api/quizes/u/` + userId,
            method: 'GET'
        });
    }

    postQuiz(quizData) {
        quizData.createdBy=this.loggedInUser;
        return request({
            url : `/api/quizes` ,
            method : 'POST',
            data : quizData
        });
    }
}