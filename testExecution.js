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

    test.questions.forEach((questionElement) => {
        let question = questionStorage.getQuestionById(questionElement.id);

        let questionDiv = document.createElement('div');

        /* Create <p> for text question */
        let questionText = document.createElement('p');
        questionText.innerHTML = questionElement.questionText;

        /* generate Id for <div> for question content */
        let questionDivId = 'question' + questionElement.id;

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
                radio.setAttribute('value', answerElement.answer);
                radio.setAttribute('name', questionElement.id + 'answer');
                answerLabel.setAttribute('for', radio.id);
                answerLabel.innerHTML = answerElement.answer;
                answerDiv.appendChild(radio);
                answerDiv.appendChild(answerLabel);
                radio.addEventListener('change', () => {
                    onAnswerClick(
                        {
                            questionId: questionElement.id,
                            answerDivId: answerDiv.id,
                            answerText: radio.value
                        });
                });
            });

        }
        else {
            question.answers.forEach((answerElement, answerIndex) => {
                let answerDiv = answerContent.appendChild(document.createElement('div'));
                answerDiv.id = questionElement.id + 'answer' + answerIndex;
                let checkbox = document.createElement('input');
                let answerLabel = document.createElement('label');
                checkbox.setAttribute('type', 'checkbox');
                checkbox.setAttribute('value', answerElement.answer);
                checkbox.id = questionElement.id + '_answer_' + answerIndex;
                answerLabel.setAttribute('for', checkbox.id);
                answerLabel.innerHTML = answerElement.answer;
                answerDiv.appendChild(checkbox);
                answerDiv.appendChild(answerLabel);
                checkbox.addEventListener('change', () => {
                    onAnswerClick(
                        {
                            questionId: questionElement.id,
                            answerDivId: answerDiv.id,
                            inputId: checkbox.id,
                            answerText: checkbox.value
                        });
                });
            });
        }
    });
}
function onAnswerClick(answerObj) {
    let question = questionStorage.getQuestionById(answerObj.questionId);

    if (!questionsAnswers.getAnswerById(answerObj.questionId)) {
        questionsAnswers.addAnswer({
            id: answerObj.questionId,
            answerDivId: answerObj.answerDivId,
            chosenAnswers: [
                {
                    answer: answerObj.answerText
                }
            ]
        });
    }
    else {
        if (question.hasMultipleCorrectAnswers()) {
            questionsAnswers.updateCheckboxAnswer(answerObj);
        }
        else {
            questionsAnswers.updateRadioAnswer(answerObj);
        }
    }
}
function checkAnswers() {
    questionsAnswers.answers.forEach((a) => {
        const question = questionStorage.getQuestionById(a.id);

        question.answers.forEach(correctAnswer => {
            a.chosenAnswers.forEach(chosenA => {
                if (chosenA.answer === correctAnswer.answer) {
                    chosenA.correct = correctAnswer.correct;
                }
            });
        });
    });
}

function onBtnFinishClick() {
    const results = document.getElementById('results');
    const content = document.getElementById('content');
    const testResults = document.getElementById('testResults');
    content.setAttribute('class', 'hide');
    testResults.classList.remove('hide');
    checkAnswers();

    test.questions.forEach(questionElement => {
        questionsAnswers.answers.forEach(chosenAnswerObj => {
            let question = questionStorage.getQuestionById(questionElement.id);
            // Create and append question div, setting values for p element
            let questionDiv = document.createElement('div');
            let questionText = document.createElement('p');
            let answersDiv = document.createElement('div');
            questionDiv.setAttribute('class', 'questions');
            questionText.innerText = questionElement.questionText;
            questionDiv.append(questionText, answersDiv);
            results.append(questionDiv);

            if (question.hasMultipleCorrectAnswers()) {
                questionElement.answers.forEach((answerElement, answerIndex) => {
                    // Create answer div, setting values for input and label 
                    let answer = document.createElement('div');
                    let label = document.createElement('label');
                    let checkbox = document.createElement('input');
                    answer.id = questionElement.id + 'answer' + answerIndex;
                    label.append(checkbox, answerElement.answer);
                    checkbox.type = 'checkbox';
                    checkbox.disabled = true;
                    answer.setAttribute('class', (JSON.parse(answerElement.correct) ? 'correctAnswer' : 'falseAnswer'));
                    answer.appendChild(label);
                    answersDiv.append(answer);
                    chosenAnswerObj.chosenAnswers.forEach(chosenAnswer => {
                        if (chosenAnswer.answer === answerElement.answer) {
                            checkbox.checked = true;
                            answer.style.backgroundColor = JSON.parse(chosenAnswer.correct) ? 'correctAnswer' : 'falseAnswer';
                            
                        }
                    });
                });
            }
            else {
                questionElement.answers.forEach((answerElement, answerIndex) => {
                    // Create answer div, setting values for input and label
                    let answer = document.createElement('div');
                    let label = document.createElement('label');
                    let radio = document.createElement('input');
                    answer.id = questionElement.id + 'answer' + answerIndex;
                    label.append(radio, answerElement.answer);
                    radio.type = 'radio';
                    radio.disabled = true;
                    answer.setAttribute('class', (JSON.parse(answerElement.correct) ? 'correctAnswer' : 'falseAnswer'));
                    answer.appendChild(label);
                    answersDiv.append(answer);
                    chosenAnswerObj.chosenAnswers.forEach(chosenAnswer => {
                        if (chosenAnswer.answer === answerElement.answer) {
                            radio.checked = true;
                            answer.style.backgroundColor = JSON.parse(chosenAnswer.correct) ? 'correctAnswer' : 'falseAnswer';
                            
                        }
                    });
                });
            }
        });
    });
    console.log(questionsAnswers);
    /*questionsAnswers.answers.forEach((a) => {
        const question = questionStorage.getQuestionById(a.id);
        let answerDiv = document.getElementById(a.answerDivId);

        if (question.hasMultipleCorrectAnswers()) {
            const trueAnswers = a.chosenAnswers.filter(tA => JSON.parse(tA.correct));
            const falseAnswer = a.chosenAnswers.filter(fA => JSON.parse(fA.correct) === false)[0];

            if (!falseAnswer && trueAnswers.length > 1) {
                answerDiv.style.backgroundColor = 'green';
            }
            else {
                answerDiv.style.backgroundColor = 'red';
            }
        }
        else {
            if (JSON.parse(a.chosenAnswers[0].correct)) {
                answerDiv.style.backgroundColor = 'green';
            }
            else {
                answerDiv.style.backgroundColor = 'red';
            }
        }
    });*/
}