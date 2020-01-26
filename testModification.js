let temporaryQuestionair;
function enterTestPopUp() {
    temporaryQuestionair = new Questionair();
    questionLoad();
    document.getElementById('testMaker').style.display = 'block';
}
function closeModalDialog() {
    document.getElementById('testMaker').style.display = 'none';
}

// Inserting Questions in Dropdown menu and manipulating with them 

function questionLoad() {
    let newOption = document.getElementById('pickQuestion');
    questions.getAllQuestions().forEach((el) => {
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

function addQuestionInTbl() {
    const tempQuestion = document.getElementById('pickQuestion');
    questions.getAllQuestions().forEach((el) => {
        if (tempQuestion.value === el.questionText) {
            temporaryQuestionair.addQuestion(el);
            let row = document.getElementById('pickedQuestionsTbl').insertRow();
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);

            cell1.innerHTML = el.questionText;
            cell2.innerHTML = 'Obriši';
        }
    });
    tempQuestion.value = 'default';
}

function createTest() {
    temporaryQuestionair.id = uuidv1();
    temporaryQuestionair.name = document.getElementById('testName').value;
    temporaryQuestionair.category = document.getElementById('testCategory').value;

    // Setting values to default

    clearHtmlTable(document.getElementById('pickedQuestionsTbl'));
    clearCreatTestForm();
    closeModalDialog();
    console.log(temporaryQuestionair);

    const row = document.getElementById('testsTable').insertRow();

    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);

    cell1.innerHTML = temporaryQuestionair.id;
    cell2.innerHTML = temporaryQuestionair.name;
    cell3.innerHTML = temporaryQuestionair.category;
    cell4.innerHTML = 'Izmjeni || Obriši';
}