let selectedTest = undefined;

function onPageLoad() {
    [...document.getElementsByClassName("button")].forEach(button => 
        {
        button.addEventListener('click', (event) => 
        {
            [...document.getElementsByClassName("button")].forEach(button => button.classList.remove("selected_button"));
            button.classList.add("selected_button");
            selectedTest = button.innerHTML;            
        })
    });
}

function onStart(){
    alert(selectedTest);
}