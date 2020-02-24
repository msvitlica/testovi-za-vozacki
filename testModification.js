import { Test, TestStorage } from './modules/tests.js';
import { QuestionsStorage } from './modules/question.js';
let test;
let questionStorage;
let testStorage;

// Loading elements from HTMl

const body = document.getElementById('testModificationBody');
const createTest = document.getElementById('createTest');
const addQuestionBtn = document.getElementById('addQuestionInTableBtn');
const addTestBtn = document.getElementById('addTestBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const onTestCategoryChange = document.getElementById('testCategory');

// Setting Event Listeners 

body.addEventListener('load', onLoad());
createTest.addEventListener('click', enterTestPopUp);
addQuestionBtn.addEventListener('click', addQuestionInTbl);
addTestBtn.addEventListener('click', onAddTestInTbl);
closeModalBtn.addEventListener('click', closeModalDialog);
onTestCategoryChange.addEventListener('change', fillDropdown);

// Function for manipulating with Test

function onLoad() {
    questionStorage = new QuestionsStorage;
    testStorage = new TestStorage();
    drawTestsTable();
}
function enterTestPopUp() {
    test = new Test();
    document.getElementById('testMaker').style.display = 'block';
}
function closeModalDialog() {
    document.getElementById('testMaker').style.display = 'none';
    clearCreatTestForm();
}

function drawTestsTable() {
    let tbl = document.getElementById('testsTable');
    clearHtmlTable(tbl);
    testStorage.getAllTests().forEach((el) => {
        const row = tbl.insertRow();
        row.onclick = function () { return onSelectRow(row) };
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        cell1.innerHTML = el.id;
        cell2.innerHTML = el.name;
        cell3.innerHTML = el.category;
        cell4.innerHTML = '<a class="modify" id="modify' + el.id + '">Izmjeni</a>||<a class="modify" id="delete' + el.id + '">Obriši</a>';
        const onTestModify = document.getElementById('modify' + el.id);
        const onTestDelete = document.getElementById('delete' + el.id);
        onTestModify.addEventListener('click', function () { onTestModifie(el.id) });
        onTestDelete.addEventListener('click', function () { onDeleteTestClick(el.id) });
    });
}


function clearHtmlTable(table) {
    let tbl = table;
    while (tbl.rows.length > 1) {
        tbl.deleteRow(1);
    }
}

// Inserting Questions in Dropdown menu and manipulating with them 

function fillDropdown() {
    clearDropDown();
    let newOption = document.getElementById('pickQuestion');
    questionStorage.getAllQuestions().filter((elementForFilter) => {
        if (document.getElementById('testCategory').value === elementForFilter.category) {
            return elementForFilter;
        }
    }).forEach((el) => {
        let child = document.createElement('option');
        child.value = el.id;
        newOption.appendChild(child).innerHTML = el.questionText;
    });
}

function clearDropDown() {
    let dropdown = document.getElementById('pickQuestion');
    while (dropdown.lastChild.value !== 'default') {
        dropdown.removeChild(dropdown.lastChild);
    }
}
function clearCreatTestForm() {
    document.getElementById('testName').value = '';
    document.getElementById('testCategory').value = 'default';
    clearDropDown();
}
function drawQuestionsTable() {
    const tbl = document.getElementById('pickedQuestionsTbl');
    clearHtmlTable(tbl);
    test.questions.forEach((el, index) => {
        const row = tbl.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.innerHTML = index + 1;
        cell2.innerHTML = el.questionText;
        cell3.innerHTML = '<a href="#" class="modify" id="delete' + el.id + '">Obriši</a>';
        const onQuestionDelete = document.getElementById('delete' + el.id);
        onQuestionDelete.addEventListener('click', function () { deleteQuestion(el.id) });
    })
}
function removeFromDropdown(element) {
    let dropdown = document.getElementById('pickQuestion');
    dropdown.childNodes.forEach((el) => {
        if (element.value === el.value) {
            dropdown.removeChild(el);
        }
    })
}

function addQuestionInTbl() {
    const tempQuestion = document.getElementById('pickQuestion');
    questionStorage.getAllQuestions().forEach((el) => {
        if (tempQuestion.value === el.id) {
            test.addQuestion(el)
        }
    });
    drawQuestionsTable();
    removeFromDropdown(tempQuestion);
    tempQuestion.value = 'default';
}

function onAddTestInTbl() {
    test.name = document.getElementById('testName').value;
    test.category = document.getElementById('testCategory').value;
    if (test.id) {
        testStorage.updateTest(test);
    } else {
        testStorage.saveTest(test);
    }
    drawTestsTable();
    clearHtmlTable(document.getElementById('pickedQuestionsTbl'));
    clearCreatTestForm();
    closeModalDialog();
}
function deleteQuestion(question) {
    test.deleteQuestion(question);
    fillDropdown();
    drawQuestionsTable();
}

function onDeleteTestClick(test) {
    testStorage.deleteTest(test);
    drawTestsTable();
}
function onTestModifie(testId) {
    test = testStorage.getTestById(testId);
    fillTestForm();
}
function fillTestForm() {
    document.getElementById('testName').value = test.name;
    document.getElementById('testCategory').value = test.category;
    fillDropdown();
    drawQuestionsTable();
    document.getElementById('testMaker').style.display = 'block';
}
function removeClass() {
    let tbl = document.getElementById('testsTable');
    [...tbl.getElementsByTagName('tr')].forEach(el => {
        el.classList.remove('selectedRow');
    })
}
function onSelectRow(row) {
    removeClass();
    row.classList.add('selectedRow');
}
