let question;
let questionStorage;
let currentQuestionId;
function onLoad() {
    questionStorage = new QuestionsStorage();
    drawTable();
}

function popUpDialog() {
    question = new Question();
    document.getElementById('questionMaker').style.display = 'block';
}
function closePopUp() {
    document.getElementById('questionMaker').style.display = 'none';
    clearAddQuestionForm();
}

// Tables

function clearHtmlTable(table) {
    let tbl = table;
    while (tbl.rows.length > 1) {
        tbl.deleteRow(1);
    }
}

function drawTable() {
    const table = document.getElementById('questionTable')
    clearHtmlTable(table);
    questionStorage.getAllQuestions().forEach((el) => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.innerHTML = el.id;
        cell2.innerHTML = el.questionText;
        cell3.innerHTML = '<a class="modifie" onclick="onQuestionModifie(\'' + el.id + '\')">Izmjeni</a> || <a class="modifie" onclick="showModal(\'' + el.id + '\')">Obriši</a>';

    })
}

// Questions and Answers

function addQuestion() {
    question.questionText = document.getElementById('questionText').value;
    question.category = document.getElementById('category').value;
    question.img = document.getElementById('questionPicture').value;

    if (question.id) {
        questionStorage.updateQuestion(question);
    }
    else {
        questionStorage.saveQuestion(question);
    }

    closePopUp();
    clearAddQuestionForm()
    drawTable();
}
function clearAddQuestionForm() {
    document.getElementById('questionText').value = '';
    document.getElementById('category').value = 'default';
    document.getElementById('questionPicture').value = '';
    document.getElementById('questionAnswer').value = '';
    document.getElementById('correctAnswer').checked = false;
    clearHtmlTable(document.getElementById('answers'));
}

function addAnswerInTable() {
    question.addAnswers({
        answer: document.getElementById('questionAnswer').value,
        correct: document.getElementById('correctAnswer').checked,
        tačno: document.getElementById('correctAnswer').checked ? 'Da' : 'Ne'
    });

    clearHtmlTable(document.getElementById('answers'));
    displayAnswers();
    document.getElementById('questionAnswer').value = '';
    document.getElementById('correctAnswer').checked = false;
}

function displayAnswers() {
    question.answers.forEach((el) => {
        const row = document.getElementById('answers').insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.innerHTML = el.answer;
        cell2.innerHTML = el.tačno;
        cell3.innerHTML = '<a class="modifie" onclick="deleteAnswer(\'' + el.answer + '\')">Obriši</a>';
    });
}
function deleteAnswer(answer) {
    question.deleteAnswer(answer);
    clearHtmlTable(document.getElementById('answers'));
    displayAnswers();

}

function showModal(el) {
    currentQuestionId = el;
    document.getElementById('deleteQ_modalBox').style.display = 'block';
}
function closeModal() {
    document.getElementById('deleteQ_modalBox').style.display = 'none';
    currentQuestionId = null;
}
function onYeslClick() {

    deleteQuestion(currentQuestionId);
    closeModal();
}
function deleteQuestion(currentQuestionId) {
    questionStorage.delete(currentQuestionId);
    drawTable();
}


function fillQuestionForm() {
    document.getElementById('questionText').value = question.questionText;
    document.getElementById('category').value = question.category;
    document.getElementById('questionPicture').value = question.img;
    displayAnswers();
    document.getElementById('questionMaker').style.display = 'block';
}

function onQuestionModifie(questionId) {
    questionStorage.getAllQuestions().filter((el) => {
        if (questionId === el.id) {
            question = Object.assign(new Question, el);
            fillQuestionForm();
        }
    });
}

