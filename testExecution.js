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

        /* Create <p> for text question and <span> for points */
        let questionText = document.createElement('p');
        let points = document.createElement('div');
        questionText.innerHTML = questionElement.questionText;
        points.innerHTML = 'Bodovi: ' + '<b>' + question.point + '</b>';
        points.setAttribute('class', 'points');

        /* generate Id for <div> for question content */
        let questionDivId = 'question' + questionElement.id;

        questionDiv.setAttribute('id', questionDivId);
        questionDiv.setAttribute('class', 'questions');

        questionDiv.append(questionText, points);
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
function checkAnswersValues() {
    questionsAnswers.answers.forEach((answerObj) => {
        const question = questionStorage.getQuestionById(answerObj.id);

        question.answers.forEach(correctAnswer => {
            answerObj.chosenAnswers.forEach(chosenAnswer => {
                if (chosenAnswer.answer === correctAnswer.answer) {
                    chosenAnswer.correct = correctAnswer.correct;
                }
            });
        });
    });
}
function checkAnswers() {
    checkAnswersValues();
    questionsAnswers.answers.forEach(answer => {
        const question = questionStorage.getQuestionById(answer.id);

        if (question.hasMultipleCorrectAnswers()) {
            const trueAnswers = answer.chosenAnswers.filter(tA => JSON.parse(tA.correct));
            const falseAnswer = answer.chosenAnswers.filter(fA => JSON.parse(fA.correct) === false)[0];

            if (!falseAnswer && trueAnswers.length > 1) {
                answer.points = question.point;
            }
            else {
                answer.points = 0;
            }
        }
        else {
            if (JSON.parse(answer.chosenAnswers[0].correct)) {
                answer.points = question.point;
            }
            else {
                answer.points = 0;
            }
        }
    });
}
function renderTestResults() {
    const results = document.getElementById('results');
    test.questions.forEach(questionElement => {
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
                answer.appendChild(label);
                answersDiv.append(answer);
                let chosenAnswer = questionsAnswers.getAnswerById(question.id);
                if (chosenAnswer) {
                    chosenAnswer.chosenAnswers.forEach(a => {
                        if (a.answer === answerElement.answer) {
                            checkbox.checked = true;
                            answer.setAttribute('class', (JSON.parse(a.correct) ? 'correctAnswer' : 'falseAnswer'));
                        }
                        else {
                            answer.setAttribute('class', (JSON.parse(answerElement.correct) ? 'correctAnswer' : 'falseAnswer'));
                        }
                    });
                }
                else {
                    answer.setAttribute('class', (JSON.parse(answerElement.correct) ? 'correctAnswer' : 'falseAnswer'));
                }
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
                answer.appendChild(label);
                answersDiv.append(answer);
                let chosenAnswer = questionsAnswers.getAnswerById(question.id);
                if (chosenAnswer) {
                    chosenAnswer.chosenAnswers.forEach(a => {
                        if (a.answer === answerElement.answer) {
                            radio.checked = true;
                            answer.setAttribute('class', (JSON.parse(a.correct) ? 'correctAnswer' : 'falseAnswer'));
                        }
                        else {
                            answer.setAttribute('class', (JSON.parse(answerElement.correct) ? 'correctAnswer' : 'falseAnswer'));
                        }
                    });
                }
                else {
                    answer.setAttribute('class', (JSON.parse(answerElement.correct) ? 'correctAnswer' : 'falseAnswer'));
                }
            });
        }
    });
}

function onBtnFinishClick() {
    const content = document.getElementById('content');
    const testResults = document.getElementById('testResults');
    const points = document.getElementById('points');
    const posiblePoints = document.getElementById('posiblePoints');
    const message = document.getElementById('message');
    const finishBtn = document.getElementById('btnFinish');
    const posibleToScore = test.questions.reduce((a, b) => a + JSON.parse(b.point), 0);
    content.setAttribute('class', 'hide');
    finishBtn.setAttribute('class', 'hide');
    testResults.classList.remove('hide');
    checkAnswers();
    renderTestResults();
    const scoredPoints = questionsAnswers.getScoredPoints();
    points.innerHTML = scoredPoints;
    posiblePoints.innerHTML = posibleToScore;

    if (test.category === 'Kategorija B') {
        if (scoredPoints === 108 || scoredPoints > 108) {
            message.innerHTML = 'Čestitamo, položili ste!'
        }
        else {
            message.innerHTML = 'Žao nam je, niste položili test!'
        }
    }
    else if(test.category === 'Kategorija C' || test.category === 'Kategorija D') {
        if(scoredPoints === 126 || scoredPoints > 126){
            message.innerHTML = 'Čestitamo, položili ste!'
        }
        else {
            message.innerHTML = 'Žao nam je, niste položili test!'
        }
    }
}