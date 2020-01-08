function popUpDialog(){
    document.getElementById('questionMaker').style.display = 'block';
}
function closePopUp(){
    document.getElementById('questionMaker').style.display = 'none';
}

// Tables

let questions = [];
let answers = [];

function clearHtmlTable(table){
    let tbl = table;
    while (tbl.rows.length > 1){
        tbl.deleteRow(1);
    }
}

function drawTable(table){
    clearHtmlTable(document.getElementById('questionTable'));
    questions.forEach((el, index) => {
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    cell1.innerHTML = index;
    cell2.innerHTML = el.questionText;
    cell3.innerHTML = 'Imjeni || izbriši';
    })
}

// Questions and Answers

function addQuestion() {
    let question = document.getElementById('questionText');
    let category = document.getElementById('category');
    let img = document.getElementById('questionPicture');
    questions.push(new Question(question.value, category.value, img.value));
    questions[0].addAnswers(answers);
    drawTable(document.getElementById('questionTable'));
    closePopUp();
    question.value = '';
    category.value = 'default';
    img.value = '';
    answers = [];
    console.log(questions);
}

function addAnswerInTable(){
    let answer = document.getElementById('questionAnswer');
    let correct = document.getElementById('correctAnswer');
    answers.push({
        answer: answer.value,
        correct: correct.value,
        tačno: correct.checked ? 'Da' : 'Ne'
    });

    clearHtmlTable(document.getElementById('answers'))
    answers.forEach((el) => {
        const row = document.getElementById('answers').insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.innerHTML = el.answer;
        cell2.innerHTML = el.tačno;
        cell3.innerHTML = 'Imjeni || izbriši';
    })
    answer.value = '';
    correct.checked = false;
}