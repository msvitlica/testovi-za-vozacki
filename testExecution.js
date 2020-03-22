import { TestStorage } from './modules/tests.js';
import {QuestionsStorage, Question} from './modules/question.js';

let body = document.getElementById('body');

body.addEventListener('load', onLoad());

function onLoad() {
    let testStorage = new TestStorage();
    let questionStorage = new QuestionsStorage();
    questionStorage.getAllQuestions();
    testStorage.getAllTests();
    let urlParameters = new URLSearchParams(window.location.search);
    let parameter = urlParameters.get('parameter');
    let test = testStorage.getTestById(parameter);
    
    let content = document.getElementById('content');

    test.questions.forEach( (element, index) => {
        content.innerHTML += '<div class="questions" id="question' + index +'"><p>' + element.questionText;

        let question = questionStorage.getQuestionById(element.id);

        if(question.hasMultipleCorrectAnswers()){
            content.innerHTML+='<p>vise tacnih</p>'; 
        }
        else{
            content.innerHTML+='<p>jedan tacan</p>'; 
        }
        
        
        content.innerHTML+='</p></div>'; 

    });
}