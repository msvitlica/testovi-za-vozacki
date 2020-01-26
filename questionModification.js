let tempQuestionObj;
let questionStorage;
function onLoad(){
    questionStorage = new QuestionsStorage();
    drawTable();   
}

function popUpDialog(){
    tempQuestionObj = new Question();
    document.getElementById('questionMaker').style.display = 'block';
}
function closePopUp(){
    document.getElementById('questionMaker').style.display = 'none';
}

// Tables

function clearHtmlTable(table){
    let tbl = table;
    while (tbl.rows.length > 1){
        tbl.deleteRow(1);
    }
}

function drawTable(){
    const table = document.getElementById('questionTable')
    clearHtmlTable(table);
    questionStorage.getAllQuestions().forEach((el) => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.innerHTML = el.id;
        cell2.innerHTML = el.questionText;
        cell3.innerHTML = '<a class="modifie">Izmjeni</a> || <a class="modifie" onclick="showModal(\''+ el.id +'\')">Obriši</a>';

    })
}

// Questions and Answers

function addQuestion() {    
    
    tempQuestionObj.questionText =  document.getElementById('questionText').value;
    tempQuestionObj.category = document.getElementById('category').value;
    tempQuestionObj.img = document.getElementById('questionPicture').value;

    questionStorage.saveQuestion(tempQuestionObj);

    closePopUp();
    clearAddQuestionForm()
    drawTable();

    function clearAddQuestionForm() {
        document.getElementById('questionText').value = '';
        document.getElementById('category').value = 'default';
        document.getElementById('questionPicture').value = '';
        clearHtmlTable(document.getElementById('answers'));
    }
}

function addAnswerInTable(){   
    tempQuestionObj.addAnswers({
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
    tempQuestionObj.answers.forEach((el) => {
        const row = document.getElementById('answers').insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.innerHTML = el.answer;
        cell2.innerHTML = el.tačno;
        cell3.innerHTML = '<a class="modifie" onclick="deleteAnswer(\'' + el.answer + '\')">Obriši</a>';
    });
}
function deleteAnswer(answer){
    tempQuestionObj.deleteAnswer(answer);    
    clearHtmlTable(document.getElementById('answers'));
    displayAnswers();
    
}

function showModal(){
    document.getElementById('deleteQ_modalBox').style.display = 'block';
}
function closeModal(){
    document.getElementById('deleteQ_modalBox').style.display = 'none';
}
function onYeslClick(){
    closeModal();
}
function deleteQuestion(id){
    questionStorage.delete(id);
    drawTable();
}
