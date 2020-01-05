function selected(){
    let testName = document.getElementById('testHolder').getElementsByTagName('*');
    for(let i = 0; i < testName.length; i++){
        console.log(testName[i])
    }
    //document.getElementById(testName).classList.add('selected_button');
}


function onPageLoad() {
    console.log(document.getElementsByClassName("button"));
    const buttons = document.getElementsByClassName("button");
    
    for(let i=0; i< buttons.length; i++){
        const button = buttons[i];
        console.log(button);


        button.addEventListener('click', (event) => {
            const buttons = [...document.getElementsByClassName("button")].forEach(button => button.classList.remove("selected_button"));
            
            button.classList.add("selected_button");

        })
    }
    
}