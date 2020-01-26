let temporaryQuestionair;
let questionStorage;
let testStorage;

function onLoad() {
    questionStorage = new QuestionsStorage();
    testStorage = new TestStorage();
    drawTestsTable();
}
function enterTestPopUp() {
    temporaryQuestionair = new Questionair();
    fillDropdown();
    document.getElementById('testMaker').style.display = 'block';
}
function closeModalDialog() {
    document.getElementById('testMaker').style.display = 'none';
    clearCreatTestForm();
}

function drawTestsTable(){
    let tbl = document.getElementById('testsTable');
    clearHtmlTable(tbl);
    testStorage.getAllTests().forEach((el) => {
        let row = tbl.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        cell1.innerHTML = el.id;
        cell2.innerHTML = el.name;
        cell3.innerHTML = el.category;
        cell4.innerHTML = 'Obriši';
    })
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
    questionStorage.getAllQuestions().forEach((el) => {
        let child = document.createElement('option');
        child.value = el.questionText;
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
function drawQuestionsTable(){
    const tbl = document.getElementById('pickedQuestionsTbl');
    clearHtmlTable(tbl);
    temporaryQuestionair.questions.forEach((el, index) => {
        const row = tbl.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.innerHTML = index + 1;
        cell2.innerHTML = el.questionText;
        cell3.innerHTML = '<a href="#" class="modifie" onclick="deleteQuestion(\'' + el.id + '\')">Obriši</a>';
    })
}
function removeFromDropdown(element) {
    let dropdown = document.getElementById('pickQuestion');
    dropdown.childNodes.forEach((el) => {
        if(element.value === el.value){
            dropdown.removeChild(el);
        }
    })
}

function addQuestionInTbl() {
    const tempQuestion = document.getElementById('pickQuestion');
    questionStorage.getAllQuestions().forEach((el) => {
        if (tempQuestion.value === el.questionText) {
            temporaryQuestionair.addQuestion(el)
        }
    });
    drawQuestionsTable();
    removeFromDropdown(tempQuestion);
    tempQuestion.value = 'default';
}

function createTest() {
    temporaryQuestionair.id = uuidv1();
    temporaryQuestionair.name = document.getElementById('testName').value;
    temporaryQuestionair.category = document.getElementById('testCategory').value;
    testStorage.saveTest(temporaryQuestionair);

    drawTestsTable();
    clearHtmlTable(document.getElementById('pickedQuestionsTbl'));
    clearCreatTestForm();
    closeModalDialog();
}
function deleteQuestion(question) {
    temporaryQuestionair.deleteQuestion(question);
    fillDropdown();
    drawQuestionsTable();
}