function selected() {
    let testName = document.getElementById('testHolder').getElementsByTagName('*');
    for (let i = 0; i < testName.length; i++) {
        console.log(testName[i])
    }
    //document.getElementById(testName).classList.add('selected_button');
}


function onPageLoad() {
    [...document.getElementsByClassName("button")].forEach(button => {
        button.addEventListener('click', (event) => {
            [...document.getElementsByClassName("button")].forEach(button => button.classList.remove("selected_button"));

            button.classList.add("selected_button");

        })
    });

}