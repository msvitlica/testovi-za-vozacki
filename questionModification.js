
import { Question,QuestionsStorage } from './modules/question.js';

let question;
let questionStorage;
let currentQuestionId;
let body= document.getElementById('body');
let popUpQuestion= document.getElementById("createQuestionBtn");
let closePopUpQuestion=document.getElementById("closeBtn");
let addAInTable=document.getElementById("addAnswer");
let saveQ=document.getElementById("saveQuestion");
let onClickEraseAnswer= document.getElementById("yes");
let onClickCloseModal= document.getElementById("no");

body.addEventListener('load',onLoad());
popUpQuestion.addEventListener('click',popUpDialog);
closePopUpQuestion.addEventListener('click',closePopUp);
addAInTable.addEventListener('click', addAnswerInTable);
saveQ.addEventListener('click',addQuestion);
onClickEraseAnswer.addEventListener('click',onYeslClick);
onClickCloseModal.addEventListener('click',closeModal);

function onLoad() {
    questionStorage = new QuestionsStorage();
    question = new Question();
    drawTable();
}

function popUpDialog() {
    question = new Question();
    document.getElementById('questionMaker').style.display = 'block';
}
function closePopUp() {
    document.getElementById('questionMaker').style.display = 'none';
    clearAddQuestionForm();
    removeClass();
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
        row.onclick = function () { return onSelectRow(row) };
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.innerHTML = el.id;
        cell2.innerHTML = el.questionText;
        cell3.innerHTML = '<a class="modifie" id="modify' + el.id + '">Izmjeni</a> || <a class="modifie" id= "delete'+ el.id +'">Obriši</a>';
        let qModify= document.getElementById('modify'+ el.id);
        let qDelete= document.getElementById('delete'+ el.id);
        qModify.addEventListener('click',()=>{onQuestionModifie(el.id) });
        qDelete.addEventListener('click', ()=>{showModal(el.id) });
    });
}

// Questions and Answers

function addQuestion() {
    question.questionText = document.getElementById('questionText').value;
    question.category = document.getElementById('category').value;
    //question.img = document.getElementById();

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
        cell3.innerHTML = '<a class="modifie" id= "delAnswer' + el.answer+ '">Obriši</a>';
        let delAnswer= document.getElementById('delAnswer' +el.answer);
        delAnswer.addEventListener('click',()=>{deleteAnswer(el.answer) });
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
    removeClass();
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
    question = questionStorage.getQuestionById(questionId);
    fillQuestionForm();
}
function removeClass() {
    let table = document.getElementById('questionTable');
    let rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        let row = table.rows[i];
        if (row.classList.contains('selectedRow')) {
            row.classList.remove('selectedRow');
        }
    }
}
function onSelectRow(row) {
    removeClass();
    row.classList.add('selectedRow');
}

function imgUrlToBase64(url){
    let imgBase64;
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    let img = new Image();
    img.src = url;
    img.onload = function() {
        canvas.height = img.height;
        canvas.width = img.width;
        context.drawImage(img, 0, 0);
        imgBase64 = canvas.toDataURL('image/jpeg');
    }
    return imgBase64;
}