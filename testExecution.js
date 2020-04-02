import { TestStorage } from './modules/tests.js';
import { QuestionsStorage, Question } from './modules/question.js';
import { QuestionsAnswers } from './modules/answers.js';
let test, testStorage, questionStorage, questionsAnswers;

window.addEventListener('load', onLoad);
let button = document.getElementById('btnFinish');
button.addEventListener('click', onBtnFinishClick);



function onLoad() {
    testStorage = new TestStorage();
    questionStorage = new QuestionsStorage();
    questionsAnswers = new QuestionsAnswers();
    questionStorage.getAllQuestions();
    testStorage.getAllTests();
    let urlParameters = new URLSearchParams(window.location.search);
    let parameter = urlParameters.get('parameter');
    test = testStorage.getTestById(parameter);
    loadTest();
}
function loadTest() {
    let testContent = document.getElementById('content');

    test.questions.forEach((questionElement, questionIndex) =>
    {
        let question = questionStorage.getQuestionById(questionElement.id);
        
        let questionDiv = document.createElement('div');
        
        /* Create <p> for text question */
        let questionText = document.createElement('p');
        questionText.innerHTML = questionElement.questionText;
        
        /* generate Id for <div> for question content */
        let questionDivId = 'question'+questionElement.id;

        questionDiv.setAttribute('id', questionDivId);
        questionDiv.setAttribute('class', 'questions');        

        questionDiv.appendChild(questionText);
        testContent.appendChild(questionDiv);

        let answerContent = questionDiv.appendChild(document.createElement('div'));
        answerContent.id = 'answersFor' + questionElement.id;

        if (!question.hasMultipleCorrectAnswers()) {
            question.answers.forEach((answerElement, answerIndex) => {
                let answerDiv = answerContent.appendChild(document.createElement('div'));
                answerDiv.id = questionElement.id + 'answer' + answerIndex;
                let radio = document.createElement('input');
                let answerLabel = document.createElement('label');
                radio.id = questionElement.id + '_answer_' + answerIndex;
                radio.setAttribute('type', 'radio');
                radio.setAttribute('value', answerElement.correct);
                radio.setAttribute('name', questionElement.id + 'answer');
                answerLabel.setAttribute('for', radio.id);
                answerLabel.innerHTML = answerElement.answer;
                answerDiv.appendChild(radio);
                answerDiv.appendChild(answerLabel);
                radio.addEventListener('change', () => { onAnswerClick(questionElement.id, radio.value) });
            });

        }
        else {
            question.answers.forEach((answerElement, answerIndex) => {
                let answerDiv = answerContent.appendChild(document.createElement('div'));
                answerDiv.id = questionElement.id + 'answer' + answerIndex;
                let checkbox = document.createElement('input');
                let answerLabel = document.createElement('label');
                checkbox.setAttribute('type', 'checkbox');
                checkbox.setAttribute('value', answerElement.correct);
                checkbox.id = questionElement.id + '_answer_' + answerIndex;
                answerLabel.setAttribute('for', checkbox.id);
                answerLabel.innerHTML = answerElement.answer;
                answerDiv.appendChild(checkbox);
                answerDiv.appendChild(answerLabel);
                checkbox.addEventListener('change', () => { onAnswerClick(questionElement.id, checkbox.value) });
            });
        }
        displayQuestPerPage();
    });
}
function onAnswerClick(id, valueOfAnswer) {
    questionsAnswers.addAnswer(
        {
            id: id,
            correct: valueOfAnswer
        }
    )
    
}

function onBtnFinishClick(){
    questionsAnswers.answers.forEach(a =>{
        var questionDiv = document.getElementById('question'+a.id);
        if(JSON.parse(a.correct)){
         questionDiv.style.backgroundColor = "green";
        }
        else{
            questionDiv.style.backgroundColor = "red";
        }
    });
}
function displayQuestPerPage() {
    let questionsPerPage, i;
    questionsPerPage= document.querySelectorAll(".questions");
    for (i= 0; i < questionsPerPage.length; i++) {

        if(i<=4){
            questionsPerPage[i].style.display= "block";
        }
        else {
            questionsPerPage[i].style.display= "none";
        }
    }
  }