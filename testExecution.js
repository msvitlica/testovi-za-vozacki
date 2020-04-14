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

    test.questions.forEach((questionElement, questionIndex) => {
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
    checkAnswers();
    questionsAnswers.answers.forEach((a) => {
        const question = questionStorage.getQuestionById(a.id);
        var questionDiv = document.getElementById('question' + a.id);

        if (question.hasMultipleCorrectAnswers()) {
            const trueAnswers = a.chosenAnswers.filter(tA => JSON.parse(tA.correct));
            const falseAnswer = a.chosenAnswers.filter(fA => JSON.parse(fA.correct) === false)[0];

            if (!falseAnswer && trueAnswers.length > 1) {
                questionDiv.style.backgroundColor = 'green';
            }
            else {
                questionDiv.style.backgroundColor = 'red';
            }
        }
        else {
            if (JSON.parse(a.chosenAnswers[0].correct)) {
                questionDiv.style.backgroundColor = 'green';
            }
            else {
                questionDiv.style.backgroundColor = 'red';
            }
        }
    });
}

