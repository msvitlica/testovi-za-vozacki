import { TestStorage } from './modules/tests.js';
import { QuestionsStorage, Question } from './modules/question.js';
import { QuestionsAnswers } from './modules/answers.js';
let test, testStorage, questionStorage, questionsAnswers;

window.addEventListener('load', onLoad);
let button = document.getElementById('btnFinish');
button.addEventListener('click', onBtnFinishClick);
let firstBtn= document.getElementById('first');
firstBtn.addEventListener('click',firstPage);
let previousBtn= document.getElementById('previous');
previousBtn.addEventListener('click', previousPage);
let next_Page= document.getElementById('next');
next_Page.addEventListener('click', nextPage);
let lastBtn= document.getElementById('last');
lastBtn.addEventListener('click', lastPage);


function onLoad() {
    testStorage = new TestStorage();
    questionStorage = new QuestionsStorage();
    questionsAnswers = new QuestionsAnswers();
    questionStorage.getAllQuestions();
    testStorage.getAllTests();
    let urlParameters = new URLSearchParams(window.location.search);
    let parameter = urlParameters.get('parameter');
    test = testStorage.getTestById(parameter);
    loadFirstPage();
    numberOfPages = getNumberOfPages();

}
function loadFirstPage() {
    firstPage();
}

var questionList =[];
var currentPage = 1;
var numberPerPage = 5;
var numberOfPages;

function getNumberOfPages() {
    return Math.ceil(test.questions.length / numberPerPage);
}
function firstPage() {
    removeFromPage();
    currentPage = 1;
    loadList();
}
function previousPage() {
    removeFromPage();
    currentPage -= 1;
    loadList();
}
function nextPage() {
    removeFromPage();
    currentPage += 1;
    loadList();
}
function lastPage() {
    removeFromPage();
    currentPage = numberOfPages;
    loadList();
}
function loadList() {
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;

    questionList = test.questions.slice(begin, end);
    drawList();    
    check();         
}
function drawList() {
    let testContent = document.getElementById('content');
    questionList.forEach((questionElement) =>{
   
        let question = questionStorage.getQuestionById(questionElement.id);
        
        let questionDiv = document.createElement('div');
        
        // Create <p> for text question 
        let questionText = document.createElement('p');
        questionText.innerHTML = questionElement.questionText;
        
        //generate Id for <div> for question content 
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
                radio.addEventListener('change', () => { onAnswerClick(
                    {
                        questionId: questionElement.id,
                        answerText: answerElement.answer,
                        correct: radio.value
                    }
                ) });
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
                checkbox.addEventListener('change', () => { onAnswerClick(
                    {
                        questionId: questionElement.id,
                        inputId: checkbox.id,
                        answerText: answerElement.answer,
                        correct: checkbox.value
                    }
                ) });
            });
        }

    });
}
function onAnswerClick(answerObj) {
    let question = questionStorage.getQuestionById(answerObj.questionId);

    if (!questionsAnswers.getAnswerById(answerObj.questionId)) {
        questionsAnswers.addAnswer({
            id: answerObj.questionId,
            answers: [
                {
                    correct: answerObj.correct,
                    answer: answerObj.answerText
                }
            ]
        });
    }
    else {
        if (question.hasMultipleCorrectAnswers()) {
            questionsAnswers.updateCheckboxAnswer(answerObj)
        }
        else {
            questionsAnswers.updateRadioAnswer(answerObj)
        }
    }
}

function onBtnFinishClick(){
    questionsAnswers.answers.forEach(a =>{
        var questionDiv = document.getElementById('question'+a.id);
        let question = questionStorage.getQuestionById(a.id);

        if(question.hasMultipleCorrectAnswers()){
            const trueAnswers = a.answers.filter(e => JSON.parse(e.correct));
            const falseAnswer = a.answers.filter(e => JSON.parse(e.correct) === false)[0];

            if(!falseAnswer && trueAnswers.length > 1){
                questionDiv.style.backgroundColor = 'green';
            }
            else {
                questionDiv.style.backgroundColor = 'red';
            }
        }
        else {
            if(JSON.parse(a.answers[0].correct)){
                questionDiv.style.backgroundColor = 'green';
            }
            else {
                questionDiv.style.backgroundColor = 'red';
            }
        }
    });
    console.log(questionsAnswers.answers);
}
function check() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
    document.getElementById("first").disabled = currentPage == 1 ? true : false;
    document.getElementById("last").disabled = currentPage == numberOfPages  ? true : false;
}

function removeFromPage(){
    let questionsPerPage= document.querySelectorAll(".questions");
    questionsPerPage.forEach(el=>{
        el.style.display = "none";
       });
}






