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
        let questionDiv = document.createElement('div');
        let questionText = document.createElement('p');
        questionDiv.setAttribute('id', 'question' + (questionIndex + 1));
        questionDiv.setAttribute('class', 'questions');
        questionText.innerHTML = questionElement.questionText;
        questionDiv.appendChild(questionText);
        testContent.appendChild(questionDiv);

        //testContent.innerHTML += '<div id="question' + (questionIndex + 1) + '" class="questions"><p>' + questionElement.questionText + '</p></div>';
        let answerContent = document.getElementById('question' + (questionIndex + 1)).appendChild(document.createElement('div'));
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
    });
}
function onAnswerClick(id, valueOfAnswer) {
    questionsAnswers.addAnswer(
        {
            id: id,
            correct: valueOfAnswer
        }
    )
    console.log(questionsAnswers.answers);
}