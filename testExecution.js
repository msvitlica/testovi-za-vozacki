import { TestStorage } from './modules/tests.js';
import { QuestionsStorage, Question } from './modules/question.js';
import { QuestionsAnswers } from './modules/answers.js';
let test, testStorage, questionStorage, questionsAnswers;

window.addEventListener('load', onLoad);

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

    test.questions.forEach((questionElement, questionIndex) => {
        let question = questionStorage.getQuestionById(questionElement.id);
        let div = document.createElement('div');

        testContent.innerHTML += '<div id="question' + (questionIndex + 1) + '" class="questions"><p>' + questionElement.questionText + '</p></div>';
        let answerContent = document.getElementById('question' + (questionIndex + 1)).appendChild(div);
        answerContent.classList = 'answers' + questionElement.id;

        if (question.hasMultipleCorrectAnswers()) {
            question.answers.forEach((answerElement, answerIndex) => {
                answerContent.innerHTML += '<div><input type="checkbox" id="' + questionElement.id + '_answer_' + answerIndex + '" name="answer' + questionElement.id + '" value="' + answerElement.correct + '">< for="' + questionElement.id + '_answer_' + answerIndex + '">' + answerElement.answer + '</label></div>';
                let eventHandler = document.getElementById(questionElement.id + '_answer_' + answerIndex);
                eventHandler.addEventListener('change', () => { onAnswerClick(questionElement.id) });
            });
        }
        else {
            question.answers.forEach((answerElement, answerIndex) => {
                answerContent.innerHTML += '<div><input type="radio" id="' + questionElement.id + '_answer_' + answerIndex + '" name="answer' + questionElement.id + '" value="' + answerElement.correct + '"><label for="' + questionElement.id + '_answer_' + answerIndex + '">' + answerElement.answer + '</label></div>';
                let eventHandler = document.getElementById(questionElement.id + '_answer_' + answerIndex);
                eventHandler.addEventListener('change', () => { onAnswerClick(questionElement.id) });
            });
        }
    });
}
function onAnswerClick(id) {
    let question = questionStorage.getQuestionById(id);
    console.log(question);
}