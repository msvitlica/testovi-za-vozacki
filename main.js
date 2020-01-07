var selectedTestButton = undefined;
function onPageLoad() {
    testButtonsB.forEach(el => {
        document.getElementById('testHolder1').innerHTML += '<button class= "button">' + el.name + '</button>'
    });
    testButtonsC.forEach(el => {
        document.getElementById('testHolder2').innerHTML += '<button class= "button">' + el.name + '</button>'
    });
    testButtonsD.forEach(el => {
        document.getElementById('testHolder3').innerHTML += '<button class= "button">' + el.name + '</button>'
    });
    [...document.getElementsByClassName("button")].forEach(button => {
        button.addEventListener('click', () => {
            [...document.getElementsByClassName("button")].forEach(button =>
                button.classList.remove("selected_button")),
                button.classList.add("selected_button"),
                selectedTestButton = button.innerHTML;
        })
    });
}
