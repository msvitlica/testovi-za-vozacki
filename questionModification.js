let tempQuestionObj;
let questions;
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

function drawTable(table){
    clearHtmlTable(document.getElementById('questionTable'));
    questions.getAllQuestions().forEach((el) => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.innerHTML = el.id;
        cell2.innerHTML = el.questionText;
        cell3.innerHTML = '<a class="modifie">Izmjeni</a> || <a class="modifie">Obriši</a>';
    })
}

// Questions and Answers

function addQuestion() {
    let question = document.getElementById('questionText');
    let category = document.getElementById('category');
    let img = document.getElementById('questionPicture');
    tempQuestionObj.questionText = question.value;
    tempQuestionObj.category = category.value;
    tempQuestionObj.img = img.value;
    (questions) ? questions : questions = new QuestionsStorage();
    questions.saveQuestion(tempQuestionObj);
    drawTable(document.getElementById('questionTable'));
    closePopUp();
    question.value = '';
    category.value = 'default';
    img.value = '';
    clearHtmlTable(document.getElementById('answers'));
}

function addAnswerInTable(){
    let answer = document.getElementById('questionAnswer');
    let correct = document.getElementById('correctAnswer');
    tempQuestionObj.addAnswers({
        answer: answer.value,
        correct: correct.checked,
        tačno: correct.checked ? 'Da' : 'Ne'
    });

    clearHtmlTable(document.getElementById('answers'));
    tempQuestionObj.answers.forEach((el) => {
        const row = document.getElementById('answers').insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.innerHTML = el.answer;
        cell2.innerHTML = el.tačno;
        cell3.innerHTML = '<a class="modifie" onclick="deleteAnswer(\'' + el.answer + '\')">Obriši</a>';
    })
    answer.value = '';
    correct.checked = false;
}
function deleteAnswer(answer){
    tempQuestionObj.deleteAnswer(answer);
    
    clearHtmlTable(document.getElementById('answers'));
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