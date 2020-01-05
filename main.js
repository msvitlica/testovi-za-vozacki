function onPageLoad() {
    [...document.getElementsByClassName("button")].forEach(button => 
        {
        button.addEventListener('click', (event) => 
        {
            [...document.getElementsByClassName("button")].forEach(button => button.classList.remove("selected_button"));
            button.classList.add("selected_button");
        })
    });
}